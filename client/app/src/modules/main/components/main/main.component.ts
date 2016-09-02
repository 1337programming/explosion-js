import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {Location} from '@angular/common';
let template = require('./views/main.html');
let style = require('!!raw!sass!./views/main.scss');

@Component({
  selector: 'main',
  template: template,
  styles: [style]
})
export class MainComponent {
  
  constructor(public location: Location, private router: Router) {
    
  }
}