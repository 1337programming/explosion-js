import {rand, hitTest} from '../helpers/helpers';
import {Master} from '../helpers/master';
import {Coord} from '../interfaces/fireworks.interface';

export class Particle {
  
  private x: number;
  private y: number;
  private coordLast: Array<Coord>;
  private angle: number;
  private speed: number;
  private friction: number;
  private gravity: number;
  private hue: number;
  private brightness: number;
  private alpha: number;
  private decay: number;
  private wind: number;
  private lineWidth: number;
  private radius: number;
  
  constructor(x: number, y: number, hue: number) {
    this.x = x;
    this.y = y;
    this.coordLast = [
      {x: x, y: y},
      {x: x, y: y},
      {x: x, y: y}
    ];
    this.radius = 1;
    this.angle = rand(0, 360);
    this.speed = rand(((Master.partSpeed - Master.partSpeedVariance) <= 0) ? 1 : Master.partSpeed - Master.partSpeedVariance, (Master.partSpeed + Master.partSpeedVariance));
    this.friction = 1 - Master.partFriction / 100;
    this.gravity = Master.partGravity / 2;
    this.hue = rand(hue - Master.hueVariance, hue + Master.hueVariance);
    this.brightness = rand(50, 80);
    this.alpha = rand(40, 100) / 100;
    this.decay = rand(10, 50) / 1000;
    this.wind = (rand(0, Master.partWind) - (Master.partWind / 2)) / 25;
    this.lineWidth = Master.lineWidth;
    
  }
  
  public update(): boolean {
    let radians = this.angle * Math.PI / 180;
    let vx = Math.cos(radians) * this.speed;
    let vy = Math.sin(radians) * this.speed + this.gravity;
    this.speed *= this.friction;
    
    this.coordLast[2].x = this.coordLast[1].x;
    this.coordLast[2].y = this.coordLast[1].y;
    this.coordLast[1].x = this.coordLast[0].x;
    this.coordLast[1].y = this.coordLast[0].y;
    this.coordLast[0].x = this.x;
    this.coordLast[0].y = this.y;
    
    this.x += vx * Master.dt;
    this.y += vy * Master.dt;
    
    this.angle += this.wind;
    this.alpha -= this.decay;
    
    if (!hitTest(0, 0, Master.cw, Master.ch, this.x - this.radius, this.y - this.radius, this.radius * 2, this.radius * 2)) {
      return true;
    } else if (this.alpha < .05) {
      return true;
    } else {
      return false
    }
    
  }
  
  public draw(ctx: CanvasRenderingContext2D): CanvasRenderingContext2D {
    var coordRand = (rand(1, 3) - 1);
    ctx.beginPath();
    ctx.moveTo(Math.round(this.coordLast[coordRand].x), Math.round(this.coordLast[coordRand].y));
    ctx.lineTo(Math.round(this.x), Math.round(this.y));
    ctx.closePath();
    ctx.strokeStyle = 'hsla(' + this.hue + ', 100%, ' + this.brightness + '%, ' + this.alpha + ')';
    ctx.stroke();
    
    if (Master.flickerDensity > 0) {
      var inverseDensity = 50 - Master.flickerDensity;
      if (rand(0, inverseDensity) === inverseDensity) {
        ctx.beginPath();
        ctx.arc(Math.round(this.x), Math.round(this.y), rand(this.lineWidth, this.lineWidth + 3) / 2, 0, Math.PI * 2, false);
        ctx.closePath();
        var randAlpha = rand(50, 100) / 100;
        ctx.fillStyle = 'hsla(' + this.hue + ', 100%, ' + this.brightness + '%, ' + randAlpha + ')';
        ctx.fill();
      }
    }
    return ctx;
  }
}