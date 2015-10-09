var Marker = require('../Models/TweetMarker.js');
    
    
exports.save = function(count, cb){ 
    var marker = new Marker();
    
    marker.time = new Date();
    marker.count = count;
    
    marker.save(function(err, savedMarker){
        if(err){ console.log(err); cb(err);}
    });
};

exports.getAll = function(cb){
    
    Marker
        .find({"count" : { $exists : true }})
        .sort({ time : 1 })
        .limit(10000)
        .exec(function(err, res){
            if(!err){ 
                cb(res); 
            }else{
                console.log("ERROR", err);
            }
        }
    );
    
}