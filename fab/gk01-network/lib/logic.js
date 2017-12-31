'use strict';
/**
 * Write your transction processor functions here
 */

/**
 * Sample transaction
 * @param {org.gk01.biznet.ChangeAssetValue} changeAssetValue
 * @transaction
 */
function onChangeAssetValue(changeAssetValue) {
    var assetRegistry;
    var id = changeAssetValue.relatedAsset.assetId;
    return getAssetRegistry('org.gk01.biznet.SampleAsset')
        .then(function(ar) {
            assetRegistry = ar;
            return assetRegistry.get(id);
        })
        .then(function(asset) {
            asset.value = changeAssetValue.newValue;
            return assetRegistry.update(asset);
        });
}



/**
 * Change stock values as transaction to get event notification.
 * @param {org.gk01.biznet.Trade} tx Transaction instance.
 * @transaction
 */
function trade( tx ) {
    tx.stock.low = Math.min( tx.price, tx.stock.low );
    tx.stock.high = Math.max( tx.price, tx.stock.high );
    tx.stock.change = Math.round( ( tx.price - tx.stock.last ) * 100 ) / 100;
    tx.stock.last = tx.price;

    // Get the asset registry
    return getAssetRegistry( 'org.gk01.biznet.Stock' )
      .then( function( registry ) {
        // Update the asset
        return registry.update( tx.stock );
      } )
      .then( function() {
      // Generate event
      var event = getFactory().newEvent(
        'org.gk01.biznet',
        'TradeComplete'
      );

      // Set properties
      event.symbol = tx.stock.symbol;
      event.low = tx.stock.low;
      event.high = tx.stock.high;
      event.open = tx.stock.open;
      event.last = tx.stock.last;
      event.change = tx.stock.change;

      // Emit
      emit( event );
    } );
  }

  /**
   * Change stock values as transaction to get event notification.
   * @param {org.gk01.biznet.Basket} tx Transaction instance.
   * @transaction
   */
  function basket( tx ) {
    for( var s = 0; s < tx.lot.length; s++ ) {
      tx.lot[s].low = Math.min( tx.prices[s], tx.lot[s].low );
      tx.lot[s].high = Math.max( tx.prices[s], tx.lot[s].high );
        tx.lot[s].change = Math.round( ( tx.prices[s] - tx.lot[s].last ) * 100 ) / 100;
        tx.lot[s].last = tx.prices[s];
    }

    return getAssetRegistry( 'org.gk01.biznet.Stock' )
      .then( function( registry ) {
        // Update the assets
        return registry.updateAll( tx.lot );
      } )
        .then( function() {
        // Generate event
        var event = getFactory().newEvent(
          'org.gk01.biznet',
          'BasketComplete'
        );

        // Stocks with applied changes
        event.lot = tx.lot;

        // Emit
        emit( event );
      } );
  }
