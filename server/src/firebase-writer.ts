declare let require: any;

// let elasticsearch = require('elasticsearch');
let firebase = require("firebase");

export class FirebaseWriter {

    private questionRef: any;
    private surveyQuestions: any;

    constructor() {
        firebase.initializeApp({
            serviceAccount: "TAWorkshop-26ac142847c2.json",
            databaseURL: "https://taworkshop-32e79.firebaseio.com"
        });
        this.questionRef = firebase.database().ref('survey-questions');

        // this.questionRef.on('value', function (data) {
        //     this.surveyQuestions = data.val();
        //     
        // });

        this.questionRef.on('value', (data) => {
            this.surveyQuestions = data.val();
            console.log(this.surveyQuestions);
        });
    }

    private addNewQuestions(question: string, name: string) {
        if (!name) {
            let questionLength = this.surveyQuestions.questions.length;
            name = "question" + questionLength;
        }
        //disable the existing questions
        for (let i in this.surveyQuestions.questions) {
            this.surveyQuestions.questions[i]['disabled'] = true;
        }

        let newQuestion = { "description": question, "name": name };
        this.surveyQuestions.questions.push(newQuestion);

        this.questionRef.set(this.surveyQuestions);
        console.log("question added: ", question);
    }

    private restoreDefaultQuestions() {
        this.surveyQuestions = {
            "fireworks": false,
            "questions": [
                {
                    "name": "question0",
                    "description": "What is your favorite kind of pizza?",
                    "hidden": false
                }
            ]
        };
        this.questionRef.set(this.surveyQuestions);
        console.log("questions restored.");

    }

    private triggerFireworks() {
        let fireworksRef = firebase.database().ref('survey-questions/fireworks');
        fireworksRef.set(true);
        // fireworksRef.set(false);
        setTimeout(function() { fireworksRef.set(false); }, 2000);
    }
}





