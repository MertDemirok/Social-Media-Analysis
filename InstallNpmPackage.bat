@echo OFF


start cmd cd C:\Personal\Project\kafka-node-module\Backend\KafkaModuleJS /k call npm install npm-install-all -g

cd ../../..
cd C:\Personal\Project\kafka-node-module\Backend\SparkModuleJS /k call npm install npm-install-all -g

cd ../../..
cd C:\Personal\Project\kafka-node-module\Backend\SolrModuleJS /k call npm install npm-install-all -g

cd ../../..
cd C:\Personal\Project\kafka-node-module\Frontend /k call npm install npm-install-all -g