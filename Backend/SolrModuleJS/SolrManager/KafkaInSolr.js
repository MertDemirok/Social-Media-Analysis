var SolrNode = require('solr-node');
var kafka = require('kafka-node');
var express = require('express');
const http = require("http");

const port = process.env.PORT || 5028;
var app = express();
const server = http.createServer(app);

var client_Solr = new SolrNode({
   host: 'localhost',
   port: '8983',
   core: 'TwitterData_all',
   protocol: 'http'
});

var Consumer = kafka.Consumer;
var client_Kafka = new kafka.Client();
var topics = [];

var topic_List = require('../../TopicList.json');
topic_List.Topics.forEach(function (params, i) {
   topics.push({ topic: params, offset: 0 })

});


var consumer = new Consumer(client_Kafka, topics, { autoCommit: false });

consumer.on('message', function (message) {

   var data = {
      topic: message.topic,
      message: message.value
   };

   client_Solr.update(data, function (err, result) {
      if (err) {
         console.log(err);
         return;
      }
      console.log("Data is pushing")
      console.log('Response:', result.responseHeader);
   });

});
consumer.on('error', function (err) {
   console.log('Error:', err);
})
consumer.on('offsetOutOfRange', function (err) {
   console.log('offsetOutOfRange:', err);
})


server.listen(port, {
   log: false,
   agent: false,
   origins: '*:*',
   transports: ['websocket', 'htmlfile', 'xhr-polling', 'jsonp-polling', 'polling']
}, () => console.log(`Listening on Socket port ${port}`));


