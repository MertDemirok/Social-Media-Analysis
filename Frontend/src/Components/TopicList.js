
import axios from 'axios'
import React from 'react';
import TopicButtons from './TopicButtons';



class TopicList extends React.Component {
    state = {
        value: 0,
        tweetbaseURL: 'http://producer.api:5001',
        host: 'producer.api',
        port: 5001,
        allTopic: [],
        topicIndex: 0,
        topicColor: '',
    };

    getAllTopics = () => {

        var instance = axios.create({
            baseURL: this.state.tweetbaseURL,
            proxy: {
                host: this.state.host,
                port: this.state.port
            }
        });

        const url = "/api/getalltopics";
        instance.get(url).then(res => {
            res.data.KafkaTopics.map(topic_data => {

                var newTopic = this.state.allTopic.slice();
                newTopic.push(topic_data)
                this.setState({ allTopic: newTopic })
            });

        }).catch(function (error) {
            if (error.response) {
                console.log(error.response.headers);
            }
            else if (error.request) {
                console.log(error.request);
            }
            else {
                console.log(error.message);
            };
            console.log(error.config);
        });
    }

    componentDidMount() {
        this.getAllTopics();

    }

    handleChange = (event, value) => {
        this.setState({ value });
    };

    getRandomColor = () => {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return (color)

    }


    render() {

        const listItems = this.state.allTopic.map(item => (<TopicButtons colortopic={this.getRandomColor()} data={item} key={this.state.topicIndex++} />));

        return (
            <div >
                {listItems} 
            </div>
        );
    }

}


export default TopicList;
