import React from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import withWidth from '@material-ui/core/withWidth';
import Grid from '@material-ui/core/Grid'
import NavBar from './NavBar';
import MiddleTabs from './MiddleTabs';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  container: {
    display: 'flex',
  },
  paper: {
    padding: theme.spacing.unit * 3,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    flex: '1 0 auto',
    margin: theme.spacing.unit,
  },
});

function BreakpointDown(props) {
  const { classes } = props;

  return (
    
    <div className={classes.root}>
    <NavBar/>
      <Grid container spacing={24}>
        <Grid item xs>
          <Paper className={classes.paper}>FEEDS</Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}><MiddleTabs></MiddleTabs></Paper>
        </Grid>
        <Grid item xs>
          <Paper className={classes.paper}>3djs</Paper>
        </Grid>
      </Grid>

    </div>
  );
}

BreakpointDown.propTypes = {
  classes: PropTypes.object.isRequired,
  width: PropTypes.string.isRequired,
};

export default compose(
  withStyles(styles),
  withWidth(),
)(BreakpointDown);