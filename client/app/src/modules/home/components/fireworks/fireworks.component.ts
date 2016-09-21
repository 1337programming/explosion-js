import {Component, OnInit, AfterViewInit, ViewChild, ElementRef, HostListener} from '@angular/core';
import {Master, BuildCTX} from './helpers/master';
import {rand} from "./helpers/helpers";
import {Firework} from './classes/firework';
import {Particle} from './classes/particle';
import {Samples} from 'app/src/common/services/samples.service';
import {Audio} from 'app/src/common/services/audio.service';
import {ParticleI, FireworkI} from './interfaces/fireworks.interface';
let template = require('./views/fireworks.html');
let style = require('!!raw!sass!./views/fireworks.scss');

@Component({
  selector: 'fireworks',
  template: `<div #container><canvas #fireworks [attr.width]="width" [attr.height]="height"></canvas></div>`,
  styles: [style]
})
export class Fireworks implements AfterViewInit, OnInit {
  
  @ViewChild("fireworks") fireworksCanvas: ElementRef;
  @ViewChild("container") canvasContainer: ElementRef;
  
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;
  private particles: Array<ParticleI>;
  private fireworks: Array<FireworkI>;
  private dt: number;
  private oldTime: number;
  private cw: number;
  private ch: number;
  private mx: number;
  private my: number;
  private particleCount: number;
  private currentHue: number;
  private partSpeed: number;
  private partSpeedVariance: number;
  private partWind: number;
  private partFriction: number;
  private partGravity: number;
  private hueMin: number;
  private hueMax: number;
  private fworkSpeed: number;
  private fworkAccel: number;
  private hueVariance: number;
  private flickerDensity: number;
  private clearAlpha: number;
  private lineWidth: number;
  private width: number;
  private height: number;
  private timeout: number;
  public showShockwave: boolean;
  public showTarget: boolean;
  
  private rocketSamples: Array<any>;
  private explosionSamples: Array<any>;
  
  constructor(private samples: Samples, private audio: Audio) {
    this.width = innerWidth;
    this.height = innerHeight;
    this.dt = Master.dt;
    this.oldTime = Date.now();
    
    this.particles = [];
    this.particleCount = Master.particleCount;
    this.fireworks = [];
    this.mx = this.cw / 2;
    this.my = this.ch / 2;
    this.currentHue = Master.currentHue;
    this.partSpeed = Master.partSpeed;
    this.partSpeedVariance = Master.partSpeedVariance;
    this.partWind = Master.partWind;
    this.partFriction = Master.partFriction;
    this.partGravity = Master.partGravity;
    this.hueMin = Master.hueMin;
    this.hueMax = Master.hueMax;
    this.fworkSpeed = Master.fworkSpeed;
    this.fworkAccel = Master.fworkAccel;
    this.hueVariance = Master.hueVariance;
    this.flickerDensity = Master.flickerDensity;
    this.showShockwave = Master.showShockwave;
    this.showTarget = Master.showTarget;
    this.clearAlpha = 25;
    
    //this.canvasContainer.append(this.canvas);
    this.lineWidth = Master.lineWidth;
    this.explosionSamples = [];
    this.rocketSamples = [];
  }
  
  ngOnInit() {
    /*this.samples.getSample('explosion1').then(sample => {
     this.explosionSamples.push(sample);
     });*/
    this.samples.getSample('explosion2').then(sample => {
      this.explosionSamples.push(sample);
    });
    
    this.samples.getSample('rocket1').then(sample => {
      this.rocketSamples.push(sample);
    });
    this.samples.getSample('rocket2').then(sample => {
      this.rocketSamples.push(sample);
    });
    this.samples.getSample('rocket3').then(sample => {
      this.rocketSamples.push(sample);
    });
  }
  
  ngAfterViewInit() {
    this.canvas = this.fireworksCanvas.nativeElement;
    this.canvasContainer = this.canvasContainer.nativeElement;
    
    this.canvas.onselectstart = () => {
      return false;
    };
    
    this.canvas.width = this.cw = this.width;
    this.canvas.height = this.ch = this.height;
    
    this.timeout = setTimeout(() => {
      this.context.lineCap = 'round';
      this.context.lineJoin = 'round';
    }, 100);
    this.context = this.canvas.getContext('2d');
    
    this.canvasLoop();
  }
  
  public run(): void {
    let initialLaunchCount: number = 40, index: number;
    let delay: number = 750;
    if (this.detectmob()) {
      initialLaunchCount = 20;
      delay = 1500;
    }
    this.showTarget = false;
    while (initialLaunchCount--) {
      setTimeout(() => {
        index = rand(0, this.rocketSamples.length - 1);
        let fInstance: FireworkI = {
          audioStop: this.audio.play(this.rocketSamples[index]),
          firework: new Firework(this.cw / 2, this.ch, rand(50, this.cw - 50), rand(50, this.ch / 2) - 50)
        };
        this.fireworks.push(fInstance);
      }, initialLaunchCount * delay);
    }
  }
  
