var Marker = require('../models/TweetMarker');
    
    
exports.save = function(count, cb){ 
    var marker = new Marker();
    
    marker.time = new Date();
    marker.count = count;
    
    marker.save(function(err, savedMarker){
        if(err){ console.log(err); cb(err);}
    });
};

exports.getAll = function(cb){
    
    Marker.find({ 
                $query : {
                    "count" : { $exists : true }
                },
                $orderby: {  time : 1 }//from furthest to most recent 
            }, 
        function(err, res){
            if(!err){ 
                cb(res); 
            }else{
                console.log("ERROR", err);
            }
        }
    );
    
}