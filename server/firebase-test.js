var firebase = require("firebase");
firebase.initializeApp({
  serviceAccount: "TAWorkshop-26ac142847c2.json",
  databaseURL: "https://taworkshop-32e79.firebaseio.com"
});

console.log("firebase initialized");

var questionRef = firebase.database().ref('survey-questions');
// console.log(questionRef);

var executed = false;

questionRef.on('value', function(data) {
      var surveyQuestions = data.val();
      console.log(surveyQuestions);

      if (!executed) {
        var newQuestion = {"description": "des", "name": "three"};
        surveyQuestions.questions.push(newQuestion);
        questionRef.set(surveyQuestions);
        executed = true;
      }
      
});

// var newNodeRef = firebase.database().ref('test');
// newNodeRef.set({ "first": "Jack", "last": "Sparrow" }, function(data){
//     console.log('update complete');
// });

// firebase.database().ref('survey-questions/questions/1/description').set(
//     'What buzzwords do you hear that are just plain overused?', function(data){
//     console.log('update complete');
//     });