import {MasterI} from '../interfaces/fireworks.interface';

export let Master: MasterI = {
  partSpeed: 5,
  partSpeedVariance: 10,
  partFriction: 5,
  partWind: 50,
  partGravity: 1,
  hueVariance: 30,
  hueMin: 0,
  hueMax: 350,
  lineWidth: 1,
  flickerDensity: 20,
  fworkSpeed: 2,
  fworkAccel: 15,
  currentHue: 170,
  particleCount: 450,
  dt: 0,
  cw: innerWidth,
  ch: innerHeight,
  ctx: null,
  showTarget: true,
  showShockwave: false
};

export function BuildCTX(canvas: HTMLCanvasElement): CanvasRenderingContext2D {
  if (!canvas) {
    return null;
  }
  let ctx: CanvasRenderingContext2D = this.canvas.getContext('2d');
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  return ctx;
}

