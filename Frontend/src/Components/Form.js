import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios'

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  dense: {
    marginTop: 16,
  },
  menu: {
    width: 200,
  },
});


class OutlinedTextFields extends React.Component {
  state = {
    topicName:'',
    inputTitle:'',
    inputContent:'',
    status:false,
    publishBaseURL:'http://producer.api:5001',
    hostName:'producer.api',
    portName: 5001,
    chartbaseURL: 'http://localhost:5009',
  };


topicPublisher = () => {
  var instance = axios.create({
    baseURL: this.state.publishBaseURL,
    timeout: 1000,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Methods': 'POST',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
      'Access-Control-Allow-Origin': '*',
    },
    withCredentials: true,
    credentials: 'same-origin',
    proxy: {
      host:this.state.hostName,
      port: this.state.portName
    }
  });
 
  const url = "/api/producer";
  instance.post(url,{
      topic : this.state.topicName,
      message: this.state.inputContent
  }).then(res => {  

    if(res.data !== ""){

      setTimeout(function() { 
        this.setState({status: true}); 
      }.bind(this), 1000)
      this.setState({status:''})
      this.setState({inputContent:''})
     
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
      topicname: this.state.topicName
    }
  }).then(res => {  
   // console.log( res)
  })

}


handleSubmit = event => {
    event.preventDefault();
    this.topicPublisher();
    this.getAnalysisData();
}

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <form onSubmit={this.handleSubmit} className={classes.container} noValidate autoComplete="off">
        <TextField
          id="outlined-full-width"
          label="New Topic Name"
          style={{ margin: 20 }}
          className={classes.textField}
          value={this.state.topicName}
          onChange={this.handleChange('topicName')}
          placeholder="#ntv"
          fullWidth
          margin="normal"
          variant="outlined"
          InputLabelProps={{
            shrink: true,
          }}
        />

        <TextField
          id="outlined-full-width"
          label="Message"
          style={{ margin: 20 }}
          onChange={this.handleChange('inputContent')}
          value={this.state.inputContent}
          fullWidth
          margin="normal"
          variant="outlined"
          InputLabelProps={{
            shrink: true,
          }}
        />
         <Button style={{ width: 350}} variant="contained" color="secondary"  type="submit" className={classes.button}>
        " {this.state.topicName} "  Topic {this.state.status? "published":"Publish"}
      </Button>
      </form> 
    );
  }
}

OutlinedTextFields.propTypes = {
  classes: PropTypes.object.isRequired,  
};

export default withStyles(styles)(OutlinedTextFields);