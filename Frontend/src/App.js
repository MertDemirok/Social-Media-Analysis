import React, { Component } from 'react'
import socketIOClient from "socket.io-client";
import Main from './Components/Main';


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

render () {
  const listItems = this.state.newsItems.map((d) => <li >{d.value}</li>);

return (
    <div>
      <Main />

      <ul>{listItems}</ul>
      
    </div>
    )
  }
}
export default App