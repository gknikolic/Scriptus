import React, { Component } from "react";
import { withStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import AddDialog from "./AddDialog"

const styles = {
  fab: {
    margin: 1,
  },
  extendedIcon: {
    marginRight: 1,
  },
};

export class AddButton extends Component {

  state = {
    open: false,
  }

  handleClickOpen = () => {
    this.setState({open: true})
  };

  handleClose = () => {
    this.setState({open: false})
  };

  render() {
      const { classes } = this.props;

      return (
          <div>
              <Fab color="primary" aria-label="Add" className={classes.fab} onClick={this.handleClickOpen}>
                  <AddIcon />
              </Fab>
              <AddDialog 
              open={this.state.open} 
              handleClose={this.handleClose}
              subject={this.props.subject}/>
          </div>
      )
  }
}

export default withStyles(styles)(AddButton);