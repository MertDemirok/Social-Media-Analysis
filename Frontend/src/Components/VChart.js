import React, { Component } from 'react'
import { Bar, Line, Pie } from 'react-chartjs-2';

import socketIOClient from "socket.io-client";
import CardContent from '@material-ui/core/CardContent';
class VChart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      topicName: '',
      endpoint: "http://localhost:5005",
      chartbaseURL: 'http://localhost:5009',
      hostName: 'localhost',
      portName: 5009,
      finalScores: [],
      chartData: {
        labels: ["Very Negative", "Negative", "Normal", "Good", "Very Good"],
        datasets: [
          {
            label: '',
            data: [],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
            ],

          }
        ]
      }
    }
  }


  componentDidMount() {
    const { endpoint } = this.state;
    const socket = socketIOClient(endpoint);
    socket.on("TwitterAnalysis", data => this.dataControl(data));
  }

  dataControl = (res) => {

    var resDataScore = JSON.parse(res).score;
   

    this.setState({ finalScores: resDataScore })
    var label = this.state.chartData.labels;

    this.state.chartData.datasets[0].data = []
      label.forEach(element => {
        var newdata = this.state.chartData.datasets[0].data.concat(this.state.finalScores[element]);
       
        this.setState({ chartData:
          {
            labels:this.state.chartData.labels,
            datasets: [
              { 
                data: newdata ,
                backgroundColor: this.state.chartData.datasets[0].backgroundColor,
                label : JSON.parse(res).topic
              }
            ]
          } 
        });
      });
 
  }

  render() {

    return (
      <div className="chart">

<CardContent> <Bar
          data={this.state.chartData}
          options={{
            maintainAspectRatio: false
          }}
        /></CardContent>
<CardContent> <Line   
        data={this.state.chartData}
          options={{
            maintainAspectRatio: false
          }}/></CardContent>
       

      </div>

    )
  }
}


export default VChart
