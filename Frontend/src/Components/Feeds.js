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
import TextField from '@material-ui/core/TextField';
import FaSearch from 'react-icons/lib/fa/search';
import SearchResult from './SearchResult';

class Feeds extends Component {

  state = {
    topicName: '',
    inputTitle: '',
    inputContent: '',
    response: false,
    endpoint: "http://localhost:5002",
    tweetbaseURL: 'http://producer.api:5001',
    baseURL: 'http://producer.api:5021',
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
    searchDataResult: [{
      text: '',
      topic: ''
    }],
    searchResultList: [],
    tweets: [],
    coreview: '',
    searchKeyword: '',
    searchCount:0,
    resultCount:0,
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
  
      this.setState({ topicName: dataInfo.topic })
      var list = this.state.newsItems.concat(dataInfo);
      this.setState({ newsItems: list });
      
  
      var listItems = this.state.newsItems.map(item => (<CardtoFeed classes={item} key={this.state.newsIndex++} />));
      listItems = listItems.reverse();
      this.setState({ coreview: <div >{listItems}</div> });

    } else {

      //this.setState({ newsIndex: 0 });
      //this.setState({ newsItems: [] });
     // this.setState({ coreview: '' });

      /** for (var i = this.state.newsItems.length; i > 0; i--) {
 
      this.state.newsItems.pop();
      
     } */

    }



  }

  dataSearch = () => {

      var instance = axios.create({
        baseURL: this.state.baseURL,
        proxy: {
          host: this.state.host,
          port: this.state.port
        }
      });
 //console.log("search:", this.state.searchKeyword, " topic:", this.state.topicName)     
      this.setState({ searchResultList: [] });
      this.setState({searchDataResult: {}});
      const url = "/api/datasearch";
      instance.get(url, {
        params: {
          search: this.state.searchKeyword,
          topic: this.state.topicName
        }
      }).then(res => {
        //console.log(res);
        if (res.data[0].result !== "NotFound") {
          res.data.forEach(element => {
            
            this.setState({
              searchDataResult: {
                text: element.text,
                topic: element.topic,
              }
            });
           
            this.setState({searchCount:this.state.searchCount++})
           var list = this.state.searchResultList.concat(this.state.searchDataResult)
           this.setState({ searchResultList: list });
          });

        // console.log("Keyword Result Data: ", this.state.searchResultList);
         // var listItems = this.state.searchResultList.map(item => ());
          //  this.setState({ coreview: <div >{listItems}</div> });
        } else {
          alert("Not Found")
        }
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

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });

  };

  handleSubmit = event => {
    event.preventDefault();
    this.dataSearch();
  }

  componentDidMount() {

    const { endpoint } = this.state;
    const socket = socketIOClient(endpoint);
    socket.on("News", data => this.addNewsList(data));

  }

  render() {
   
    return (
      <div >
         
        {!this.state.coreview ? <Button style={{ width: 300 }} variant="contained" color="primary" type="submit" >Detail</Button> :
           "Searching: "+this.state.searchKeyword}{<form onSubmit={this.handleSubmit} noValidate autoComplete="off">
         
            <TextField
              id="outlined-name"
              label={<FaSearch />}
              value={this.state.searchKeyword}
              onChange={this.handleChange('searchKeyword')}
              margin="normal"
              variant="outlined"
            />
          </form>
        }
      
       {this.state.searchResultList.map(item=> <Button style={{ width: 350 ,margin: 5 }} variant="outlined" color="primary"
                                                       key={this.state.resultCount++} >{item.text}</Button> )} 
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
