import {Component, Inject} from '@angular/core';
import {Router} from '@angular/router';
import {Location} from '@angular/common';
import {Remote} from './common/services/remote.service';
import {Random} from './common/services/random.service';
import {Samples} from './common/services/samples.service';

@Component({
  selector: 'explosion',
  template: `
        <div (window:resize)="onWindowResize()">
            <router-outlet [hidden]="isLoading()"></router-outlet>
            <!--<loading-indicator *ngIf="isLoading()" [progress]="getLoadProgress()"></loading-indicator>-->
        </div>
            `,
  providers: [
    Remote,
    Random,
    Samples,
    Audio,
    {provide: 'audioContext', useValue: new (window['AudioContext'] || window['webkitAudioContext']) },
    {provide: 'size', useValue: {width: 1280, height: 780}},
    {provide: 'notes', useValue: ['C4', 'G4', 'C5', 'D5', 'E5']}
  ]
})
export class AppComponent {
  
  public bufferLoaded = false;
  public size:any;
  
  constructor(private samples:Samples) {
    this.size = {};
    this.onWindowResize();
    setTimeout(() => this.bufferLoaded = true, 4200);
  }
  onWindowResize() {
    this.size.width = window.innerWidth;
    this.size.height = window.innerHeight;
  }
  getLoadProgress() {
    const bfrCount = this.bufferLoaded ? 1 : 0;
    return 100 * (this.samples.loadedSampleCount + bfrCount) / (this.samples.totalSampleCount + 1);
  }
  isLoading() {
    return this.getLoadProgress() < 100;
  }
}
