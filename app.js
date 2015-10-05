
var tweeter = require('./DataMining/TwitterMiner'),
    //priceScraper = require('./DataMining/PriceScraper').checkPage,
    normalize = require('./Helpers/Equations').sigmoid,
    twitter = require('ntwitter'),
    express = require('express'),
    app = express(),
    http = require( "http" ).createServer( app ),
    io = require( "socket.io" )( http ),
    exphbs  = require('express-handlebars');

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use('/public/styles', express.static(__dirname + '/content/styles'));
app.use('/public/js', express.static(__dirname + '/content/scripts'));
app.use('/public/img', express.static(__dirname + '/content/images'));


 


//routs
app.get('/', function (req, res) { 
    res.render('home', {hashtags: "#hey, #there"});
});
 
//open sockets
io.on('connection', function (socket) {
    socket.emit('news', { sentiment: '', text: "begin" });
    socket.on('successfully-connected', function (data) {
        console.log(data);
    });
});

//stream Tweets
tweeter.stream(function(o){
    io.emit('news', o);
});
 
//priceScraper();
//setInterval(priceScraper, 1000);
 


http.listen(8000, "127.0.0.1", null, function(){
    console.log("Listening on 127.0.0.1/8000");
});