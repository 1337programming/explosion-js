"use strict";
var Rx = require('rx');
var hasOwnProp = {}.hasOwnProperty;
var StreamEmitter = (function () {
    function StreamEmitter() {
        this.subjects = {};
    }
    StreamEmitter.prototype.emit = function (name, data) {
        var fnName = StreamEmitter.createName(name);
        this.subjects[fnName] || (this.subjects[fnName] = new Rx.Subject());
        this.subjects[fnName].onNext(data);
    };
    StreamEmitter.prototype.listen = function (name, handler) {
        var fnName = StreamEmitter.createName(name);
        this.subjects[fnName] || (this.subjects[fnName] = new Rx.Subject());
        return this.subjects[fnName].subscribe(handler);
    };
    StreamEmitter.prototype.dispose = function () {
        var subjects = this.subjects;
        for (var prop in subjects) {
            if (hasOwnProp.call(subjects, prop)) {
                subjects[prop].dispose();
            }
        }
        this.subjects = {};
    };
    StreamEmitter.prototype.notifyFormChange = function () {
        this.emit('FormChange', null);
    };
    StreamEmitter.prototype.notifyExplosion = function () {
        this.emit('Explosion', null);
    };
    StreamEmitter.prototype.notifyTopic = function (topic) {
        this.emit('Topic', topic);
    };
    StreamEmitter.prototype.notifyBuzzword = function (buzzword) {
        this.emit('Buzzword', buzzword);
    };
    StreamEmitter.createName = function (name) {
        return "$" + name;
    };
    return StreamEmitter;
}());
exports.StreamEmitter = StreamEmitter;
