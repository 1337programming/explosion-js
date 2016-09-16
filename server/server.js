"use strict";
const authentication_1 = require('./src/authentication');
const proxies_1 = require('./src/proxies');
const stream_emitter_1 = require('./src/stream-emitter');
const esHelper_1 = require('./src/esHelper');
let express = require('express');
let app = express();
let http = require('http').Server(app);
let io = require('socket.io')(http);
let path = require('path');
let bodyParser = require('body-parser');
let Config = require(path.resolve('../env.json'));
// Emitter used and shared across the server
let streamEmitter = new stream_emitter_1.StreamEmitter();
let esHelper = new esHelper_1.EsHelper();
let Router = proxies_1.DefineProxies(streamEmitter, esHelper);
let AuthInstance = new authentication_1.Authentication(Config.SERVER_CONFIG.PORT);
app.use(bodyParser.json());
app.use(AuthInstance.allowCrossDomain);
app.use('/api', Router);
app.get('/', (req, res) => {
    res.sendFile(path.resolve('index.html'));
});
io.on('connection', (socket) => {
    console.log('a user connected');
    let formChangeSubscription = streamEmitter.listen('FormChange', () => {
        console.log('Buzzword field added');
        socket.emit('FormChange', null);
    });
    let explosionSubscription = streamEmitter.listen('Explosion', () => {
        console.log('Explosion Emitted');
        socket.emit('Explosion', null);
    });
    let topicSubscription = streamEmitter.listen('Topic', (topic) => {
        socket.emit('Topic', topic);
    });
    let buzzWordSubscription = streamEmitter.listen('Buzzword', (buzzword) => {
        socket.emit('Buzzword', buzzword);
    });
    socket.on('disconnect', () => {
        console.log('user disconnected');
        formChangeSubscription.dispose();
        explosionSubscription.dispose();
        topicSubscription.dispose();
        buzzWordSubscription.dispose();
    });
});
http.listen(Config.SERVER_CONFIG.PORT, () => {
    console.log('listening on *:3000');
});
//# sourceMappingURL=server.js.map