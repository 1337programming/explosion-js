import {Component, OnInit, ViewChild} from '@angular/core';
import {HomeService} from "./services/home.service";
import {Response} from "@angular/http";
import {Fireworks} from './components/fireworks/fireworks.component';
import {FIREBASE} from '../../core/settings/settings';
let template = require('./views/home.html');
let style = require('!!raw!sass!./views/home.scss');
let notification = require('!!raw!sass!./views/notification.scss');
let fade = require('!!raw!sass!./views/fade-in-out.scss');

interface SurveyQuestions {
  questions: Array<Question>
}
interface Question {
  description: string;
  name: string;
  input?: string;
}

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
  
  private questions:Array<Question>;
  
  constructor(private homeService: HomeService) {
    this.topic = '';
    this.buzzword = '';
    this.showNotification = false;
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
    this.homeService.buzzwordAdded.subscribe((res) => {
      this.showBuzzword = true;
    });
    this.homeService.detonate.subscribe((res) => {
      this.expload = true;
      this.fireworks.run();
    });
  }
  
  private submitQuestion(input, name) {
    this.homeService.submitQuestion(input, name).subscribe((res: Response) => {
      console.log(res);
      this.clearInput(name);
    });
  }
  
  private clearInput(name) {
    for (let i:number = 0; i < this.questions.length; i++) {
      if (this.questions[i].name === name) {
        this.questions[i].input = '';
      }
    }
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
