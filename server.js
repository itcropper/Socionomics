
var tweeter = require('./DataMining/TwitterMiner'),
    //priceScraper = require('./DataMining/PriceScraper').checkPage,
    normalize = require('./Helpers/Equations').sigmoid,
    twitter = require('ntwitter'),
    hashtags = require('./DataMining/TwitterFeeds').feeds.join(" "),
    express = require('express'),
    app = express(),
    http = require( "http" ).createServer( app ),
    io = require( "socket.io" )( http ),
    mongoose = require('mongoose'),
    marker = require('./Controllers/TwitterMarker'),
    exphbs  = require('express-handlebars');

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use('/public/styles', express.static(__dirname + '/content/styles'));
app.use('/public/js', express.static(__dirname + '/content/scripts'));
app.use('/public/img', express.static(__dirname + '/content/images'));


var PORT = process.env.PORT || 8000;
var MONGOOSE_PORT =
  process.env.MONGOLAB_URI || 
  process.env.MONGOHQ_URL  || 
  'mongodb://localhost:27017;';

// CONFIG
mongoose.connect(MONGOOSE_PORT, function (err, res) {
  if (err) { 
    console.log ('ERROR connecting to: ' + MONGOOSE_PORT + '. ' + err);
  } else {
    console.log ('Succeeded connected to: ' + MONGOOSE_PORT);
  }
});


//routs
app.get('/', function (req, res) { 
    res.render('home', {hashtags: hashtags}); 
});

app.get('/data', function(req, res){
    marker.getAll(res.json.bind(res));  
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
 


http.listen(PORT, function(){
    console.log("Listening on 127.0.0.1/8000");
});