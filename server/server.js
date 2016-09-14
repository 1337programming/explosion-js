"use strict";
var authentication_1 = require('./src/authentication');
var proxies_1 = require('./src/proxies');
var stream_emitter_1 = require('./src/stream-emitter');
var esHelper_1 = require('./src/esHelper');
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');
var bodyParser = require('body-parser');
var Config = require(path.resolve('../env.json'));
// Emitter used and shared across the server
var streamEmitter = new stream_emitter_1.StreamEmitter();
var esHelper = new esHelper_1.EsHelper();
var Router = proxies_1.DefineProxies(streamEmitter, esHelper);
var AuthInstance = new authentication_1.Authentication(Config.SERVER_CONFIG.PORT);
app.use(bodyParser.json());
app.use(AuthInstance.allowCrossDomain);
app.use('/api', Router);
app.get('/', function (req, res) {
    res.sendFile(path.resolve('index.html'));
});
io.on('connection', function (socket) {
    console.log('a user connected');
    var formChangeSubscription = streamEmitter.listen('FormChange', function () {
        console.log('Buzzword field added');
        socket.emit('FormChange', null);
    });
    var explosionSubscription = streamEmitter.listen('Explosion', function () {
        console.log('Explosion Emitted');
        socket.emit('Explosion', null);
    });
    var topicSubscription = streamEmitter.listen('Topic', function (topic) {
        socket.emit('Topic', topic);
    });
    var buzzWordSubscription = streamEmitter.listen('Buzzword', function (buzzword) {
        socket.emit('Buzzword', buzzword);
    });
    socket.on('disconnect', function () {
        console.log('user disconnected');
        formChangeSubscription.dispose();
        explosionSubscription.dispose();
        topicSubscription.dispose();
        buzzWordSubscription.dispose();
    });
});
http.listen(Config.SERVER_CONFIG.PORT, function () {
    console.log('listening on *:3000');
});
