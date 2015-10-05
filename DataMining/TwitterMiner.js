var twitter = require('ntwitter'),
    tweetFeeds = require('./TwitterFeeds'),
    sentiment = require('sentiment'),
    normalize = require('../Helpers/Equations').sigmoid;

var twit = new twitter({
    consumer_key: process.env.consumer_key,
    consumer_secret: process.env.consumer_secret,
    access_token_key: process.env.access_token_key,
    access_token_secret: process.env.access_token_secret
});
 
var lastTenThousandScores = [];

var tweetsInLastMinute = 0,
    callBackFunction = function(){};

var getNumberOfTweets = function(){
    var tweets = tweetsInLastMinute;
    tweetsInLastMinute = 0;
    console.log(callBackFunction);
    callBackFunction({tweetsPerMinute : tweets});
}

var perMinuteInterval = setInterval(getNumberOfTweets, 1000 * 20);

exports.stream = function(callback){
    if(typeof(callback) !== undefined){
        callBackFunction = callback;
    }
    
    twit.stream('statuses/filter', {
        'track': tweetFeeds.feeds
    },
    function(stream) {
        //console.log('hey what the 1!');
        stream.on('data', function (data, err) {
            //console.log('hey what the duece!');
            //console.log(data, err);
            tweetsInLastMinute += 1;
        }); 
    });
}