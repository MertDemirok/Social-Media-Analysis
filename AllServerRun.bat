@echo OFF

cd C:\kafka_2.11-2.1.0
start cmd /k call .\bin\windows\zookeeper-server-start.bat .\config\zookeeper.properties
start cmd /k call .\bin\windows\kafka-server-start.bat .\config\server.properties

cd C:\Tools\solr-7.6.0\bin
start cmd /k call solr start




 
 



