interface MasterI {
  partSpeed:number;
  partSpeedVariance:number;
  partFriction:number;
  partGravity:number;
  hueVariance:number;
  lineWidth:number;
  dt:number;
  cw:number;
  ch:number;
  ctx:any;
  showTarget:boolean;
  showShockwave:boolean;
}
export let Master:MasterI = {
  partSpeed: 5,
  partSpeedVariance: 10,
  partFriction: 5,
  partGravity: 1,
  hueVariance: 30,
  lineWidth: 1,
  dt: 0,
  cw: 600,
  ch: 400,
  ctx: null, //@TODO build ctx
  showTarget: true,
  showShockwave: false
};