import React, { Component } from "react";
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Avatar from './Avatar'

const styles = {
    
    root: {
        flexGrow: 1,
      },

      paper: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 3,
        textAlign: 'center',
      },

};

export class AccountCard extends Component{
 
  render(){
    const { classes } = this.props;

    return (
        <div className={classes.root}>
            <Grid item xs={3}>
                    <Paper className={classes.paper}>
                        <Avatar></Avatar>
                        ovde idu informacije za korisnika
                    </Paper>
            </Grid>
        </div>
    );
    }
}

export default withStyles(styles)(AccountCard);