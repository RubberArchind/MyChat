const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.get('/', function(req,res){
  res.render('index.ejs');
});

io.sockets.on('connection',function(socket){
  socket.on('username', function(username){
    socket.username = username;
    io.emit('is_online','🔵<i>' + socket.username + ' join the chat...</i>');
  });

  socket.on('disconnect',function(username){
    io.emit('is_online','🔴<i>' + socket.username + ' left the chat...</i>');
  });

  socket.on('chat_message',function(message){
    io.emit('chat_message','<strong>' + socket.username + '</strong>: ' + message);
  });
});

var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080;

const server = http.listen(port,function(){
  console.log('listening on *:3000');
});
