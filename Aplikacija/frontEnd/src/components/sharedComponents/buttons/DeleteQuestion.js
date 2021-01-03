import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {deleteQuestion} from '../../../backendCommunication/communication'


export class RegisterForm extends Component{

    handleOk = () => {
        const {questionId} = this.props
        fetch(deleteQuestion, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }, 
            method: "POST", 
            body: JSON.stringify(
                {
                    materialId : questionId
                })
        })
        .then(response => {
            return response.text();
        })
        .then(result => {
            // if(result === "1") {
            //     alert("Sifra promenjena")
            // }
            // else{
            //     alert("Pogresna sifra")
            // }
            
        })
        .catch(err => {
            console.log(err)
        })  





        this.props.close()
    }


    handleClose = () => {
        this.props.close()
    }

    render(){

        return (
            <div>
            <Dialog open={this.props.open}>
                <DialogTitle id="alert-dialog-title">{"Prijavljivanje"}</DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Korisnik sajta dobija dodatne mogucnosti nakon sto se prijavi.
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                
                <Button onClick={()=>this.handleClose} color="primary" autoFocus>
                    Odustani
                </Button>
                <Button onClick={()=>this.handleOk()} color="primary" autoFocus>
                    Ok
                </Button>
                </DialogActions>
            </Dialog>
            </div>
        );
    }
}

export default RegisterForm;