var path = require('path');
var request = require('request');

var config = require(path.resolve('env.json'));

var options = {
  url: config.API_ENDPOINT + '/nd/api/activate-buzzword',
  method: 'GET',
  json: true
};

request(options, function (error, response) {
  if (error) {
    console.log(error);
  } else {
    console.log(response.body);
  }
});
