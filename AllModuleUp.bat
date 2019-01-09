@echo OFF


cd C:\Personal\Project\Social-Media-Analysis\Backend\KafkaModuleJS\KafkaManager 
start cmd /k call node ProducerKF.js 

cd C:\Personal\Project\Social-Media-Analysis\Backend\KafkaModuleJS\KafkaManager 
start cmd /k call node ConsumerKF.js

cd C:\Personal\Project\Social-Media-Analysis\Backend\SparkModuleJS
start cmd /k call node app.js

cd C:\Personal\Project\Social-Media-Analysis\Backend\SolrModuleJS\SolrManager
start cmd /k call node KafkaInSolr.js

cd C:\Personal\Project\Social-Media-Analysis\Backend\SolrModuleJS\SolrManager
start cmd /k call node SolrSearch.js

 cd C:\Personal\Project\Social-Media-Analysis\Frontend
start cmd /k call  npm start


echo All Project Started!




