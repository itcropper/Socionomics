var Tweets      = require('../Controllers/TwitterMarker.js'),
    Shootings   = require('../Controllers/Shooting-Controller.js');
    
exports.getAll = function(cb){
    
   Shootings.getAll(function(shootingData){
       Tweets.getAll(function(tweetData){
        
           cb({"data": {
                 "shootings" : shootingData,
                 "tweets" : tweetData
                }
            });
       });
    });    
}