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
      console.log(JSON.stringify(req.body))
      res.statusCode = 200;
      let question = req.body.question;

      if (req.body.request && req.body.request.intent) {
        question = req.body.request.intent.slots.actions.value;

        //String manipulation cleanup
        question = question.charAt(0).toUpperCase() + question.slice(1) + '?';
        console.log("question parsed from alexa", question);
      }

      let name = req.body.name;

      firebaseWriter.addNewQuestions(question, name);

      let alexaResponse = {
        version: "1.00",
        response: {
          outputSpeech: {
            type: "PlainText",
            text: "Hey architects, " + question + "?"
          }
        },
        sessionAttributes: {}
      }

      res.send(JSON.stringify(alexaResponse));
    } else {
      res.statusCode = 500;
      res.send("Error. No Request data?");
    }
  });

  router.get('/restore-questions', (req, res) => {
    firebaseWriter.restoreDefaultQuestions();
    res.send("Questions Restored.");
  });

  router.post('/start-fireworks', (req, res) => {
    firebaseWriter.triggerFireworks();

    let alexaResponse = {
      version: "1.00",
      response: {
        outputSpeech: {
          type: "PlainText",
          text: "Roger that. Ending with a bang!"
        }
      },
      sessionAttributes: {}
    }
    res.statusCode = 200;
    res.send(JSON.stringify(alexaResponse));
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


