import {Firework} from '../classes/firework';
import {Particle} from '../classes/particle';

export interface MasterI {
  partSpeed: number;
  partSpeedVariance: number;
  partFriction: number;
  partWind: number;
  partGravity: number;
  hueMin: number;
  hueMax: number;
  hueVariance: number;
  lineWidth: number;
  flickerDensity: number;
  fworkSpeed: number;
  fworkAccel: number;
  currentHue: number;
  particleCount: number;
  dt: number;
  cw: number;
  ch: number;
  ctx: CanvasRenderingContext2D;
  showTarget: boolean;
  showShockwave: boolean;
}

export interface Coord {
  x: number;
  y: number;
}

export interface FireworkI {
  audioStop: Function;
  firework: Firework;
}

export interface ParticleI {
  audioStop: Function;
  particle: Particle;
}
