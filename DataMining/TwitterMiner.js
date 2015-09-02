var twitter = require('ntwitter'),
    tweetFeeds = require('./TwitterFeeds'),
    sentiment = require('sentiment'),
    normalize = require('../Helpers/Equations').sigmoid;

var twit = new twitter({
    consumer_key: 'Ox7LQSFUtsuBozF0F4Xw',
    consumer_secret: 'tBXZyqftCiy5l5vP4B8RRMby4LZXQeaJii04b2YG28',
    access_token_key: '91292767-bkGphjrzChR2Bvt7mwNaJKjY2kysjwbEQbV7drE1w',
    access_token_secret: 'DjRcV7BGR4YdfkZ73iNFVvYDjYQencjug8AxEkohVY'
});
 
var lastTenThousandScores = [];

exports.stream = function(callback){
    twit.stream('statuses/filter', {
        'follow': tweetFeeds.feeds
    },
    function(stream) {
        stream.on('data', function (data, err) {

            var sent = {},
                learnedSentiment = 0,
                normalizedScore = 0.0,
                sumOfTenThousand = 0,
                lengthOfLastTenThousand = 0,
                lastThousandSum = 0,
                weight = 1;

            sent = sentiment(data.text);

            if(/\$[A-z]+\g/.exec(data.text)){
                sent.score *= 2;
            }
            
            
            //console.log(data);
            
//            console.log(sent.score, data.user.followers_count, data.user.favourites_count, data.retweet_count);
            
            weight *= (.5 + normalize(Math.log(data.user.followers_count + 1)));
            
            weight *= data.user.favourites_count > 0 ? Math.log(data.user.favourites_count + 1) : 1;
            
            weight *= data.retweet_count > 0 ? Math.log(data.retweet_count + 1) : 1
            
            

            //learnedSentiment = net.run([sent.score, sent.comparative, sent.tokens.length]);
            normalizedScore = normalize(sent.score * weight);

//            console.log(weight, normalizedScore);

            //console.log(sent.score, learnedSentiment, normalizedScore);


            lastTenThousandScores.push(normalizedScore);

            lengthOfLastTenThousand = lastTenThousandScores.length;

            if(lengthOfLastTenThousand > 10000){
                lastTenThousandScores.shift();  
            }

            lastThousandSum = lastTenThousandScores.map(function(a){sumOfTenThousand += a;});

            var output = {
                sentiment:  normalizedScore,
                text : data.text,
                user : data.user.screen_name,
                overall : sumOfTenThousand / lengthOfLastTenThousand//,
                //SPDelta: currentSPChange
            };
            
            callback(output);
        });
    });
}