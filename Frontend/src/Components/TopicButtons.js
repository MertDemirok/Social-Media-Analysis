import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import feeds from './Feeds'

class Tbutton extends Component {

    state = {
        tData: '',
        container: {
            display: 'flex',
            flexWrap: 'wrap',
        },
        topicName: '',
        feedsView:'',
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.currentTarget.id,
        });
        console.log( event.currentTarget.id)
        this.setState({feedsView:event.currentTarget.id})
        const feed = new feeds();
        feed.addNewsList("")
        feed.addTweetsToKafka(event.currentTarget.id);
      
    };

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