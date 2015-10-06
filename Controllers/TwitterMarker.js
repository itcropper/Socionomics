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
    
    Marker.find({ $query : {
                    "count" : { 
                        $exists : true 
                    }
                },
                $orderby: { 
                    time : 1 
                } 
            }, 
        function(err, res){
            if(!err){
                console.log(res);    
                cb(res); 
            }else{
                console.log("ERROR", err);
            }
        }
    );
    
}