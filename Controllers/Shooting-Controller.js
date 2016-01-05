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
    
    Shooting
        .find({})
        .sort({ time : 1 })
        .limit(5000)
        .sort({time : -1})
        .exec(function(err, res){
            if(!err){ 
                cb(res); 
            }else{
                console.log("ERROR", err);
            }
        }
    );
    
}
