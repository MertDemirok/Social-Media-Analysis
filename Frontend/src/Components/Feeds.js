import React, { Component } from 'react'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import socketIOClient from "socket.io-client";
import axios from 'axios'
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';


class Feeds extends Component {

  state = {
    topicName: '',
    inputTitle: '',
    inputContent: '',
    response: false,
    endpoint: "http://localhost:5002",
    tweetbaseURL: 'http://producer.api:5001',
    host: 'producer.api',
    port: 5001,
    newsItems: [],
    newsIndex: 0,
    tweet: [{
      userName: '',
      userInfo: '',
      content: '',
      title: '',
      date: '',
      imageUrl: '',
      type: '',
      location: '',
    }],
    tweets: [],
    coreview: '',
  }


  addTweetsToKafka = (dataSearch) => {


    var instance = axios.create({
      baseURL: this.state.tweetbaseURL,
      proxy: {
        host: this.state.host,
        port: this.state.port
      }
    });
   
    const url = "/api/getalltweet";
    instance.get(url, {
      params: {
        search: dataSearch
      }
    }).then(res => {
      /** res.data.forEach(element => {
          
          this.setState({tweetResponse:{
            userName:element.user.name,
            content:element.text,
            type:'Twitter',
            date:element.created_at,

          }
        });
        
        var list = this.state.tweets.concat(this.state.tweetResponse)
        this.setState({tweets:list});   });*/
      console.log("Tweet Data: ", res);

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

    
    if (data !== "") {
    
      var dataInfo = JSON.parse(data);
      dataInfo = JSON.parse(dataInfo);
     
      var list = this.state.newsItems.concat(dataInfo);
      this.setState({ newsItems: list });

    }else{ 
      /** for (var i = this.state.newsItems.length; i > 0; i--) {
 
      this.state.newsItems.pop();
      
     } */   
     
    }

    const listItems = this.state.newsItems.map(item => (<CardtoFeed classes={item} key={this.state.newsIndex++} />));
    this.setState({ coreview: <div >{listItems}</div> });
   
  }

  componentDidMount() {

    //this.addTweetsToKafka("bbc")
    
    const { endpoint } = this.state;
    const socket = socketIOClient(endpoint);
    socket.on("News", data => this.addNewsList(data));
   
  }

  render() {

    return (
      <div >
        <Button style={{ width: 300 }} variant="contained" color="primary" type="submit" >Detail</Button>
        {this.state.coreview}
      </div>

    )
  }
}


const styles = {
  card: {
    minWidth: 500,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 20,
  },
};


function CardtoFeed(props) {
  const { classes } = props;
  const topicDetail = classes;
  return (
    <div>
      <br></br>
      <Card className={classes.card} >
        <CardContent>
          <Typography className={classes.title} color="textSecondary" gutterBottom>
            {topicDetail.topic}
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
          </Typography>
          <Typography component="p">
            {topicDetail.value}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>
    </div>
  )
}


CardtoFeed.propTypes = {
  classes: PropTypes.object.isRequired,
};

withStyles(styles)(CardtoFeed);
export default Feeds
