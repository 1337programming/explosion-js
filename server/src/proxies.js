"use strict";
function DefineProxies(emitter) {
    var router = require('express').Router();
    router.get('/', function (req, res) {
        return res.status(200).send({ message: 'Test' });
    });
    router.post('/topic', function (req, res) {
        var topic = req.body.topic;
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
    router.post('/buzzword', function (req, res) {
        var topic = req.body.buzzword;
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
