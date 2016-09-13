import {Master} from '../helpers/master';
import {rand} from '../helpers/helpers';
import {Coord} from '../interfaces/fireworks.interface';

export class Firework {
  
  public lineWidth: number;
  public x: number;
  public y: number;
  public startX: number;
  public startY: number;
  public hitX: boolean;
  public hitY: boolean;
  
  private coordLast: Coord[];
  private targetX: number;
  private targetY: number;
  private speed: number;
  private angle: number;
  private shockwaveAngle: number;
  private acceleration: number;
  private hue: number;
  private brightness: number;
  private alpha: number;
  private targetRadius: number;
  private dt: number;
  private showTarget: boolean;
  private showShockwave: boolean;
  
  constructor(startX: number, startY: number, targetX: number, targetY: number) {
    this.x = startX;
    this.y = startY;
    this.startX = startX;
    this.startY = startY;
    this.hitX = false;
    this.hitY = false;
    this.coordLast = [
      {x: startX, y: startY},
      {x: startX, y: startY},
      {x: startX, y: startY}
    ];
    this.targetX = targetX;
    this.targetY = targetY;
    this.speed = Master.fworkSpeed;
    this.angle = Math.atan2(targetY - startY, targetX - startX);
    this.shockwaveAngle = Math.atan2(targetY - startY, targetX - startX) + (90 * (Math.PI / 180));
    this.acceleration = Master.fworkAccel / 100;
    this.hue = rand(Master.hueMin, Master.hueMax);
    this.brightness = rand(50, 80);
    this.alpha = rand(50, 100) / 100;
    this.lineWidth = Master.lineWidth;
    this.targetRadius = 1;
    this.dt = Master.dt;
    this.showTarget = Master.showTarget;
    this.showShockwave = Master.showShockwave;
  }
  
  public update() {
    let vx = Math.cos(this.angle) * this.speed;
    let vy = Math.sin(this.angle) * this.speed;
    this.speed *= 1 + this.acceleration;
    this.coordLast[2].x = this.coordLast[1].x;
    this.coordLast[2].y = this.coordLast[1].y;
    this.coordLast[1].x = this.coordLast[0].x;
    this.coordLast[1].y = this.coordLast[0].y;
    this.coordLast[0].x = this.x;
    this.coordLast[0].y = this.y;
    
    if (this.showTarget) {
      if (this.targetRadius < 8) {
        this.targetRadius += .25 * this.dt;
      } else {
        this.targetRadius = this.dt;
      }
    }
    
    if (this.startX >= this.targetX) {
      if (this.x + vx <= this.targetX) {
        this.x = this.targetX;
        this.hitX = true;
      } else {
        this.x += vx * this.dt;
      }
    } else {
      if (this.x + vx >= this.targetX) {
        this.x = this.targetX;
        this.hitX = true;
      } else {
        this.x += vx * this.dt;
      }
    }
    
    if (this.startY >= this.targetY) {
      if (this.y + vy <= this.targetY) {
        this.y = this.targetY;
        this.hitY = true;
      } else {
        this.y += vy * this.dt;
      }
    } else {
      if (this.y + vy >= this.targetY) {
        this.y = this.targetY;
        this.hitY = true;
      } else {
        this.y += vy * this.dt;
      }
    }
    
    return {hitX: this.hitX, hitY: this.hitY, targetX: this.targetX, targetY: this.targetY, hue: this.hue};
  }
  
  public draw(ctx: CanvasRenderingContext2D): CanvasRenderingContext2D {
    var coordRand = (rand(1, 3) - 1);
    ctx.beginPath();
    ctx.moveTo(Math.round(this.coordLast[coordRand].x), Math.round(this.coordLast[coordRand].y));
    ctx.lineTo(Math.round(this.x), Math.round(this.y));
    ctx.closePath();
    ctx.strokeStyle = 'hsla(' + this.hue + ', 100%, ' + this.brightness + '%, ' + this.alpha + ')';
    ctx.stroke();
    
    if (this.showTarget) {
      ctx.save();
      ctx.beginPath();
      ctx.arc(Math.round(this.targetX), Math.round(this.targetY), this.targetRadius, 0, Math.PI * 2, false)
      ctx.closePath();
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.restore();
    }
    
    if (this.showShockwave) {
      ctx.save();
      ctx.translate(Math.round(this.x), Math.round(this.y));
      ctx.rotate(this.shockwaveAngle);
      ctx.beginPath();
      ctx.arc(0, 0, 1 * (this.speed / 5), 0, Math.PI, true);
      ctx.strokeStyle = 'hsla(' + this.hue + ', 100%, ' + this.brightness + '%, ' + rand(25, 60) / 100 + ')';
      ctx.lineWidth = this.lineWidth;
      ctx.stroke();
      ctx.restore();
    }
    
    return ctx;
  }
}
