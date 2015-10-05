var twitter = require('ntwitter'),
    tweetFeeds = require('./TwitterFeeds'),
    sentiment = require('sentiment'),
    normalize = require('../Helpers/Equations').sigmoid,
    configVars = {};

try {
    configVars = require('../local-vars.js').tokens;
}catch(e){
    configVars = {
        consumer_key: process.env.consumer_key,
        consumer_secret: process.env.consumer_secret,
        access_token_key: process.env.access_token_key,
        access_token_secret: process.env.access_token_secret
    }
}

var twit = new twitter(configVars);
 
var lastTenThousandScores = [];

var tweetsInLastMinute = 0,
    callBackFunction = function(){};

var getNumberOfTweets = function(){
    var tweets = tweetsInLastMinute;
    tweetsInLastMinute = 0;
    callBackFunction({tweetsPerMinute : tweets});
}

var perMinuteInterval = setInterval(getNumberOfTweets, 1000 * 60);

exports.stream = function(callback){
    if(typeof(callback) !== undefined){
        callBackFunction = callback;
    }
    
    twit.stream('statuses/filter', {
        'track': tweetFeeds.feeds
    },
    function(stream) {
        stream.on('data', function (data, err) {
            tweetsInLastMinute += 1;
        }); 
    });
}