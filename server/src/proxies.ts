declare let require: any;

export function DefineProxies (emitter) {
  let router = require('express').Router();
  
  router.get('/', (req, res) => {
    return res.status(200).send({message: 'Test'});
  });
  
  router.post('/topic', (req, res) => {
    let topic = req.body.topic;
    console.log(topic);
    if (!topic) {
      return res.status(400).send(`${new Date()} Missing topic field`);
    }
    
    // DO SOMETHING...
    let body:any = {
      text: topic,
      username: 'Patrick',
      sentiment: 1
    };
    emitter.notifyTopic(body);
    
    return res.status(200).send(`${new Date()} Topic sent`);
  });
  
  router.post('/buzzword', (req, res) => {
    let topic = req.body.buzzword;
    if (!topic) {
      return res.status(400).send(`${new Date()} Missing buzzword field`);
    }
    
    // DO SOMETHING...
    
    return res.status(200).send(`${new Date()} Topic sent`);
  });
  
  router.get('/activate-buzzword', (req, res) => {
    emitter.notifyFormChange();
    return res.status(200).send(`${new Date()} Updating Form`);
  });
  
  router.get('/activate-explosion', (req, res) => {
    emitter.notifyExplosion();
    return res.status(200).send(`${new Date()} Flagging Explosion`);
  });
  
  return router;
}
