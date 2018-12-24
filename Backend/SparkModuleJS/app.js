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



//------------------------------------------------------------------

/*http.createServer(function (request, response) {
    console.log('request starting...');

    var filePath = '.' + request.url;
    if (filePath == './')
        filePath = './index.html';

    var extname = path.extname(filePath);
    var contentType = 'text/html';
    switch (extname) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.jpg':
            contentType = 'image/jpg';
            break;
        case '.wav':
            contentType = 'audio/wav';
            break;
    }

    fs.readFile(filePath, function(error, content) {
        if (error) {
            if(error.code == 'ENOENT'){
                fs.readFile('./404.html', function(error, content) {
                    response.writeHead(200, { 'Content-Type': contentType });
                    response.end(content, 'utf-8');
                });
            }
            else {
                response.writeHead(500);
                response.end('Sorry, check with the site admin for error: '+error.code+' ..\n');
                response.end();
            }
        }
        else {
            response.writeHead(200, { 'Content-Type': contentType });
            response.end(content, 'utf-8');
        }
    });

}).listen(port);
console.log('Server running at http://127.0.0.1:'+ port);*/