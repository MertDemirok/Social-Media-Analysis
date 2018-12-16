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
    topicName:'posts',
    inputTitle:'',
    inputContent:'',
  };


topicPublisher = () => {
  var instance = axios.create({
    baseURL: 'http://producer.api:5001',
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
      host:'producer.api',
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
      this.setState({inputTitle:''})
      this.setState({inputContent:''})
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
handleSubmit = event => {
    event.preventDefault();
    this.topicPublisher();
}

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };



  render() {
    const { classes } = this.props;
    //const stylet = this.state.isDetailActive ? {display :'none'} : {};
    return (
      <form onSubmit={this.handleSubmit} className={classes.container} noValidate autoComplete="off">
        <TextField
          id="outlined-full-width"
          label="New Topic Name"
          style={{ margin: 20 }}
          className={classes.textField}
          value={this.state.topicName}
          onChange={this.handleChange('topicName')}
          placeholder="ntv"
          helperText="Kafka server ready"
          fullWidth
          margin="normal"
          variant="outlined"
          InputLabelProps={{
            shrink: true,
          }}
        />

        <TextField
          id="outlined-full-width"
          label="News Title"
          style={{ margin: 20 }}
          onChange={this.handleChange('inputTitle')}
          value={this.state.inputTitle}
          placeholder="...."
          helperText="Kafka server ready"
          fullWidth
          margin="normal"
          variant="outlined"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          id="outlined-full-width"
          label="News Detail"
          style={{ margin: 20 }}
          onChange={this.handleChange('inputContent')}
          value={this.state.inputContent}
          helperText="Kafka server ready"
          fullWidth
          margin="normal"
          variant="outlined"
          InputLabelProps={{
            shrink: true,
          }}
        />
         <Button style={{ width: 350}} variant="contained" color="secondary"  type="submit" className={classes.button}>
        " {this.state.topicName} "  Topic Publish
      </Button>
      </form>
      
    );
  }
}

OutlinedTextFields.propTypes = {
  classes: PropTypes.object.isRequired,  
};

export default withStyles(styles)(OutlinedTextFields);