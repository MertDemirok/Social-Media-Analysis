//a topic is where data is pulled from by a consumer
var express = require('express');
const http = require("http");
const socketIo = require("socket.io");
var kafka = require('kafka-node');
const port = process.env.PORT || 5002;
var publishData =[];

var app = express();
const server = http.createServer(app);
const io = socketIo(server);


io.setMaxListeners(1000);
io.on("connection", socket => {
      console.log("New client connected");
      
      socket.on("disconnect", () => {
        return console.log("Client disconnected");
      });
    });

    var Consumer = kafka.Consumer;
    var client = new kafka.Client();
    var topics  = [{ topic: 'ertugrul', offset: 0 },{ topic: 'bbc', offset: 0 },{ topic: 'teknosa', offset: 0 }]
    var consumer = new Consumer(client, topics, { autoCommit: false });
    
    consumer.on('message', function (message) {
        
         console.log(message);
        //Spark a gidicek data JSON.stringify({message})
        postToSocket(io,'News',JSON.stringify(message))
    });
    consumer.on('error', function (err) {
        console.log('Error:',err);
    })
    consumer.on('offsetOutOfRange', function (err) {
        console.log('offsetOutOfRange:',err);
    })

321
    function postToSocket(io,event,message){
      try {
       
        io.sockets.emit(event, JSON.stringify(message));
      } catch (error) {
        console.error(`Error: ${error.code}`);
      }
    };  


  server.listen(port,{
    log: false,
    agent: false,
    origins: '*:*',
    transports: ['websocket', 'htmlfile', 'xhr-polling', 'jsonp-polling', 'polling']
},() => console.log(`Listening on port ${port}`));