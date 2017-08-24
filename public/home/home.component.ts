import { Component, OnInit } from '@angular/core';
import * as io from 'socket.io-client';
import { HttpModule, Http } from '@angular/http';
import 'rxjs/add/operator/map';


@Component({
    moduleId: module.id,
    selector: 'ch-home',
    styleUrls: ['home.styles.css'],
    templateUrl: 'home.template.html'
})

export class HomeComponent implements OnInit {
    messageText: string;
    messages: Array<any>;
    socket: SocketIOClient.Socket;

  constructor(
    private http:Http
    ){
   this.socket = io.connect('http://localhost:8000');
   // this.socket = io.connect();
  }

  getUser() {

    // console.log("Response",res);
    this.http.get('http://localhost:8000/test').map(res => res).subscribe(
      data => {
        console.log(data);
        //  window.location.href = '/#/app-p-profile-update';
      }, err => {
        console.log(err);
        // alert("Could not Sign Up User !!");
        // window.location.reload();
      });
  }

  ngOnInit() {
      this.socket.emit('event1', {
          msg: 'Client to server, can you hear me server?'
      });

      this.socket.on('event2', (data: any) => {
        console.log(data.msg);
        this.socket.emit('event3', {
            msg: 'Yes, its working for me!!'
        });
      });

      this.socket.on('event4', (data: any) => {
          console.log(data.msg);
      });
   }

}
