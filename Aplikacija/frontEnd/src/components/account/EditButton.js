import React, { Component } from "react";
import { withStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import EditDialog from "./EditDialog"

const styles = {
  fab: {
    margin: 1,
    // boxShadow: "0px 0px 20px 2px rgba(0,0,0,0.52)"
  },
  extendedIcon: {
    marginRight: 1,
  },
};

export class EditButton extends Component {

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
              <Fab color="secondary" aria-label="Edit" className={classes.fab} onClick={this.handleClickOpen}>
                <EditIcon />
              </Fab>
              <EditDialog 
                open={this.state.open} 
                handleClose={this.handleClose}
                ime={this.props.ime}
                prezime={this.props.prezime}
                email={this.props.email}/>
          </div>
      )
  }
}

export default withStyles(styles)(EditButton);