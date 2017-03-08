console.log("The bot is starting....");

var config = require('../configs/config');
var Twit = require('twit');
var T = new Twit(config);
var getJSON = require('get-json')


//Setting up a user stream
var stream = T.stream('user');

//Anytime someone follows me
stream.on('follow',followed);

function followed(eventMsg) {
	var name = eventMsg.source.name;
	var screenName = eventMsg.source.screen_name;
	console.log(screenName + " followed you");
	tweetIt('@' + screenName + ' Thanks for following TWATTER BOT you TWAT! ');
}



function tweetIt(msg) {

	var tweet = {
				status: msg
		}
	T.post('statuses/update', tweet, gotData);
	function gotData(err, data, response) {
		if(err){
				console.log("something went wrong..");
				console.log(err);
		}
		else{
				console.log("tweeted!");
		}
	}
}



tweetRandomJoke();
setInterval(tweetRandomJoke,1000*60);//tweets every 60 seconds

//tweeting takes place in this function
function tweetRandomJoke() {
	//grabs random joke json file	
	getJSON('http://api.icndb.com/jokes/random', gotJoke);
	function gotJoke(error, response) {
		if(error)	{
			console.log("something went wrong..");
		}
		else{
			//stores random joke in mystatus 
			var mystatus =response.value.joke
			console.log(mystatus);

			//posts mystatus as a tweet
			tweetIt(mystatus);
		}

	}
}
