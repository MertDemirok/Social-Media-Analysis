
   
    var Sentiment = require("sentiment");
    var kafka = require('kafka-node');
    var sortedTwitterData = [];
    var sentiment = new Sentiment();
    var TwitterResult = 'text';
    
    
    async function twitterAnalysis() {
    var Consumer = kafka.Consumer;
    var client = new kafka.Client();
    var topics  = [{ topic: 'bbc', offset: 0 }]
    var consumer = new Consumer(client, topics, { autoCommit: false });
    
    consumer.on('message', function (message) {

         var TweetResponse =[{
            topic:message.topic,
            text:message.value,
            
        }];
        KafkaToSpark(TweetResponse);



   });

   function KafkaToSpark(topicDetail){
        
    var dataScore = {
        "Very Negative": 0, 
        "Negative": 0,
        "Normal": 0,
        "Good": 0, 
        "Very Good": 0};
    var sum = 0;

       console.log(topicDetail[0].text);
        
        //var sentiment = new Sentiment();
        var result = sentiment.analyze(topicDetail[0].text);
        console.dir(result);

        
        if (result.score< -4) {
            sortedTwitterData.unshift(topicDetail[0].text);
            dataScore["Very Negative"] += 1;
        }
        else if (result.score >= -2 && result.score < 0) {
            sortedTwitterData.splice(2, 0, topicDetail[0].text);
            dataScore["Negative"] += 1;
        }
        else if (result.score == 0) {
            sortedTwitterData.splice(3, 0, topicDetail[0].text);
            dataScore["Normal"] += 1;
        }
        else if (result.score > 0 && result.score <= 3) {
            sortedTwitterData.splice(4, 0, topicDetail[0].text);
            dataScore["Good"] += 1;
        }
        else {
            sortedTwitterData.push(topicDetail[0].text);
            dataScore["Very Good"] += 1;
        }

      console.log(result,'datascore:',dataScore);
        console.log('/n');

}
        TwitterResult='test';
        return TwitterResult ;

    
};

module.exports.twitterAnalysis = twitterAnalysis;



