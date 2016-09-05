import {rand} from './helpers';

interface Coord {
  x: number;
  y: number;
}

export class Particle {
  
  private x: number;
  private y: number;
  private coordLast: Array<Coord>;
  private angle: number;
  private speed:number;
  private friction:number;
  private gravity: number;
  private hue: number;
  private brightness:number;
  private alpha:number;
  private decay:number;
  private wind:number;
  private lineWidth:number;
  
  constructor(x,y, hue) {
    this.x = x;
    this.y = y;
    this.coordLast = [
      {x: x, y: y},
      {x: x, y: y},
      {x: x, y: y}
    ];
    this.angle = rand(0, 360);
    this.speed = rand(((self.partSpeed - self.partSpeedVariance) <= 0) ? 1 : self.partSpeed - self.partSpeedVariance, (self.partSpeed + self.partSpeedVariance));
    this.friction = 1 - self.partFriction / 100;
    this.gravity = self.partGravity / 2;
    this.hue = rand(hue - self.hueVariance, hue + self.hueVariance);
    this.brightness = rand(50, 80);
    this.alpha = rand(40, 100) / 100;
    this.decay = rand(10, 50) / 1000;
    this.wind = (rand(0, self.partWind) - (self.partWind / 2)) / 25;
    this.lineWidth = self.lineWidth;
    
  }
}