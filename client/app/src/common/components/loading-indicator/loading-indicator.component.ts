import {Component, Input} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';

let template = require('./views/loading-indicator.html');
let style = require('!!raw!sass!./views/loading-indicator.scss');
@Component({
  selector: 'loading-indicator',
  template: template,
  styles: [style]
})
export class LoadingIndicator {
  @Input() progress = 0;
  
  constructor(private sanitizer:DomSanitizer){};
  
  getTransform1() {
    const rotation = Math.min(-180 + (this.progress / 50) * 180, 0);
    return this.sanitizer.bypassSecurityTrustStyle(`rotateZ(${rotation}deg)`);
  }
  getTransform2() {
    const rotation = Math.max(-180, Math.min(-180 + ((this.progress - 50) / 50) * 180, 0));
    return this.sanitizer.bypassSecurityTrustStyle(`rotateZ(${rotation}deg)`);
  }
}
