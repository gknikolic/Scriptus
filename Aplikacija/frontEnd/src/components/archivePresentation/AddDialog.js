import React, { Component, useContext } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { withStyles } from '@material-ui/core/styles';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Draggable from 'react-draggable';
import {UserContext} from "../../App"; 
import {forumDodaj} from "../../backendCommunication/communication"
// import SubjectPresentation from './FetchForum'

const styles = {
  dialog: {
    minWidth: 500,
    "@media (max-width: 500px)" : {
      minWidth: 300,
    }
  }
};

function PaperComponent(props) {
  return (
    <Draggable cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...props} />
    </Draggable>
  );
}

export class AddDialog extends Component {

  onSubmit(username, subject) {
    // let text =  document.getElementById("username").value

    // fetch(forumDodaj, {
    //     headers: {
    //       'Accept': 'application/json',
    //       'Content-Type': 'application/json'
    //       }, 
    //       method: "POST", 
    //       body: JSON.stringify({user: username, subject: subject, text:text})
    //     })
    //     .then(response => response.json())
    //     .then(message => {
    //       alert(message.response)
    //     })

    this.props.handleClose()
  }

  render() {

    const { classes } = this.props;


    return (
     
      <UserContext.Consumer>
        {value=>{
          const {subject, username} = value.state; 
          

          return (
            <div>
              <Dialog
                open={this.props.open}
                onClose={this.props.handleClose}
                aria-labelledby="draggable-dialog-title"
                className={classes.dialog}
                PaperComponent={PaperComponent}
                disableRestoreFocus
              >
                <DialogTitle 
                  style={{ cursor: 'move' }} 
                  id="draggable-dialog-title"
                  className={classes.dialog}>
                  Postavi post na forumu
                </DialogTitle>
                <DialogContent>
                  <TextField
                          autoFocus
                          id="username"
                          label="Unesite poruku"
                          margin="normal"
                          fullWidth
                          multiline
                          rowsMax="4"
                      />
                </DialogContent>
                <DialogActions>
                  <Button onClick={this.props.handleClose} color="primary">
                    Odustani
                  </Button>
                  <Button onClick={()=>this.onSubmit(username, subject)} color="primary">
                    Postavi
                  </Button>
                </DialogActions>
              </Dialog>
              </div>
          );
        }}
        </UserContext.Consumer>
    )
  }
}

export default withStyles(styles)(AddDialog);