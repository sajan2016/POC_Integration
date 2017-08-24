import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HttpModule }    from '@angular/http';
import { HomeComponent } from './home/home.component';

import { SocketService } from './shared/socket.service';

@NgModule({
  imports: [ BrowserModule,
                   FormsModule,
                   HttpModule
                   ],
  declarations: [ AppComponent,
                          HomeComponent],
  providers: [ SocketService ],
  bootstrap:    [ AppComponent ]
})

export class AppModule { }