import {Component, OnInit, ViewChild, OnDestroy} from '@angular/core';
import {Response} from '@angular/http';
import {DomSanitizer, SafeUrl, SafeStyle} from '@angular/platform-browser';
import {Observable} from 'rxjs';
import {HomeService} from './services/home.service';
import {Fireworks} from './components/fireworks/fireworks.component';
import {FIREBASE} from '../../core/settings/settings';
import {Question, EID} from './interfaces/home.interface';
import {randomSuccessMessage, randomWarningEmptyMessage, randomWarningLoadingMessage} from './helper/messages';

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
export class HomeComponent implements OnInit, OnDestroy {
  
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
  private count:string;
  
  private welovefontSafe:SafeStyle;
  private googleFontSafe1:SafeStyle;
  private googleFontSafe2:SafeStyle;
  
  constructor(private homeService: HomeService, private sanitizer:DomSanitizer) {
    this.loading = false;
    this.topic = '';
    this.buzzword = '';
    this.count = '10';
    this.showBuzzword = false;
    this.expload = false;
    this.welovefontSafe = sanitizer.bypassSecurityTrustStyle('http://weloveiconfonts.com/api/?family=iconicfill');
    this.googleFontSafe1 = sanitizer.bypassSecurityTrustStyle('http://fonts.googleapis.com/css?family=Arvo');
    this.googleFontSafe2 = sanitizer.bypassSecurityTrustStyle('http://fonts.googleapis.com/css?family=Lato:300|Oswald');
    let questionRef = FIREBASE.database().ref('survey-questions');
    console.log('reference', questionRef);
    questionRef.on('value', (data) => {
      let info = data.val();
      if (info.fireworks === true) {
        this.expload = true;
        this.fireworks.run();
      }
      this.questions = info.questions;
    });
  }
  
  public ngOnInit() {
    this.homeService.openSocket();
    this.showSuccess('Connected');
    this.loading = true;
    this.homeService.buzzwordAdded.subscribe((res) => {
      this.showBuzzword = true;
    }, (err) => {
      this.showError(err);
    });
    this.homeService.detonate.subscribe((res) => {
      this.expload = true;
      this.fireworks.run();
    }, (err) => {
      this.showError(err);
    });
    this.homeService.getUserInfo().subscribe((res:EID) => {
      this.loading = false;
      console.log('USER ID', res);
      this.homeService.setName(res.enterpriseId)
    }, (err) => {
      this.loading = false;
      this.showError('Unable to get user info');
    });
  }
  
  public ngOnDestroy() {
    this.homeService.closeSocket();
  }
  
  private submitQuestion(input, name) {
    if (!input) {
      this.showError(randomWarningEmptyMessage());
    } else if (this.loading) {
      this.showError(randomWarningLoadingMessage());
    } else {
      this.loading = true;
      this.homeService.submitQuestion(input, name).subscribe((res) => {
        console.log(res);
        this.clearInput(name);
        this.showSuccess();
        this.loading = false;
      }, (err) => {
        this.showError(err);
        this.loading = false;
      });
    }
  }
  
  private submitAll() {
    this.loading = true;
    let observables = [];
    for (let i:number = 0; i < this.questions.length; i++) {
      if (this.questions[i].input) {
        observables.push(this.homeService.submitQuestion(this.questions[i].input, this.questions[i].name));
      }
    }
    if (observables.length > 0) {
      Observable.forkJoin(observables).subscribe((data:Array<Response>) => {
        console.log(data);
        for (let i:number = 0; i < this.questions.length; i++) {
          this.questions[i].input = '';
        }
        this.loading = false;
        this.showSuccess();
      }, err => {
        this.loading = false;
        this.showError(err);
      });
    } else {
      this.showError('Nothing to submit');
      this.loading = false;
    }
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
  
  private showSuccess(msg?:string):void {
    this.success = true;
    if (msg) {
      this.message = msg;
    } else {
      this.message = randomSuccessMessage();
    }
    this.notify();
  }
  
  private notify():void {
    this.showNotification = true;
    setTimeout(() => {
      this.showNotification = false;
    }, 8000);
  }
  
}
