import React, { Component } from 'react'
import axios from 'axios'
import socketIOClient from "socket.io-client";

class App extends Component {

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
  var list= this.state.newsItems.concat(dataInfo);
  this.setState({newsItems:list});
  }
  
  componentDidMount() {
    const { endpoint } = this.state;
    const socket = socketIOClient(endpoint);
    socket.on("News",data => this.addNewsList(data));
  }



  handleSubmit = event => {
    event.preventDefault();
    this.topicPublisher();
}

topicPublisher = () => {
  var instance = axios.create({
    baseURL: 'http://localhost:5001',
    timeout: 1000,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
      'Access-Control-Allow-Origin': '*',
    },
    credentials: 'same-origin',
    proxy: {
      host:'localhost',
      port: 5001
    }
  });

  const url = "/api/producer";
  instance.post(url,{
      topic : this.state.topicName,
      message: {
        title: this.state.inputTitle,
        content:  this.state.inputContent
      }
  }).then(res => {  
    if(res.data !== ""){
      const resultOffset = " Created and Published";
      this.setState({resultOffset});
      this.setState({isDetailActive: false})
    }else{
      alert("Not Found Topic :(");
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
    }
  
  console.log(error.config);
});
}

render () {
  const style = this.state.isDetailActive ? {display :'none'} : {};

  const listItems = this.state.newsItems.map((d) => <li >{d.value}</li>);
    return (
      <div>
        <h3>Producer Control Panel</h3>
        <form onSubmit={this.handleSubmit}>
          <label>
            Topic Name :
            <input type="text" name="topicName"  onChange={this.handleChange}  value={this.state.topicName}/>
          </label>
          <label>
            Title :
            <input type="text" name="inputTitle" onChange={this.handleChange} value={this.state.inputTitle} />
          </label>
          <label>
            Content :
            <input type="text" name="inputContent" onChange={this.handleChange} value={this.state.inputContent} />
          </label>
          <button type="submit">Publish</button>
        </form>
        <div style={style}>
        <p >{this.state.topicName} topic is {this.state.resultOffset}</p>
        </div>
      <ul>{listItems}</ul>
      </div>
      
    )
  }
}
export default App