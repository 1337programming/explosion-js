declare let require: any;

import {Authentication} from './src/authentication';
import {DefineProxies} from './src/proxies';
import {StreamEmitter} from './src/stream-emitter';

let express = require('express');
let app = express();
let http = require('http').Server(app);
let io = require('socket.io')(http);
let path = require('path');
let bodyParser = require('body-parser');

let Config = require(path.resolve('../env.json'));

// Emitter used and shared across the server
let streamEmitter = new StreamEmitter();

let Router = DefineProxies(streamEmitter);
let AuthInstance = new Authentication(Config.SERVER_CONFIG.PORT);
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

