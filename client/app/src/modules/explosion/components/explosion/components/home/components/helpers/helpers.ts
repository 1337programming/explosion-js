export function rand (rMi:number, rMa:number):number {
  return ~~((Math.random() * (rMa - rMi + 1)) + rMi);
}

export function hitTest(x1:number, y1:number, w1:number, h1:number, x2:number, y2:number, w2:number, h2:number):boolean {
  return !(x1 + w1 < x2 || x2 + w2 < x1 || y1 + h1 < y2 || y2 + h2 < y1);
}
