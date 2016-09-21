import {Component} from '@angular/core';

let style = require('!!raw!sass!./views/loading.scss');

@Component({
  selector: 'loading',
  template: require('./views/loading.html'),
  styles: [style]
})
export class Loading {
  constructor() {
    
  }
}
