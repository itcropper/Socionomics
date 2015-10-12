var twitter = require('ntwitter'),
    tweetFeeds = require('./TwitterFeeds'),
    markerController = require('../Controllers/TwitterMarker'),
    configVars = {},
    _INTERVAL_TIME = 1000 * 60 * 20; //20 minutes

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
var lastTweet = {};
var tweetCount = 0,
    timeSinceLastPush = new Date();
    callBackFunction = function(){};

exports.stream = function(){
    
    twit.stream('statuses/filter', {
        'track': tweetFeeds.feeds
    },
    function(stream) {
        stream.on('data', function (data, err) {
            tweetCount += 1;
            lastTweet = data;
        }); 
    });
}

var pushTweetCountToDB = function(){
    var minutesFromLast = (new Date() - timeSinceLastPush)/1000/60,
        tweets = Math.round(tweetCount / minutesFromLast);
    
    timeSinceLastPush = new Date();
    tweetCount = 0;
    markerController.save(tweets, lastTweet.created_at); 
}

setInterval(function(){
    pushTweetCountToDB();
}, _INTERVAL_TIME); 