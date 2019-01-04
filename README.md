# Social Media Analysis 

In using
*Apache Kafka
  *Apache zookeeper
*Apache spark
*Node.js
*React.js
*MaterialUI
*Socket.IO

-- How to run --

The Java Environment variables should be set.

Got to the Apache Kafka downloads page and download the Scala 2.12 

https://kafka.apache.org/downloads

http://zookeeper.apache.org/releases.html#download

kafka_2.12-0.10.2.1.tgz
Unzip it.

Open cmd prompt and start zookeeper-

C:\kafka_2.12-0.10.2.1>.\bin\windows\zookeeper-server-start.bat .\config\zookeeper.properties



Open a new command prompt and start the Apache Kafka-

C:\kafka_2.12-0.10.2.1>.\bin\windows\kafka-server-start.bat .\config\server.properties



Open a new command prompt and create a topic with name javainuse-topic, that has only one partition & one replica.

C:\kafka_2.12-0.10.2.1>.\bin\windows\kafka-topics.bat --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic javainuse-topic




Next Open a new command prompt and create a producer to send message to the above created javainuse-topic and send a message - Hello World Javainuse to it-

C:\kafka_2.12-0.10.2.1>.\bin\windows\kafka-console-producer.bat --broker-list localhost:9092 --topic javainuse-topic

Hello World Javainuse



Finally Open a new command prompt and start the consumer which listens to the topic javainuse-topic we just created above. We will get the message we had sent using the producer

C:\kafka_2.12-0.10.2.1>.\bin\windows\kafka-console-consumer.bat --bootstrap-server localhost:9092 --topic javainuse-topic --from-beginning

configration 

C:\kafka_2.11-2.1.0\config\server.properties

tickTime=2000
initLimit=10
syncLimit=5
dataDir=/usr/zookeeper/data
clientPort=2181
server.1=localhost:2888:3888


C:\kafka_2.11-2.1.0\config\server.properties

change

log.dirs=C:\\Tools\\kafka_2.11-2.1.0\\kafka-logs

listeners=PLAINTEXT://:9092


Note: Run RunKafka.bat For Windows

Troubleshooting

If you deleted all topic , need to new kafka cluster create  
1)Create the chroot in the Zookeeper with the following commands:

zkCli.sh -server localhost:2181

create /kafka1 []

2)For the kafka brokers config , modify zookeeper.connect and add chroot path : For eg.

In server.properties :

zookeeper.connect=localhost:2181/kafka1

3)Start Zookeeper

4)Start Kafka Server

5) Create a topic as below: bin/kafka-topic.sh --create -zookeeper localhost:2181/kafka1 --replication-factor 1 --partitions 1 --topic data

6)Confirm the created topic: bin/kafka-topics.sh --list --zookeeper localhost:2181/kafka1



solr download and Install and run bin/solr create TwitterD  solr directory

and

solr start