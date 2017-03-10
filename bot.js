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
	tweetIt("@" + screenName + " Thanks for following TWATTER BOT you TWAT! ");
}

//Anytime someone mentions me in a tweet
stream.on("tweet",mentioned);
function mentioned(eventMsg) {
	var replyto = eventMsg.in_reply_to_screen_name;
	var text = eventMsg.text;
	var from = eventMsg.user.screen_name;

	console.log(replyto + " " + from);

	if(replyto === "twatterbotnew") {
		tweetIt("@" + from + " Thanks for the mention! you TWAT! since my creator is dumb I can only reply with this fixed message");
	}

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
setInterval(tweetRandomJoke,1000*60*60);//tweets every 1 hour

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
