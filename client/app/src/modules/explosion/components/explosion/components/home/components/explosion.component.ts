import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {Master} from './master';
let template = require('./views/explosion.html');
let style = require('!!raw!sass!./views/explosion.scss');

@Component({
  selector: 'explosion',
  template: template,
  styles: [style]
})
export class Explosion {
  
  @ViewChild("explosion") explosionCanvas: ElementRef;
  
  private ctx:any;
  private canvas:any;
  private particles:Array<any>;
  private fireworks:Array<any>;
  private dt:number;
  private oldTime:number;
  private cw:number;
  private ch:number;
  private mx:number;
  private my:number;
  private partCount:number;
  private currentHue:number;
  private partSpeed:number;
  private partSpeedVariance:number;
  private partWind:number;
  private partFriction:number;
  private partGravity:number;
  private hueMin:number;
  private hueMax:number;
  private fworkSpeed:number;
  private fworkAccel:number;
  private hueVariance:number;
  private flickerDensity:number;
  private clearAlpha:number;
  private lineWidth:number;
  private particleCount:number;
  
  public showShockwave:boolean;
  public showTarget: boolean;
  
  
  
  constructor() {
    this.dt = 0;
    this.oldTime = Date.now();
    this.canvas = this.explosionCanvas.nativeElement;
    this.canvasContainer = $('#canvas-container');
  
    var canvasContainerDisabled = document.getElementById('canvas-container');
    this.canvas.onselectstart = function () {
      return false;
    };
  
    this.canvas.width = this.cw = 600;
    this.canvas.height = this.ch = 400;
  
    this.particles = [];
    this.partCount = 30;
    this.fireworks = [];
    this.mx = this.cw / 2;
    this.my = this.ch / 2;
    this.currentHue = 170;
    this.partSpeed = 5;
    this.partSpeedVariance = 10;
    this.partWind = 50;
    this.partFriction = 5;
    this.partGravity = 1;
    this.hueMin = 150;
    this.hueMax = 200;
    this.fworkSpeed = 2;
    this.fworkAccel = 4;
    this.hueVariance = 30;
    this.flickerDensity = 20;
    this.showShockwave = false;
    this.showTarget = true;
    this.clearAlpha = 25;
  
    this.canvasContainer.append(this.canvas);
    this.ctx = this.canvas.getContext('2d');
    this.ctx.lineCap = 'round';
    this.ctx.lineJoin = 'round';
    this.lineWidth = 1;
    this.bindEvents();
    this.canvasLoop();
  
    this.canvas.onselectstart = function () {
      return false;
    };
  }
  
}