"use strict";
let Rx = require('rx');
let hasOwnProp = {}.hasOwnProperty;
class StreamEmitter {
    constructor() {
        this.subjects = {};
    }
    emit(name, data) {
        let fnName = StreamEmitter.createName(name);
        this.subjects[fnName] || (this.subjects[fnName] = new Rx.Subject());
        this.subjects[fnName].onNext(data);
    }
    listen(name, handler) {
        let fnName = StreamEmitter.createName(name);
        this.subjects[fnName] || (this.subjects[fnName] = new Rx.Subject());
        return this.subjects[fnName].subscribe(handler);
    }
    dispose() {
        let subjects = this.subjects;
        for (let prop in subjects) {
            if (hasOwnProp.call(subjects, prop)) {
                subjects[prop].dispose();
            }
        }
        this.subjects = {};
    }
    notifyFormChange() {
        this.emit('FormChange', null);
    }
    notifyExplosion() {
        this.emit('Explosion', null);
    }
    notifyTopic(topic) {
        this.emit('Topic', topic);
    }
    notifyBuzzword(buzzword) {
        this.emit('Buzzword', buzzword);
    }
    static createName(name) {
        return `$${name}`;
    }
}
exports.StreamEmitter = StreamEmitter;
//# sourceMappingURL=stream-emitter.js.map