import {Component, ChangeDetectionStrategy} from '@angular/core';
let style = require('!!raw!sass!./views/navbar.scss');

@Component({
  selector: 'navbar',
  template: require('./views/navbar.html'),
  styles: [style],
  changeDetection: ChangeDetectionStrategy.Default
})

export class NavbarComponent {
  constructor() {
  }
  
}
