
exports.sigmoid = function(x){
    try {
        x = parseFloat(x);
        if(typeof(x) === 'number'){
            return 1 / (1 + Math.pow(Math.E, -.5 * x));
        }else{
            throw "x is not a valid number. Helpers/Equations.sigmoid";
        }
    } catch(e){
        if(e){
            throw e;
        }else{
            throw "x is not a valid number. Helpers/Equations.sigmoid";
        }
    }
};