# Social Media Analysis

Social Media Real time analsis Application 

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

What things you need to install the software and how to install them

```
The Java Environment variables should be set. (jre, jdk)
Apache Kafka Server
Apache Solr Server
Nodejs Server

```

### Installing

A step by step series of examples that tell you how to get a development env running  


Server Side
```
1- Install jdk jre

2- Install 7-zip 
    https://www.7-zip.org/

3- Install Kafka current stable version
    https://kafka.apache.org/downloads
    a-Install Zookeeper current stable version 
        1- http://zookeeper.apache.org/releases.html#download
        2- You can download and unzip it anywhere but for the sake of this guide, i am assuming that zookeeper is extracted in C:\Tools\
        3-Copy and Rename “zoo_sample.cfg” to “zoo.cfg” in C:\Tools\zookeeper-3.4.9\conf
        4- Find & edit dataDir=/tmp/zookeeper to :\zookeeper-3.4.9\data using any text editor like notepad or notepad++. (change the zookeeper version as yours)
        5- Add entries in System Environment Variables.
            Add in System Variables ZOOKEEPER_HOME = C:\Tools\zookeeper-3.4.9
            Edit System Variable named “Path” and append this in the last ;%ZOOKEEPER_HOME%\bin;
        6- Open command prompt and type zkserver.
        note: zkserver will start the zookeeper on the defualt port which is 2181, you can change the default port in zoo.cfg file
        
    b - kafka_2.12-0.10.2.1.tgz Unzip it.
    c - Go to config folder in Apache Kafka and edit “server.properties” using any text editor.
    d- Find log.dirs and repelace after “=/tmp/kafka-logs” to “=C:\\Tools\\kafka_2.10–0.10.1.1\\kafka-logs” and listeners=PLAINTEXT://:9092 (change your version number).
    
    note: Leave other setting as is. If your Apache Zookeeper on different server then change the “zookeeper.connect” property.
    || By default Apache Kafka will run on port 9092 and Apache Zookeeper will run on port 2181.
    e- Running Apache Kafka

        1- Open command prompt and go to your Apache Kafka directory and run following command.
        2- .\bin\windows\kafka-server-start.bat .\config\server.properties
        Very good and your Apache Kafka is up and running on port 9092.
        Kafka Test
        
        1- Open a new command prompt and create a topic with name javainuse-topic, that has only one partition & one replica.

        2- C:\kafka_2.12-0.10.2.1>.\bin\windows\kafka-topics.bat --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic javainuse-topic
        
        3- Next Open a new command prompt and create a producer to send message to the above created javainuse-topic and send a message - 
        
        Hello World Javainuse to it-

        4- C:\kafka_2.12-0.10.2.1>.\bin\windows\kafka-console-producer.bat --broker-list localhost:9092 --topic javainuse-topic
        Hello World Javainuse
        5- Finally Open a new command prompt and start the consumer which listens to the topic javainuse-topic we just created above. We will get the message we had sent using the producer
        
        6- C:\kafka_2.12-0.10.2.1>.\bin\windows\kafka-console-consumer.bat --bootstrap-server localhost:9092 --topic javainuse-topic --from-beginning

4- solr download and Install
    a- Go to solr-7.6.0 folder in  your local path (example: C:\Tools\solr-7.6.0)
    b- Open command prompt  and go to C:\Tools\solr-7.6.0\bin 
    c- solr start
    d- Open http://localhost:8983/solr/#/ in browser
    e- Open command prompt  and go to C:\Tools\solr-7.6.0\bin 
    f- solr create TwitterData_all

5- Close all file and command prompt

```
Note: We will be automated to all install instruction for all User..


Client Side
```
1- Get Social-Media-Analysis project in  your local path 
2- Go to Social-Media-Analysis folder in  your local path 
3- Click AllServerRun.bat 
4- Click AllModuleUp.bat

```
Happy ending and Coding :) 


## Running the tests


### Break down into end to end tests

```

```

## Deployment

------

## Built With
For Web App
* [NODE.JS](https://nodejs.org/en/) - The web framework used
Other The web framework used
* [React.JS](https://nodejs.org/en/)
* [MaterialUI](https://nodejs.org/en/)
* [Socket.IO] (https://nodejs.org/en/)

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning
----

## Troubleshooting
------

## Authors

* **Mert Demirok** - [Mert Demirok](https://github.com/mertdemirok)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

