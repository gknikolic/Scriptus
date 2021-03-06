import React, { Component } from "react";
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';

const styles = {

  avatar: {
    margin: 10,
  },

  bigAvatar: {
    margin: 10,
    width: 60,
    height: 60,
  },

};

export class Avatars extends Component {

    render() {
        const { classes } = this.props;
        return (
            <Grid container justify="center" alignItems="center">
              <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" className={classes.bigAvatar} />
            </Grid>
          );
    }

}

export default withStyles(styles)(Avatar);