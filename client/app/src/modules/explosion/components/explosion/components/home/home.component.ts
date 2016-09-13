import {Component, OnInit, ViewChild} from '@angular/core';
import {HomeService} from "./services/home.service";
import {Response} from "@angular/http";
import {Fireworks} from './components/fireworks.component';
let template = require('./views/home.html');
let style = require('!!raw!sass!./views/home.scss');
let notification = require('!!raw!sass!./views/notification.scss');
let fade = require('!!raw!sass!./views/fade-in-out.scss');

@Component({
  selector: 'home',
  template: template,
  styles: [style, notification, fade],
  providers: [HomeService]
})
export class HomeComponent implements OnInit {
  
  @ViewChild(Fireworks) fireworks: Fireworks;
  
  public topic: string;
  public buzzword: string;
  public showNotification: boolean;
  public showBuzzword: boolean;
  public expload: boolean;
  
  constructor(private homeService: HomeService) {
    this.topic = '';
    this.buzzword = '';
    this.showNotification = false;
    this.showBuzzword = false;
    this.expload = false;
  }
  
  public ngOnInit() {
    this.homeService.buzzwordAdded.subscribe((res) => {
      this.showBuzzword = true;
    });
    this.homeService.detonate.subscribe((res) => {
      this.expload = true;
      this.fireworks.run();
    });
  }
  
  private submitTopic(topic) {
    this.homeService.sendTopic(topic).subscribe((res: Response) => {
      console.log(res);
      this.topic = '';
    });
  }
  
  private submitBuzzword(buzzword) {
    console.log(buzzword);
    this.buzzword = '';
  }
}
