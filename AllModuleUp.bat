@echo OFF


cd C:\Personal\Project\kafka-node-module\Backend\KafkaModuleJS\KafkaManager 
start cmd /k call node ProducerKF.js 

cd C:\Personal\Project\kafka-node-module\Backend\KafkaModuleJS\KafkaManager 
start cmd /k call node ConsumerKF.js

cd C:\Personal\Project\kafka-node-module\Backend\SparkModuleJS
start cmd /k call node app.js

cd C:\Personal\Project\kafka-node-module\Backend\SolrModuleJS\SolrManager
start cmd /k call node KafkaInSolr.js

cd C:\Personal\Project\kafka-node-module\Backend\SolrModuleJS\SolrManager
start cmd /k call node SolrSearch.js

 cd C:\Personal\Project\kafka-node-module\Frontend
start cmd /k call  npm start


echo All Project Started!




