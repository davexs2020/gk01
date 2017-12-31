"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
require("nativescript-websockets");
var AppComponent = (function () {
    function AppComponent(zone) {
        this.zone = zone;
        // this.socket = new WebSocket("ws://192.168.57.1:12345/ws", []);
        this.socket = new WebSocket("ws://localhost:3000/KeeperCampaign", []);
        this.messages = [];
        this.chatBox = "";
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.socket.addEventListener('open', function (event) {
            console.log("The socket is open!");
            _this.zone.run(function () {
                _this.messages.push({ kpname: "Welcome to the chat!" });
            });
        });
        this.socket.addEventListener('message', function (event) {
            _this.zone.run(function () {
                _this.messages.push(JSON.parse(event.data));
            });
        });
        this.socket.addEventListener('close', function (event) {
            _this.zone.run(function () {
                _this.messages.push({ content: "You have been disconnected" });
            });
        });
        this.socket.addEventListener('error', function (event) {
            console.log("The socket had an error", event.error);
        });
    };
    AppComponent.prototype.ngOnDestroy = function () {
        this.socket.close();
    };
    AppComponent.prototype.send = function () {
        if (this.chatBox) {
            this.socket.send(this.chatBox);
            this.chatBox = "";
        }
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: "my-app",
            templateUrl: "app.component.html",
        }),
        __metadata("design:paramtypes", [core_1.NgZone])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBcUU7QUFDckUsT0FBTyxDQUFDLHlCQUF5QixDQUFDLENBQUM7QUFNbkM7SUFNSSxzQkFBMkIsSUFBWTtRQUFaLFNBQUksR0FBSixJQUFJLENBQVE7UUFDbkMsaUVBQWlFO1FBQ2pFLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxTQUFTLENBQUMsb0NBQW9DLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDdEUsSUFBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7UUFDbkIsSUFBSSxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUM7SUFDdEIsQ0FBQztJQUVNLCtCQUFRLEdBQWY7UUFBQSxpQkFvQkM7UUFuQkcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUUsVUFBQSxLQUFLO1lBQ3RDLE9BQU8sQ0FBQyxHQUFHLENBQUMscUJBQXFCLENBQUMsQ0FBQztZQUNuQyxLQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQztnQkFDVixLQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFDLE1BQU0sRUFBRSxzQkFBc0IsRUFBQyxDQUFDLENBQUM7WUFDekQsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxFQUFFLFVBQUEsS0FBSztZQUN6QyxLQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQztnQkFDVixLQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQy9DLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxVQUFBLEtBQUs7WUFDdkMsS0FBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUM7Z0JBQ1YsS0FBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBQyxPQUFPLEVBQUUsNEJBQTRCLEVBQUMsQ0FBQyxDQUFDO1lBQ2hFLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxVQUFBLEtBQUs7WUFDdkMsT0FBTyxDQUFDLEdBQUcsQ0FBQyx5QkFBeUIsRUFBRSxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDeEQsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRU0sa0NBQVcsR0FBbEI7UUFDSSxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ3hCLENBQUM7SUFFTSwyQkFBSSxHQUFYO1FBQ0ksRUFBRSxDQUFBLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDZCxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDL0IsSUFBSSxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUM7UUFDdEIsQ0FBQztJQUNMLENBQUM7SUE1Q1EsWUFBWTtRQUp4QixnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLFFBQVE7WUFDbEIsV0FBVyxFQUFFLG9CQUFvQjtTQUNwQyxDQUFDO3lDQU9tQyxhQUFNO09BTjlCLFlBQVksQ0E4Q3hCO0lBQUQsbUJBQUM7Q0FBQSxBQTlDRCxJQThDQztBQTlDWSxvQ0FBWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBPbkRlc3Ryb3ksIE5nWm9uZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5yZXF1aXJlKFwibmF0aXZlc2NyaXB0LXdlYnNvY2tldHNcIik7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcIm15LWFwcFwiLFxuICAgIHRlbXBsYXRlVXJsOiBcImFwcC5jb21wb25lbnQuaHRtbFwiLFxufSlcbmV4cG9ydCBjbGFzcyBBcHBDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG5cbiAgICBwcml2YXRlIHNvY2tldDogYW55O1xuICAgIHB1YmxpYyBtZXNzYWdlczogQXJyYXk8YW55PjtcbiAgICBwdWJsaWMgY2hhdEJveDogc3RyaW5nO1xuXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKHByaXZhdGUgem9uZTogTmdab25lKSB7XG4gICAgICAgIC8vIHRoaXMuc29ja2V0ID0gbmV3IFdlYlNvY2tldChcIndzOi8vMTkyLjE2OC41Ny4xOjEyMzQ1L3dzXCIsIFtdKTtcbiAgICAgICAgdGhpcy5zb2NrZXQgPSBuZXcgV2ViU29ja2V0KFwid3M6Ly9sb2NhbGhvc3Q6MzAwMC9LZWVwZXJDYW1wYWlnblwiLCBbXSk7XG4gICAgICAgIHRoaXMubWVzc2FnZXMgPSBbXTtcbiAgICAgICAgdGhpcy5jaGF0Qm94ID0gXCJcIjtcbiAgICB9XG5cbiAgICBwdWJsaWMgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMuc29ja2V0LmFkZEV2ZW50TGlzdGVuZXIoJ29wZW4nLCBldmVudCA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIlRoZSBzb2NrZXQgaXMgb3BlbiFcIik7XG4gICAgICAgICAgICB0aGlzLnpvbmUucnVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLm1lc3NhZ2VzLnB1c2goe2twbmFtZTogXCJXZWxjb21lIHRvIHRoZSBjaGF0IVwifSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuc29ja2V0LmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCBldmVudCA9PiB7XG4gICAgICAgICAgICB0aGlzLnpvbmUucnVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLm1lc3NhZ2VzLnB1c2goSlNPTi5wYXJzZShldmVudC5kYXRhKSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuc29ja2V0LmFkZEV2ZW50TGlzdGVuZXIoJ2Nsb3NlJywgZXZlbnQgPT4ge1xuICAgICAgICAgICAgdGhpcy56b25lLnJ1bigoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5tZXNzYWdlcy5wdXNoKHtjb250ZW50OiBcIllvdSBoYXZlIGJlZW4gZGlzY29ubmVjdGVkXCJ9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5zb2NrZXQuYWRkRXZlbnRMaXN0ZW5lcignZXJyb3InLCBldmVudCA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIlRoZSBzb2NrZXQgaGFkIGFuIGVycm9yXCIsIGV2ZW50LmVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHVibGljIG5nT25EZXN0cm95KCkge1xuICAgICAgICB0aGlzLnNvY2tldC5jbG9zZSgpO1xuICAgIH1cblxuICAgIHB1YmxpYyBzZW5kKCkge1xuICAgICAgICBpZih0aGlzLmNoYXRCb3gpIHtcbiAgICAgICAgICAgIHRoaXMuc29ja2V0LnNlbmQodGhpcy5jaGF0Qm94KTtcbiAgICAgICAgICAgIHRoaXMuY2hhdEJveCA9IFwiXCI7XG4gICAgICAgIH1cbiAgICB9XG5cbn0iXX0=