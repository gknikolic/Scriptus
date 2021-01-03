import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export class RegisterForm extends Component{
    render(){
        
        return (
            <div>
            <Dialog open={this.props.open}>
                <DialogTitle id="alert-dialog-title">Kontakt</DialogTitle>
                <DialogContent>
                <DialogContentText>
                    darjan.drugarinovic@elfak.rs <br></br>
                    n.nikolic@elfak.rs <br></br>
                    z.balanovic@elfak.rs 
                </DialogContentText>
                <div></div>
                </DialogContent>
                <DialogActions>
                
                <Button onClick={this.props.toggleLoginDialog} color="primary" autoFocus>
                    Ok
                </Button>
                </DialogActions>
            </Dialog>
            </div>
        );
    }
}

export default RegisterForm;