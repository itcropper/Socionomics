var twitter = require('twitter'),
    tweetFeeds = require('./TwitterFeeds'),
    markerController = require('../Controllers/TwitterMarker'),
    configVars = {},
    _INTERVAL_TIME = 1000 * 60 * .1, //20 minutes
    lastTweet = {},
    tweetCount = 0,
    timeSinceLastPush = new Date(),
    //callBackFunction = function(){},
    twit = null;

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
twit = new twitter(configVars);

try{
    twit.stream('statuses/filter', {
        'track': "guncontrol"
    },
    function(stream) {
        stream.on('data', function (data, err) {
            tweetCount += 1;
            lastTweet = data;
        }); 
    });
}catch(e){
    console.log(e);
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
