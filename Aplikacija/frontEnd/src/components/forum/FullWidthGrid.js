import React, { Component } from "react";
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import AccountCard from './AccountCard'

const styles = {
    
    root: {
        //felxGrow: 1,
        flexBasis: 0.7
      },

      paper: {
        padding: 3,
        textAlign: 'center',
      },

};

export class FullWidthGrid extends Component{
 
  render(){
    const { classes } = this.props;

    return (
        <div className={classes.root}>
        <Grid container spacing={3}>
            <Grid item xs={12}>
            <Paper className={classes.paper}>
                <AccountCard></AccountCard>
                ovde ide tekst
            </Paper>
            </Grid>
        </Grid>
        </div>
    );
    }
}

export default withStyles(styles)(FullWidthGrid);