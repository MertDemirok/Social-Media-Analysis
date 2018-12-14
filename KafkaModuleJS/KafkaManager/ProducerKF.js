//a topic is where data (messages) gets published to by a producer

var express = require('express');
var kafka = require('kafka-node');
var app = express();
const port = 5001;
const _ = require('lodash');
var allTopics = [];
var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 


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

app.get('/',function(req,res){
    res.json({greeting:'Kafka Consumer'})
});

app.listen(port,function(){
    console.log('Kafka producer running at '+ port)
});


client.once('connect', function () {
    client.loadMetadataForTopics([], function (error, results) {
        if (error) {
            return console.error("All topic is error sate"+error);
        }
        allTopics = _.get(results, '1.metadata');
        console.log("All Topic is ready");
    });

});
//Create topic and send message to topic
/**{
   topic: 'topicName',
   messages: ['message body'], // multi messages should be a array, single message can be just a string or a KeyedMessage instance
   key: 'theKey', // only needed when using keyed partitioner (optional)
   partition: 0, // default 0 (optional)
   attributes: 2 // default: 0 used for compression (optional)
} */
/**{
	"topic":"posts",
	"message":{"text":"kafka json test !","type":"text","arry":["mert","demirok","6"]}
	
} */
app.post('/api/producer',function(req,res){
    var sentMessage = JSON.stringify(req.body.message);
    payloads = [
        {   topic: req.body.topic, 
            messages:sentMessage , 
            partition: 0 
        }
    ];
    producer.send(payloads, function (err, data) {
            res.json(data);
    });
    
})

app.get('/api/getalltopics',function(req,res){
    res.json(allTopics)
    });



