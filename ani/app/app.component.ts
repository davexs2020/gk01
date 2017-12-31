import { Component, OnInit, OnDestroy, NgZone } from "@angular/core";
require("nativescript-websockets");

@Component({
    selector: "my-app",
    templateUrl: "app.component.html",
})
export class AppComponent implements OnInit, OnDestroy {

    private socket: any;
    public messages: Array<any>;
    public chatBox: string;

    public constructor(private zone: NgZone) {
        // this.socket = new WebSocket("ws://192.168.57.1:12345/ws", []);
        this.socket = new WebSocket("ws://localhost:3000/KeeperCampaign", []);
        this.messages = [];
        this.chatBox = "";
    }

    public ngOnInit() {
        this.socket.addEventListener('open', event => {
            console.log("The socket is open!");
            console.log(JSON.stringify(messages));
            this.zone.run(() => {
                this.messages.push({kpname: "Welcome to the chat!"});
            });
        });
        this.socket.addEventListener('message', event => {
            this.zone.run(() => {
                this.messages.push(JSON.parse(event.data));
            });
        });
        this.socket.addEventListener('close', event => {
            this.zone.run(() => {
                this.messages.push({content: "You have been disconnected"});
            });
        });
        this.socket.addEventListener('error', event => {
            console.log("The socket had an error", event.error);
        });
    }

    public ngOnDestroy() {
        this.socket.close();
    }

    public send() {
        if(this.chatBox) {
            this.socket.send(this.chatBox);
            this.chatBox = "";
        }
    }

}