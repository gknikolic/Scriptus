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
import {nastavnikDodaj} from "../../backendCommunication/communication"
import Select from '@material-ui/core/Select';
import { array } from 'prop-types';
// import SubjectPresentation from './FetchForum'

const styles = {
  dialog: {
    minWidth: 500,
    "@media (max-width: 500px)" : {
      minWidth: 300,
    }
  }
};

// function PaperComponent(props) {
//   return (
//     <Draggable cancel={'[class*="MuiDialogContent-root"]'}>
//       <Paper {...props} />
//     </Draggable>
//   );
// }

export class AddDialog extends Component {

    state={
        nameSet: false,
        surnameSet: false, 
    }

    checkSurname = () => {
        const surname = document.getElementById("prezime").value;
        this.setState({
            surnameSet : surname !== '' ? true : false
        })
    }

    checkName = () => {
        const name = document.getElementById("ime").value;
        this.setState({
            nameSet : name !== '' ? true : false
        })
    }


    onSubmit(username, subject) {
    let ime =  document.getElementById("ime").value
    let prezime =  document.getElementById("prezime").value
    let fprofesor =  document.getElementById("fprofesor").value ==="profesor" ? 1 : 0;
    fetch(nastavnikDodaj, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
          }, 
          method: "POST", 
          body: JSON.stringify({name: ime, subject: this.props.subject, surname:prezime, professionType: fprofesor})
        })
        .then(response => response.json())
        .then(message => {
            console.log(message)
            if(message.affectedRows == 1)
              alert("Profesor dodat")
        })

    this.props.handleClose()
  }

  render() {
    let unvisible = true;

    if(this.state.surnameSet && this.state.nameSet)
        unvisible = false;

    const { classes } = this.props;

    const pf = ["profesor", "asistent"]
    return (
     
      <UserContext.Consumer>
        {value=>{
          const {subject, username} = value.state; 
          //console.log(this.props.subject)

          return (
            <div>
              <Dialog
                open={this.props.open}
                onClose={this.props.handleClose}
                aria-labelledby="draggable-dialog-title"
                className={classes.dialog}
                // PaperComponent={PaperComponent}
                disableRestoreFocus
              >
                <DialogTitle 
                  style={{ cursor: 'move' }} 
                  id="draggable-dialog-title"
                  className={classes.dialog}>
                  Dodaj profesora
                  
                </DialogTitle>
                <DialogContent>
                  <TextField
                          autoFocus
                          id="ime"
                          label="Unesite ime"
                          margin="normal"
                          fullWidth
                          multiline
                          rowsMax="4"
                          onChange={this.checkName}
                      />
                      <TextField
                          autoFocus
                          id="prezime"
                          label="Unesite prezime"
                          margin="normal"
                          fullWidth
                          multiline
                          rowsMax="4"
                          onChange={this.checkSurname}
                      />
                        <Select
                        native
                        inputProps={{
                            id: 'fprofesor',
                        }}
                        fullWidth
                        onChange={this.checkFProfesor}
                        >
                        <option value="" style={{display: "none"}}></option>
                        {pf.map((a, index) =>  <option value={a} key={index}>{a}</option>)}
                        </Select> 
                      
                </DialogContent>
                <DialogActions>
                  <Button onClick={this.props.handleClose} color="primary">
                    Odustani
                  </Button>
                  <Button disabled={unvisible} onClick={()=>this.onSubmit(username, subject)} color="primary">
                    Dodaj
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