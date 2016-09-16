import {Component, Inject, HostListener} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {Random} from 'app/src/common/services/random.service';
import {Samples} from 'app/src/common/services/samples.service';
import {Audio} from 'app/src/common/services/audio.service';
import {Settings, FIREBASE} from 'app/src/core/settings/settings';
import 'rxjs/add/operator/bufferTime';
let io = require('socket.io-client');

let style = require('!!raw!sass!./views/dashboard.scss');
let template  = require('./views/dashboard.html');

@Component({
  selector: 'dashboard',
  template: template,
  providers: [Audio],
  styles: [style]
})
export class DashboardComponent {
  private  clicks = new Subject<{x: number, y: number, sentiment: any, text: string, topic: string, name?: string}>();
  private noteSampler = this.random.sampler(this.notes);
  private chimes = this.clicks.map(({x, y, sentiment, text, topic}) => ({
    x,
    y,
    sentiment,
    text,
    topic,
    note: this.noteSampler(),
    state: 'chiming',
    muted: this.muted
  })).bufferTime(5000, 10);
  
  private clicked = false;
  private state: string;
  private muted: boolean;
  
  private edgeBufferPct = 0.6;
  
  private socket: any;
  
  constructor(private random: Random,
              private samples: Samples,
              @Inject('notes') private notes,
              @Inject('audioContext') private audioCtx) {
    
    
    this.socket = io.connect(Settings.API_ENDPOINT);
    this.socket.on('Topic', (topic) => {
      this.renderChime(topic);
    });
  }
  
  private getXCoordinate() {
    return Random.getRandomIntInclusive(0, window.innerWidth - 100);
  }
  
  private getYCoordinate() {
    return Random.getRandomIntInclusive(0, window.innerHeight - 100);
  }
  
  private renderChime(data) {
    this.clicks.next({
      // x: Random.getRandomIntInclusive(window.innerWidth * 0.05, (window.innerWidth * 0.45)),
      x: this.getXCoordinate(),
      y: this.getYCoordinate(),
      sentiment: 0,
      name: data.name,
      text: data.text,
      topic: data.username
    });
  }
  
  @HostListener('click', ['$event'])
  private onClick(event: MouseEvent) {
    if (!this.clicked) {
      // unlock audio on ios
      const src = this.audioCtx.createBufferSource();
      src.buffer = this.audioCtx.createBuffer(1, 1, 22050);
      src.connect(this.audioCtx.destination);
      src.start(0);
    }
    this.clicked = true;
    if (!this.isDone()) {
      this.clicks.next({
        x: event.clientX,
        y: event.clientY,
        sentiment: this.random.randomSentiment(),
        text: this.random.randomStatement(),
        topic: 'Default'
      });
    }
  }
  
  private isDone() {
    return this.state === 'done';
  }
}
