var SolrNode = require('solr-node');
var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');

const portSearch = 5021;
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ origin: true, credentials: true }));


var client_Solr = new SolrNode({
   host: 'localhost',
   port: '8983',
   core: 'TwitterData_all',
   protocol: 'http'
});

app.get('/api/datasearch', function (req, res) {

   var searchMessage = req.query.search;
   var searchTopic = req.query.topic


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

           /**if (result.response.numFound > 1) {
               var objQuerytest = { message: element.message }
               client_Solr.delete(objQuerytest, function (err, result) {
                  if (err) {
                     console.log(err);
                     return;
                  }
                  console.log('Response:', result.responseHeader);
               });
            }
 */ 
            SearchResultList[index] = {
               topic: element.topic,
               text: element.message,
            };

         }
         res.json(SearchResultList);
      } else {
         res.json([{ "result": "NotFound" }]);
      }
   });
})

app.listen(portSearch, 'producer.api', function () {
   console.log('Solr Search Request ready at ' + portSearch)
});




