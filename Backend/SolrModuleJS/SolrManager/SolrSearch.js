var SolrNode = require('solr-node');
var kafka = require('kafka-node');
var express = require('express');
const http = require("http");
var cors = require('cors');
var bodyParser = require('body-parser');

const port = process.env.PORT || 5020;
const portSearch = 5021;
var app = express();
const server = http.createServer(app);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ origin: true, credentials: true }));


var client_Solr = new SolrNode({
   host: 'localhost',
   port: '8983',
   core: 'deneme',
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
/**consumer.on('message', function (message) {

         var data = {
            topic: message.topic, 
            message: message.value
        };
        
        client_Solr.update(data, function(err, result) {
           if (err) {
              console.log(err);
              return;
           }
           console.log('Response:', result.responseHeader);
        }); 
   

});
 */
 

app.get('/api/datasearch', function (req, res) {

   var searchMessage = req.query.search;
   var searchTopic =  req.query.topic


   var SearchResultList = [];
   console.log("searching :", searchMessage)

   var objQuery = client_Solr.query().q({ topic: searchTopic, message: searchMessage });
  
    client_Solr.search(objQuery, function (err, result) {
      if (err) {
         console.log("error", err);
         return err;
      }
      if (result.response.numFound > 0) {

         for (let index = 0; index < result.response.docs.length; index++) {
            const element = result.response.docs[index];
            SearchResultList[index] = {
               topic: element.topic,
               text: element.message,
            };
         }
         res.json(SearchResultList);
      }else{
         res.json([{"result":"NotFound"}]);
      }
      

   });

})



app.listen(portSearch, 'producer.api', function () {
   console.log('Solr Search Request ready at ' + portSearch)
});

server.listen(port, {
   log: false,
   agent: false,
   origins: '*:*',
   transports: ['websocket', 'htmlfile', 'xhr-polling', 'jsonp-polling', 'polling']
}, () => console.log(`Listening on Socket port ${port}`));









