import {Component, Inject} from '@angular/core';
import {Samples} from './common/services/samples.service';

@Component({
  selector: 'explosion',
  template: `
        <div (window:resize)="onWindowResize()">
            <router-outlet [hidden]="isLoading()"></router-outlet>
            <!--<loading-indicator *ngIf="isLoading()" [progress]="getLoadProgress()"></loading-indicator>-->
        </div>
            `
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
