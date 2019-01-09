@echo OFF


start cmd cd C:\Personal\Project\Social-Media-Analysis\Backend\KafkaModuleJS /k call npm install

cd ../../..
cd C:\Personal\Project\Social-Media-Analysis\Backend\SparkModuleJS /k call npm install

cd ../../..
cd C:\Personal\Project\Social-Media-Analysis\Backend\SolrModuleJS /k call npm install

cd ../../..
cd C:\Personal\Project\Social-Media-Analysis\Frontend /k call npm install