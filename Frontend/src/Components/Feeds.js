import React, { Component } from 'react'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import socketIOClient from "socket.io-client";


class Feeds  extends Component {

    state = {
      resultOffset:'',
      topicName:'',
      inputTitle:'',
      inputContent:'',
      isDetailActive:true,
      response: false,
      endpoint: "http://localhost:5002",
      newsItems: [],
      newsIndex:0
    }
  

    handleChange = event =>{ 
      let change = {}
      change[event.target.name] = event.target.value
      this.setState(change)
    }
  
    addNewsList = data => {
    console.log(data);
    this.setState({newsIndex:this.state.newsIndex+1});
    var dataInfo = JSON.parse(data);
    dataInfo = JSON.parse(dataInfo);
  
    console.log(dataInfo);
    var list = this.state.newsItems.concat(dataInfo);
    this.setState({newsItems:list});
    }
    
    componentDidMount() {
      const { endpoint } = this.state;
      const socket = socketIOClient(endpoint);
      socket.on("News",data => this.addNewsList(data));
    }
  
  render () {
    const listItems = this.state.newsItems.map(item =>(<CardtoFeed dataFeed={item.value}/>) );
  console.log(typeof listItems[0]);
  return (
    <div>
        {listItems[0] === undefined ?'Loading ..' : listItems}
    </div>
    
      )
    }
  }




  class CardtoFeed extends Component {
    render() {
      const greeting = 'Welcome to React';
  
      return <Card >
      <CardContent>
        <Typography color="textSecondary" gutterBottom>
           Topic NTV  {this.props.dataFeed}
        </Typography>
        <Typography variant="h5" component="h2">
          Title buraya gelir
        </Typography>
        <Typography  color="textSecondary">
          Kaynagı burada yazar
        </Typography>
        <Typography component="p">
          Burada da detay yazar
          <br />
          {'"a benevolent smile"'}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>;
    }
  }
  export default Feeds
