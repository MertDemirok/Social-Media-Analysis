var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var twitterAnalysisInstance = require("./SparkManager/twitterAnalysis");

const host = 'localhost';
const port = process.env.PORT || 5009;

var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ origin: true, credentials: true }));



app.get('/api/dataanalysis',function (req, res) {

    
   twitterAnalysisInstance.twitterAnalysis(req.query.topicname).then((result) =>{
       res.json(result)
   });    
})

app.listen(port, host, function () {
    console.log("Data Anaylsis started..")
});