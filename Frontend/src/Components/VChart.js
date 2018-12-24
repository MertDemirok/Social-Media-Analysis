import React, { Component } from 'react'
import { Bar, Line, Pie } from 'react-chartjs-2';
import axios from 'axios'

class VChart extends Component {
  constructor(props) {
    super(props)
    this.state = {
    chartbaseURL: 'http://localhost:5009',
    hostName:'localhost',
    portName: 5009,
    finalScores: [],
      chartData: {
        labels: ["Very Negative", "Negative", "Normal", "Good", "Very Good"],
        datasets: [
          {
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


  getAnalysisData = (tName) =>{


    var instance = axios.create({
      baseURL: this.state.chartbaseURL,
      proxy: {
        host:this.state.hostName,
        port: this.state.portName
      }
    });
   
    const url = "/api/dataanalysis";
    instance.get(url,{
      params: {
        topicname: tName
      }
    }).then(res => { 
      
      var resDataScore = JSON.parse(res.data).score
      this.setState({finalScores:resDataScore})
      
      var label = this.state.chartData.labels;

          label.forEach(element => {
            var newdata = this.state.chartData.datasets[0].data.concat(this.state.finalScores[element]);    
            this.setState({chartData:{datasets:[{data:newdata}]}})
          });
    })

  }


  componentDidMount() {

    this.getAnalysisData('bbc')
   


  }

  render() {

    return (
      <div className="chart">

        <Bar
          data={this.state.chartData}
          options={{
            maintainAspectRatio: false
          }}
        />

      </div>

    )
  }
}



export default VChart
