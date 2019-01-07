//a topic is where data (messages) gets published to by a producer
var express = require('express');
var kafka = require('kafka-node');
var cors = require('cors');
const _ = require('lodash');
var bodyParser = require('body-parser');
var Publisher = require("./Publisher");
var fs = require('fs');


var app = express();
const port = 5001;
var allTopics = [];
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ origin: true, credentials: true }));


var Producer = kafka.Producer,
    client = new kafka.Client(),
    producer = new Producer(client);


producer.on('ready', function () {
    console.log('Producer is ready');
});

producer.on('error', function (err) {
    console.log('Producer is in error state');
    console.log(err);
})
getAllTopicToKafka();

async function sendtoKafkaServer(topic, sentMessage) {

    payloads = [
        {
            topic: topic,
            messages: sentMessage,
            partition: 0
        }
    ];

    producer.send(payloads, function (err, data) {

        return data;
    });
}


async function getAllTopicToKafka(){

    client = new kafka.Client();

    client.once('connect', function () {
        client.loadMetadataForTopics([], function (error, results) {
            if (error) {
                return console.error("All topic is error sate" + error);
            }
            console.log("All Topic is publish");
            allTopics = _.get(results, '1.metadata');
         
        });
    
    });
}

app.post('/api/producer', function (req, res) {
 /**   var obj = {
    Topics: []
 };
    obj.Topics.push(req.body.topic) 
    var jsn = JSON.stringify(obj);
    console.log(jsn)
    fs.appendFile("../../TopicList.json", jsn, function(err) {
        if(err) {
            return console.log(err);
        }
    
        console.log("The file was saved!");
    }); */

    sendtoKafkaServer(req.body.topic, req.body.message).then((response) => {

        res.json({ Response: "Success", data: response });
    });
})

app.get('/api/getalltweet', function (req, res) {

    Publisher.pTwitter(req.query.search).then((tweets) => {

        console.log("Request Parameter: ", req.query.search)
        for (let index = 0; index < tweets.length; index++) {
            const element = tweets[index];
            sendtoKafkaServer(req.query.search, element.text).then(() => {
            });
        }
        console.log("Tweet in kafka Server and publish frontend")
        res.send(tweets)
    });
});





app.get('/api/getalltopics', function (req, res) {
 
    var data = [];

     getAllTopicToKafka().then(()=>{

        Object.keys(allTopics).forEach(function (key) {
 
            data.push(key);
            // console.log(allTopics[key]);
        });
        res.json({ KafkaTopics: data })
     });
    
});

app.listen(port, 'producer.api', function () {
    console.log('Kafka producer running at ' + port)
});