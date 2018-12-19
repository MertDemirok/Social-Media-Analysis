import React, { Component } from 'react'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import socketIOClient from "socket.io-client";
import axios from 'axios'

class Feeds  extends Component {

    state = {
      topicName:'',
      inputTitle:'',
      inputContent:'',
      response: false,
      endpoint: "http://localhost:5002",
      tweetbaseURL:'http://producer.api:5001',
      host:'producer.api',
      port:5001,
      newsItems: [],
      newsIndex:0,
      tweet : [{
        userName:'',
        userInfo:'',
        content:'',
        title:'',
        date:'',
        imageUrl:'',
        type:'',
        location:'',
      }],
      tweets:[]
    }
  

    handleChange = event =>{ 
      let change = {}
      change[event.target.name] = event.target.value
      this.setState(change)
    }
  
    addTweetsToKafka = () =>{
        var instance = axios.create({
            baseURL: this.state.tweetbaseURL,
            proxy: {
              host:this.state.host,
              port: this.state.port
            }
          });

          const url = "/api/getalltweet";
          instance.get(url,{
            params: {
                search: 'ntv'
            }}).then(res => {
            
              res.data.forEach(element => {
                
                this.setState({tweetResponse:{
                  userName:element.user.name,
                  content:element.text,
                  userInfo:element.user.description,
                  type:'Twitter',
                  date:element.created_at

                }
              });
              
              var list = this.state.tweets.concat(this.state.tweetResponse)
              this.setState({tweets:list});

              });
              console.log(this.state.tweets)
             
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
    

    addNewsList = data => {
  
    var dataInfo = JSON.parse(data);
    dataInfo = JSON.parse(dataInfo);
    var list = this.state.newsItems.concat(dataInfo);
   
    this.setState({newsItems:list});
    }
    
    componentDidMount() {
      const { endpoint } = this.state;
      const socket = socketIOClient(endpoint);
      socket.on("News",data => this.addNewsList(data));

     this.addTweetsToKafka();
    }
  
  render () {
    
     // const listItems =  this.state.newsItems.map(item =>(<CardtoFeed dataFeed={item.value} topicName={item.topic}/>) );
      const listItems = this.state.tweets.map(item =>(<CardtoTweetsFeed dataFeed={item}/>))
  return (
    <div>
       
        {
        listItems[0] === undefined ? 
            <Button style={{ width: 120}} variant="outlined" color="primary" >Loading ..</Button> 
        : listItems  
        }
         <Button style={{ width: 50}} variant="outlined" color="primary" >R</Button>
    </div>
    
      )
    }
  }
  

  class CardtoTweetsFeed extends Component {
 
    render() {
    
        const twitterDetail = this.props.dataFeed;
        const topicName =''
        const divStyle = {
          marginBottom: 10
          };

      return <div style={divStyle}> 
      <Card >
      <CardContent>
        <Typography color="textSecondary" gutterBottom>
           topic ismi gelicek {topicName}
        </Typography>
        <Typography variant="h5" component="h2">
        {twitterDetail.date}
        </Typography>
        <Typography  color="textSecondary">
        {twitterDetail.type}
        </Typography>
        <Typography  color="p">
        {twitterDetail.content}
        </Typography>
        <Typography color="textSecondary" gutterBottom>
        {twitterDetail.userName} - {twitterDetail.userInfo}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
    </div>
    }
  }

  class CardtoFeed extends Component {
 
    render() {
        const topicDetail = JSON.parse(this.props.dataFeed);
        const topicName = this.props.topicName
        const divStyle = {
          marginBottom: 10
          };

      return <div style={divStyle}> 
      <Card >
      <CardContent>
        <Typography color="textSecondary" gutterBottom>
            {topicName}  
        </Typography>
        <Typography variant="h5" component="h2">
        {topicDetail.title}
        </Typography>
        <Typography  color="textSecondary">
          Twitter
        </Typography>
        <Typography  color="p">
        {topicDetail.content}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
    </div>
    }
  }
  export default Feeds
