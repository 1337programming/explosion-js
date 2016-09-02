import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {Location} from '@angular/common';
let template = require('./views/home.html');
let style = require('!!raw!sass!./views/home.scss');

@Component({
  selector: 'home',
  template: template,
  styles: [style]
})
export class HomeComponent {
  
  constructor(public location: Location, private router: Router) {
    
  }
}