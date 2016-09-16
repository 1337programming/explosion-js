"use strict";
function DefineProxies(emitter, esHelper) {
    var router = require('express').Router();
    router.get('/', function (req, res) {
        return res.status(200).send({ message: 'Test' });
    });
    router.post('/topic', function (req, res) {
        var topic = req.body.input;
        console.log(topic);
        if (!topic) {
            return res.status(400).send(new Date() + " Missing topic field");
        }
        // DO SOMETHING...
        var body = {
            text: topic,
            username: 'Patrick',
            sentiment: 1
        };
        emitter.notifyTopic(body);
        return res.status(200).send(new Date() + " Topic sent");
    });
    router.post('/answer', function (req, res) {
        if (req.body) {
            console.log(req.body);
            res.statusCode = 200;
            var answer = req.body.input;
            var type = req.body.name;
            esHelper.createEsObject('survey', answer);
            var body = {
                text: answer,
                name: name,
                username: 'Patrick',
                sentiment: 1
            };
            emitter.notifyTopic(body);
            res.send("OK");
        }
        else {
            res.statusCode = 500;
            res.send("Error. No Request data?");
        }
        // let topic = req.body.input;
        // if (!topic) {
        //   return res.status(400).send(`${new Date()} Missing buzzword field`);
        // }
        // DO SOMETHING...
        // return res.status(200).send(`${new Date()} Topic sent`);
    });
    router.post('/buzzword', function (req, res) {
        var topic = req.body.input;
        if (!topic) {
            return res.status(400).send(new Date() + " Missing buzzword field");
        }
        // DO SOMETHING...
        return res.status(200).send(new Date() + " Topic sent");
    });
    router.get('/activate-buzzword', function (req, res) {
        emitter.notifyFormChange();
        return res.status(200).send(new Date() + " Updating Form");
    });
    router.get('/activate-explosion', function (req, res) {
        emitter.notifyExplosion();
        return res.status(200).send(new Date() + " Flagging Explosion");
    });
    return router;
}
exports.DefineProxies = DefineProxies;
