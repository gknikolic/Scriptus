import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

export class RegisterForm extends Component{
    render(){

        return (
            <ClickAwayListener onClickAway={this.props.closeDialog}>
            <div>
            <Dialog open={this.props.open}>
                <DialogTitle id="alert-dialog-title">{"Prijavljivanje"}</DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Korisnik sajta dobija dodatne mogucnosti nakon sto se prijavi.
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                
                <Button onClick={()=>this.props.toggleLoginDialog()} color="primary" autoFocus>
                    Ok
                </Button>
                </DialogActions>
            </Dialog>
            </div>
            </ClickAwayListener>
        );
    }
}

export default RegisterForm;