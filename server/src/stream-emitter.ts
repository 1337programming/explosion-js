declare let require: any;

let Rx = require('rx');

let hasOwnProp = {}.hasOwnProperty;

export class StreamEmitter {
  
  public subjects: any;
  
  constructor() {
    this.subjects = {};
  }
  
  public emit(name, data) {
    let fnName = StreamEmitter.createName(name);
    this.subjects[fnName] || (this.subjects[fnName] = new Rx.Subject());
    this.subjects[fnName].onNext(data);
  }
  
  public listen(name, handler) {
    let fnName = StreamEmitter.createName(name);
    this.subjects[fnName] || (this.subjects[fnName] = new Rx.Subject());
    return this.subjects[fnName].subscribe(handler);
  }
  
  public dispose() {
    let subjects = this.subjects;
    for (let prop in subjects) {
      if (hasOwnProp.call(subjects, prop)) {
        subjects[prop].dispose();
      }
    }
    
    this.subjects = {};
  }
  
  public notifyFormChange(): void {
    this.emit('FormChange', null);
  }
  
  public notifyExplosion(): void {
    this.emit('Explosion', null);
  }
  
  public notifyTopic(topic:any): void {
    this.emit('Topic', topic);
  }
  
  public notifyBuzzword(buzzword:any): void {
    this.emit('Buzzword', buzzword);
  }
  
  private static createName(name) {
    return `$${name}`;
  }
}
