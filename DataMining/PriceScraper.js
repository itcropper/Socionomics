// var request = require("request");
// var cheerio = require("cheerio"),
//     normalize = require('../Helpers/Equations').sigmoid;

// exports.checkPage = function() {
//     request({
//       uri: "https://www.google.com/finance?q=INDEXSP%3A.INX&ei=pYbgVYHPOcWyjAH4horgDg",
//     }, function(error, response, body) {
//         var $ = cheerio.load(body);
       
//         var newDelta = $('span.ch.bld span').last().text().replace('(', '').replace('%)');
               
//         if(newDelta){
//             currentSPChange = newDelta;
//         }
       
//     });
// }