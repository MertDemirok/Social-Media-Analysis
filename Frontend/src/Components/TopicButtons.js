import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import feeds from './Feeds'
import axios from 'axios'

class Tbutton extends Component {

    state = {
        tData: '',
        container: {
            display: 'flex',
            flexWrap: 'wrap',
        },
        topicName: '',
        feedsView:'',
    chartbaseURL: 'http://localhost:5009',
    hostName:'localhost',
    portName: 5009,
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.currentTarget.id,
        });
   
        this.setState({feedsView:event.currentTarget.id})
        const feed = new feeds();
        feed.addNewsList("")
        feed.addTweetsToKafka(event.currentTarget.id);
        feed.setState({topicName:event.currentTarget.id})

        this.getAnalysisData(event.currentTarget.id)

      
    };

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
          console.log( res)
        })
    
      }

    render() {
       
       
        return (
            <div className={this.props.container} >
                <Button onClick={this.handleChange('topicName')}
                    id={this.props.data}
                    variant="contained"
                    style={{
                        borderRadius: 30,
                        backgroundColor: this.props.colortopic,
                        padding: "18px 36px",
                        margin: "5px",
                        fontSize: "12px"
                    }}>
                    {this.props.data}
                </Button>
                
            </div>

        )
    }
}

export default Tbutton