  private detectmob() {
    if (navigator.userAgent.match(/Android/i)
      || navigator.userAgent.match(/webOS/i)
      || navigator.userAgent.match(/iPhone/i)
      || navigator.userAgent.match(/iPad/i)
      || navigator.userAgent.match(/iPod/i)
      || navigator.userAgent.match(/BlackBerry/i)
      || navigator.userAgent.match(/Windows Phone/i)
    ) {
      return true;
    }
    else {
      return false;
    }
  }
  
  private canvasLoop() {
    requestAnimationFrame(() => {
      this.canvasLoop();
    });
    this.updateDelta();
    this.context.globalCompositeOperation = 'destination-out';
    this.context.fillStyle = 'rgba(0,0,0,' + this.clearAlpha / 100 + ')';
    this.context.fillRect(0, 0, this.cw, this.ch);
    this.context.globalCompositeOperation = 'lighter';
    this.updateFireworks();
    this.updateParticles();
    this.drawFireworks();
    this.drawParticles();
  }
  
  /**
   * UPDATE EVENTS
   */
  
  private updateDelta(): void {
    let newTime: number = Date.now();
    Master.dt = (newTime - this.oldTime) / 16;
    Master.dt = (Master.dt > 5) ? 5 : Master.dt;
    this.oldTime = newTime;
    this.dt = Master.dt;
  }
  
  private updateFireworks() {
    let i: number = this.fireworks.length;
    while (i--) {
      let firework: Firework = this.fireworks[i].firework;
      this.context.lineWidth = firework.lineWidth;
      let data = firework.update(); //@TODO data response type
      if (data.hitX && data.hitY) {
        //let randExplosion = rand(0, 9);
        this.createParticles(data.targetX, data.targetY, data.hue);
        this.fireworks[i].audioStop();
        this.fireworks.splice(i, 1);
      }
    }
  }
  
  private updateParticles() {
    let i: number = this.particles.length;
    while (i--) {
      let particle: Particle = this.particles[i].particle;
      let hit: boolean = particle.update();
      if (hit) {
        this.particles[i].audioStop();
        this.particles.splice(i, 1);
      }
    }
  }
  
  /**
   * DRAW EVENTS
   */
  
  private drawFireworks() {
    let i: number = this.fireworks.length;
    while (i--) {
      let firework: Firework = this.fireworks[i].firework;
      this.context.lineWidth = firework.lineWidth;
      this.context = firework.draw(this.context);
    }
  }
  
  private drawParticles() {
    let i: number = this.particles.length;
    while (i--) {
      let particle: Particle = this.particles[i].particle;
      this.context = particle.draw(this.context);
    }
  }
  
  /**
   * Spawn Events
   */
  
  private createFireworks(startX: number, startY: number, targetX: number, targetY: number) {
    let index: number = rand(0, this.rocketSamples.length - 1);
    let fInstance: FireworkI = {
      audioStop: this.audio.play(this.rocketSamples[index]),
      firework: new Firework(startX, startY, targetX, targetY)
    };
    this.fireworks.push(fInstance);
  }
  
  private createParticles(x: number, y: number, hue: number) {
    let index: number = rand(0, this.explosionSamples.length - 1);
    let countdown: number = this.particleCount;
    while (countdown--) {
      let pInstance: ParticleI = {
        audioStop: this.audio.play(this.explosionSamples[index]),
        particle: new Particle(x, y, hue)
      };
      this.particles.push(pInstance);
    }
  }
  
  private clear(): void {
    this.particles = [];
    this.fireworks = [];
    this.context.clearRect(0, 0, this.cw, this.ch);
  }
  
  // Mouse Events
  // @TODO theed to fix this
  
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    clearTimeout(this.timeout);
  }
  
  @HostListener('mousedown', ['$event'])
  onMouseDown(event: MouseEvent) {
    let randLaunch: number = rand(0, 5);
    this.mx = event.pageX;
    this.my = event.pageY;
    this.currentHue = rand(this.hueMin, this.hueMax);
    this.createFireworks(this.cw / 2, this.ch, this.mx, this.my);
  }
  
  @HostListener('mousemove.fireworks', ['$event'])
  onMouseMove(event: MouseEvent) {
    let randLaunch: number = rand(0, 5);
    this.mx = event.pageX;
    this.my = event.pageY;
    this.currentHue = rand(this.hueMin, this.hueMax);
    this.createFireworks(this.cw / 2, this.ch, this.mx, this.my);
  }
  
  @HostListener('mouseup', ['$event'])
  onMouseUp(event: MouseEvent) {
    
  }
  
}
