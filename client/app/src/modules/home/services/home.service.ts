import {Injectable, EventEmitter} from '@angular/core';
import {Http, Headers, Response} from '@angular/http';
import {Observable} from 'rxjs/observable';
import * as io from 'socket.io-client';
import {Settings, FIREBASE} from 'app/src/core/settings/settings';
import {EID} from '../interfaces/home.interface';
import Socket = SocketIOClient.Socket;

declare let window;

@Injectable()
export class HomeService {
  
  
  public buzzwordAdded: EventEmitter<any>;
  public detonate: EventEmitter<any>;
  
  private socket: Socket;
  private headers: Headers;
  
  constructor(private http: Http) {
    this.buzzwordAdded = new EventEmitter();
    this.detonate = new EventEmitter();
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
  }
  
  public submitQuestion(input: string, name: string): Observable<Response> {
    console.log(input, name);
    let body = {
      input: input,
      name: name,
      user: this.getName()
    };
    return this.http.post(`${Settings.API_ENDPOINT}/api/answer`, body, this.headers);
  }
  
  public getUserInfo(): Observable<EID> {
    return this.http.get('https://taworkshop.accenture.com/eid-api').map((res: Response) => res.json());
  }
  
  public setName(id: string): void {
    window['userEID'] = id;
  }
  
  public getName(): string {
    if (window['userEID']) {
      return window['userEID'];
    } else {
      return 'accenture.eid';
    }
  }
  
  public openSocket() {
    this.socket = io.connect(`${Settings.API_ENDPOINT}`);
    this.setEvents();
  }
  
  public closeSocket() {
    this.socket.disconnect();
  }
  
  private setEvents() {
    this.socket.on('FormChange', (res: any) => {
      this.buzzwordAdded.emit(null);
    });
    this.socket.on('Explosion', (res: any) => {
      this.detonate.emit(null);
    });
  }
  
}
