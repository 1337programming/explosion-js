import {Injectable, EventEmitter} from '@angular/core';
import * as io from 'socket.io-client';
import {Settings, FIREBASE} from 'app/src/core/settings/settings';
import Socket = SocketIOClient.Socket;


@Injectable()
export class DashboardService {
  
  public topicAdded: EventEmitter<any>;
  
  private socket: Socket;
  
  constructor() {
    this.topicAdded = new EventEmitter();
  }
  
  public openSocket() {
    this.socket = io.connect(`${Settings.API_ENDPOINT}`);
    this.setEvents();
  }
  
  public closeSocket() {
    this.socket.disconnect();
  }
  
  public setEvents() {
    this.socket.on('Topic', (topic) => {
      this.topicAdded.emit(topic);
    });
  }
}
