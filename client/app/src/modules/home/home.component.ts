import {Component, OnInit, ViewChild} from '@angular/core';
import {Response} from "@angular/http";
import {Observable} from 'rxjs';
import {HomeService} from "./services/home.service";
import {Fireworks} from './components/fireworks/fireworks.component';
import {FIREBASE} from '../../core/settings/settings';
import {Question} from './interfaces/home.interface';

let template = require('./views/home.html');
let style = require('!!raw!sass!./views/home.scss');
let notification = require('!!raw!sass!./views/notification.scss');
let fade = require('!!raw!sass!./views/fade-in-out.scss');
let submit = require('!!raw!sass!./views/submit.scss');



@Component({
  selector: 'home',
  template: template,
  styles: [style, notification, fade, submit],
  providers: [HomeService]
})
export class HomeComponent implements OnInit {
  
  @ViewChild(Fireworks) fireworks: Fireworks;
  
  private topic: string;
  private buzzword: string;
  private message: string;
  private showNotification: boolean;
  private success:boolean;
  private showBuzzword: boolean;
  private expload: boolean;
  private questions:Array<Question>;
  private loading:boolean;
  private count:number;
  
  constructor(private homeService: HomeService) {
    this.loading = false;
    this.topic = '';
    this.buzzword = '';
    this.count = 10;
    this.showBuzzword = false;
    this.expload = false;
    let questionRef = FIREBASE.database().ref('survey-questions');
    console.log('reference', questionRef);
    questionRef.on('value', (data) => {
      let surveyQuestions = data.val();
      this.questions = surveyQuestions.questions;
    });
  }
  
  public ngOnInit() {
    this.showSuccess('Connected');
    this.homeService.buzzwordAdded.subscribe((res) => {
      this.showBuzzword = true;
    });
    this.homeService.detonate.subscribe((res) => {
      this.expload = true;
      this.fireworks.run();
    });
  }
  
  private submitQuestion(input, name) {
    this.homeService.submitQuestion(input, name).subscribe((res) => {
      console.log(res);
      this.clearInput(name);
    }, (err) => {
      this.showError(err);
    });
  }
  
  private submitAll() {
    this.loading = true;
    let observables = [];
    for (let i:number = 0; i < this.questions.length; i++) {
      if (this.questions[i].input) {
        observables.push(this.homeService.submitQuestion(this.questions[i].input, this.questions[i].name));
      }
    }
    Observable.forkJoin(observables).subscribe((data:Array<Response>) => {
      console.log(data);
      for (let i:number = 0; i < this.questions.length; i++) {
        this.questions[i].input = '';
      }
      this.loading = false;
    }, err => {
      this.showError(err);
    });
  }
  
  private clearInput(name) {
    for (let i:number = 0; i < this.questions.length; i++) {
      if (this.questions[i].name === name) {
        this.questions[i].input = '';
      }
    }
  }
  
  private closeNotification() {
    this.showNotification = false;
  }
  
  private showError(msg:string):void {
    this.success = false;
    this.message = msg;
    this.notify();
  }
  
  private showSuccess(msg:string):void {
    this.success = true;
    this.message = msg;
    this.notify();
  }
  
  private notify():void {
    this.showNotification = true;
    setTimeout(() => {
      this.showNotification = false;
    }, 8000);
  }
}
