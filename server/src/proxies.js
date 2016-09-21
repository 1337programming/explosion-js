"use strict";
function DefineProxies(emitter, esHelper, firebaseWriter) {
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
            var label = req.body.name;
            var user = req.body.user;
            esHelper.createEsObject('survey', label, answer, req.headers);
            var body = {
                text: answer,
                name: label,
                username: user,
                sentiment: 1
            };
            emitter.notifyTopic(body);
            res.send("OK");
        }
        else {
            res.statusCode = 500;
            res.send("Error. No Request data?");
        }
    });
    router.post('/add-question', function (req, res) {
        if (req.body) {
            console.log(JSON.stringify(req.body));
            res.statusCode = 200;
            var question = req.body.question;
            if (req.body.request && req.body.request.intent) {
                question = req.body.request.intent.slots.actions.value;
                //String manipulation cleanup
                question = question.charAt(0).toUpperCase() + question.slice(1) + '?';
                console.log("question parsed from alexa", question);
            }
            var name_1 = req.body.name;
            firebaseWriter.addNewQuestions(question, name_1);
            var alexaResponse = {
                version: "1.00",
                response: {
                    outputSpeech: {
                        type: "PlainText",
                        text: "Hey architects, " + question + "?"
                    }
                },
                sessionAttributes: {}
            };
            res.send(JSON.stringify(alexaResponse));
        }
        else {
            res.statusCode = 500;
            res.send("Error. No Request data?");
        }
    });
    router.get('/restore-questions', function (req, res) {
        firebaseWriter.restoreDefaultQuestions();
        res.send("Questions Restored.");
    });
    router.post('/start-fireworks', function (req, res) {
        firebaseWriter.triggerFireworks();
        var alexaResponse = {
            version: "1.00",
            response: {
                outputSpeech: {
                    type: "PlainText",
                    text: "Roger that. Ending with a bang!"
                }
            },
            sessionAttributes: {}
        };
        res.statusCode = 200;
        res.send(JSON.stringify(alexaResponse));
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
