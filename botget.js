console.log("The bot is starting....");

var config = require('../configs/config');
var Twit = require('twit');
var T = new Twit(config);

var params = { 
	q: 'prime minister modi', 
	count: 5 
}

T.get('search/tweets',params,gotData);

function gotData(err, data, response) {
	var tweets = data.statuses;
	for (var i = 0; i < tweets.length; i++) {
		console.log("\n"+tweets[i].text);
	}
}

var getJSON = require('get-json')
 
getJSON('http://api.icndb.com/jokes/random', function(error, response){
 	console.log(response.value.joke);
});