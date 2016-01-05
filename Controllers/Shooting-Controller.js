var Shooting = require('../Models/shooting-model.js');
    
    
exports.save = function(count, cb){ 
    var shooting = new Shooting();
    
    
    shooting.count = count;
    shooting.time = new Date();
    
    shooting.save(function(err, savedMarker){
        if(err){ console.log(err); cb(err);}
    });
};

exports.getAll = function(cb){
    
    var ThreeMonthsAgo = new Date(new Date()- 1000 * 60 * 60 * 24 * 30 * 3);
    
    Shooting
        .find({$gt : {"time": ThreeMonthsAgo }})
        .sort({ "time" : 1 })
        .limit(3000)
        .exec(function(err, res){
            if(!err){ 
                cb(res); 
            }else{
                console.log("ERROR", err);
            }
        }
    );
    
}
