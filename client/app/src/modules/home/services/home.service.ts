import {Injectable, EventEmitter} from '@angular/core';
import {Http, Headers, Response} from "@angular/http";
import {Observable} from 'rxjs/observable';
import * as io from 'socket.io-client';
import {Settings, FIREBASE} from 'app/src/core/settings/settings';

@Injectable()
export class HomeService {
  
  
  public buzzwordAdded: EventEmitter<any>;
  public detonate: EventEmitter<any>;
  
  private socket:any;
  private headers:Headers;
  constructor(private http:Http) {
    this.buzzwordAdded = new EventEmitter();
    this.detonate = new EventEmitter();
    console.log(Settings.API_ENDPOINT);
    this.socket = io.connect(`${Settings.API_ENDPOINT}`);
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.setEvents();
  }
  
  public submitQuestion(input:string, name:string):Observable<Response> {
    console.log(input, name);
    let body = {
      input:input,
      name:name,
      user:"accenture.eid"
    };
    return this.http.post(`${Settings.API_ENDPOINT}/api/answer`, body, this.headers);
  }
  
  private setEvents() {
    this.socket.on('FormChange', (res:any) => {
      this.buzzwordAdded.emit(null);
    });
    this.socket.on('Explosion', (res:any) => {
      this.detonate.emit(null);
    });
  }
  
}
