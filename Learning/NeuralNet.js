/*
var brain = require('brain');


var net = new brain.NeuralNetwork({
    hiddenLayers: [3, 4, 2],
    learningRate: 0.6  
});
 
var training = [
    {'score' : 0.4780, 'sentiment':.5, 'text':'#finance #investment #forex Insider Selling: NYSE #Stocks Sold Today'},
    {'score' : 0.4780, 'sentiment':.5, 'text':'ABMD ABIOMED, Inc. Yield http://t.co/7xtOhCZ1a0 $ABMD $HZNP $JNJ $PCLN #ABMD #stockmarket #invest'},
    {'score' : 0.0911, 'sentiment':.3, 'text':'Some investors overly fixated on falling Chinese stock market  #Markets #GlobalMarkets #Stocks {#Chin…'},
    {'score' : 0.4780, 'sentiment':.5, 'text':'A brief guide to fasten up your trades using one-click #trading in MT4 [link removed] #learntotrade #forex #stocks'},
   {'score' : 0.4780, 'sentiment':.7, 'text':'#IndiaBombay #stocks: #Merger #Acquisition: Albright & Wilson Chemicals India : 2015 profits hearty. …'},
    {'score' : 0.4780, 'sentiment':.5, 'text':'The first stock exchange can be traced back to Antwerp, Belgium in 1460. #finance #stocks'},
    {'score' : 0.0907, 'sentiment':.5, 'text':'$WMT received a new alert. See why at http://t.co/nZwqReM0tj #stocks #markets #daytrading 2'},
    {'score' : 0.0908, 'sentiment':.4, 'text':' SHORT Seller Alert $ES - EVERSOURCE ENERGY #ShortSeller #Stocks ~ via #AlertTrade'},
    {'score' : 0.9153, 'sentiment':1, 'text':'$MPO nailed another one! 3 buys today, 3 wins! 100% winning rate again! Killing it! #Profit #ChatRoom #LiveTrading, #Stocks …'},
    {'score' : 0.9149, 'sentiment':1, 'text':'RT byHeatherLong: Yes, there is some GOOD news this week in #stocks: The Nasdaq is now back in posi… [link removed]'},
    {'score' : 0.4780, 'sentiment':.7, 'text':'ABX Barrick Gold Corp. Quotes http://t.co/Nrd2mDM71g $ABX $MYEC $XLF $HYG #ABX #invest #invest'},
    {'score' : 0.8782, 'sentiment':.5, 'text':'Are you ready to make money stocktrading in2015? [link removed] join SuperTrades chatroom! $NVEE $BDR $FSI {#stocks…'},
    {'score' : 0.4780, 'sentiment':.4, 'text':'$FNMA is on the move, rumors are swirling & the jello is jingling. #Stocks'},
    {'score' : 0.4780, 'sentiment':.8, 'text':'AA Alcoa, Inc. News http://t.co/EXWS7k9a4s $AA $PYPL $WTW $SH #AA #invest #financeAAP Advance Auto Parts Inc. E.P.S.…'},
    {'score' : 0.4780, 'sentiment':.5, 'text':'After many request, we now offer individual #trading mentor sessions! http://t.co/nok62X0JWX #stocks #money #news'},
    {'score' : 0.4780, 'sentiment':.4, 'text':'#finance #investment #forex Insider Selling: NYSE #Stocks Sold Today http://t.co/3y3TOZoSsr http://t.co/cdGfqJo8kL'},
    {'score' : 0.8785, 'sentiment':1, 'text':'US stocks surge for 2nd straight day; S&P 500 up 2.43%: http://t.co/BbGvED7naL #StockMarket #Economy #DowJones #NASDAQ'},
    {'score' : 0.4780, 'sentiment':.6, 'text':'The stock market roller coaster is not being felt by most Americans for one simple reason #StockMarket #Americans' },
    {'score' : 0.4780, 'sentiment':.8, 'text':'Graphene Technologies are enhancing 3D Printing techniques.#graphene #invest #science http://t.co/cTwu17yc8F'},
    {'score' : 0.4780, 'sentiment':.3, 'text':'VIX-slamming just before Fischer, will it be another head-fake, or a sustained short-buster? #stockmarket'},
    {'score' : 0.9138, 'sentiment':.2, 'text':'Annuity Sellers Love Stock Market Turmoil http://t.co/rQ7QkLfLSi via @rwohlner #investing #stockmarket'},
    {'score' : 0.4780, 'sentiment':.5, 'text':'Nasty #XXX... #adult #free #important #interracial #invest #porn #tips #video {#wisely'}
];
 


var trainingInput = [];
 
for(var i = 0; i < training.length; i++){
    var sent = sentiment(training[i].text);
   
    trainingInput[i] = {
      'input': [
        sent.score,
        sent.comparative,
        sent.tokens.length
      ],
      'output' : {sentiment: training[i].sentiment}
    };
}
 
net.train(trainingInput);

exports.net = net;
*/