declare let require: any;

export function DefineProxies(emitter, esHelper, firebaseWriter) {
  let router = require('express').Router();

  router.get('/', (req, res) => {
    return res.status(200).send({ message: 'Test' });
  });

  router.post('/topic', (req, res) => {
    let topic = req.body.input;
    console.log(topic);
    if (!topic) {
      return res.status(400).send(`${new Date()} Missing topic field`);
    }

    // DO SOMETHING...

    let body: any = {
      text: topic,
      username: 'Patrick',
      sentiment: 1
    };
    emitter.notifyTopic(body);

    return res.status(200).send(`${new Date()} Topic sent`);
  });

  router.post('/answer', (req, res) => {
    if (req.body) {
      console.log(req.body);
      res.statusCode = 200;
      let answer = req.body.input;
      let label = req.body.name;
      let user = req.body.user;
      esHelper.createEsObject('survey', label, answer, req.headers);

      let body: any = {
        text: answer,
        name: label,
        username: user,
        sentiment: 1
      };
      emitter.notifyTopic(body);

      res.send("OK");
    } else {
      res.statusCode = 500;
      res.send("Error. No Request data?");
    }
  });

  router.post('/add-question', (req, res) => {
    if (req.body) {
      console.log(req.body);
      res.statusCode = 200;
      let question = req.body.question;
      let name = req.body.name;
      
      firebaseWriter.addNewQuestions(question, name);

      res.send("OK");
    } else {
      res.statusCode = 500;
      res.send("Error. No Request data?");
    }
  });

  router.post('/buzzword', (req, res) => {
    let topic = req.body.input;
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


