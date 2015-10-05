var socket = io();
socket.emit('successfully-connected', null);
socket.on('news', function(msg){
    //console.log(msg);
    if(msg.tweetsPerMinute){
        $('#frequency').text(msg.tweetsPerMinute);  
    }
});