var request = require('request');

function askQuestion(question) {
    request.post(
        'http://54.153.122.78:8080/api/add-question',
        { json: { 'question': question } },
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log(body)
            }
        }
    );
}

askQuestion("This is my new question submitted via API");