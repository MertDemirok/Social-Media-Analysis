var Sentiment = require("sentiment");
var kafka = require('kafka-node');
var express = require('express');
const http = require("http");
const socketIo = require("socket.io");

const port = process.env.PORT || 5005;
var app = express();
const server = http.createServer(app);
const io = socketIo(server);


var dataScore = {
    "Very Negative": 0,
    "Negative": 0,
    "Normal": 0,
    "Good": 0,
    "Very Good": 0
};
var sentiment = new Sentiment();
var TweetResponse = []


io.setMaxListeners(1000);
io.on("connection", socket => {
    console.log("New client connected");
   
    socket.on("disconnect", () => {
        return console.log("Client disconnected");
    });
});

function postToSocket(io,event,message){
    try {
     
      io.sockets.emit(event, JSON.stringify(message));
    } catch (error) {
      console.error(`Error: ${error.code}`);
    }
  };  


async function twitterAnalysis(topicName) {

    var Consumer = kafka.Consumer;
    var client = new kafka.Client();
    var topics = [{ topic: topicName, offset: 0 }]
    var consumer = new Consumer(client, topics, { autoCommit: false });
    var analysisResult ='';


    consumer.on('message', function (message) {


        TweetResponse = [{
            topic: message.topic,
            text: message.value,
        }];

        var result = sentiment.analyze(TweetResponse[0].text);

        if (result.score < -4) {
           
            dataScore["Very Negative"] += 1;
        }
        else if (result.score >= -2 && result.score < 0) {
         
            dataScore["Negative"] += 1;
        }
        else if (result.score == 0) {
         
            dataScore["Normal"] += 1;
        }
        else if (result.score > 0 && result.score <= 3) {
            
            dataScore["Good"] += 1;
        }
        else {
        
            dataScore["Very Good"] += 1;
        }
     
    });

    analysisResult = {
        topic: topicName,
        score: dataScore,
    };


    console.log(analysisResult)
    postToSocket(io,'TwitterAnalysis',analysisResult)
    return analysisResult;
};


server.listen(port,{
    log: false,
    agent: false,
    origins: '*:*',
    transports: ['websocket', 'htmlfile', 'xhr-polling', 'jsonp-polling', 'polling']
},() => console.log(`Listening on Socket port ${port}`));

module.exports.twitterAnalysis = twitterAnalysis;
