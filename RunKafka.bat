@echo OFF

MODE 50,20
color 02

cd C:\kafka_2.11-2.1.0
start cmd.exe /k call .\bin\windows\zookeeper-server-start.bat .\config\zookeeper.properties
start cmd.exe /k call .\bin\windows\kafka-server-start.bat .\config\server.properties

cd C:\Personal\Project\Kafka\KafkaModuleJS\KafkaManager
start cmd /k call node ProducerKF.js 

cd C:\Personal\Project\Kafka\DashboardModule\client
start cmd /k call  npm start

echo Kafka Started

 
 



