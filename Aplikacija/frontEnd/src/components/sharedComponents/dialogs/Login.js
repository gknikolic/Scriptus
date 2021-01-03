import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Redirect } from 'react-router-dom';
import {UserContext} from "../../../App";
import InputAdornment from '@material-ui/core/InputAdornment';
import Error from '@material-ui/icons/Error';
import {login} from '../../../backendCommunication/communication'
import { Typography } from '@material-ui/core';

export class RegisterForm extends Component{

    state={
        route: null,
        usernameError: false,
        passwordError: false, 
    }

    removeUsernameAdornment = () => {
        if(this.state.usernameError)
            this.setState({
                usernameError: false,
            })
    }

    removePasswordAdornment = () => {
        if(this.state.passwordError)
            this.setState({
                passwordError: false,
            })
    }

    checkInput = (functions, state) => {
            const name = document.getElementById("standard-with-placeholder").value;
            const pass = document.getElementById("standard-password-input");

        fetch(login,{
            headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                  }, 
              method: "POST", 
              body: JSON.stringify({username: name, password: pass.value})
              })
        .then((response)=>{
            return response.json()
        })
        .then(response => {
            console.log(response)

            if(response===1)   
            {
                this.setState({passwordError: true})   
                pass.value = ''
            } 
               
            else if(response===2)
                this.setState({usernameError: true})
            else
            {
                functions.setLoggedOn(true);
                functions.setUserName(response.username);
                functions.setUserType(response.tip, ()=>this.props.toggleLoginDialog());
            }    
        })
        .catch(err => console.log(err))
}

    onClosing = () => {
        this.setState({usernameError: false, passwordError: false})
        this.props.toggleLoginDialog();
    }
    render(){
        let wrongUsername = "Pogrešno korisničko ime"
        let wrongPassword = "Pogrešna šifra."
        return(
        <UserContext.Consumer>
        {value=>{
            const {functions, state} = value; 
            const {route} = this.state; 

            const layout = route !== null ?
            <Redirect  push  to={route}/>
             :
            <Dialog open={this.props.open}>
                <DialogTitle>Prijavljivanje</DialogTitle>
                <DialogContent>
                    
                <TextField
                    autoFocus
                    id="standard-with-placeholder"
                    label="Korisnicko ime"
                    margin="normal"
                    fullWidth
                    onClick = {this.removeUsernameAdornment}
                    InputProps={
                        this.state.usernameError === true ?                       
                        {
                        startAdornment: (
                          <InputAdornment position="start" style={{color: "red", width: "270px"}}>
                            <Typography style={{color: "red"}}>{wrongUsername}</Typography> <Error />
                          </InputAdornment>
                        )
                        }
                        :
                        null
                    }
                    
                />
                <TextField
                    id="standard-password-input"
                    label="Sifra"
                    type="password"
                    autoComplete="current-password"
                    margin="normal"
                    fullWidth
                    onClick = {this.removePasswordAdornment}
                    InputProps={
                        this.state.passwordError === true ?                       
                        {
                        startAdornment: (
                          <InputAdornment position="start" style={{color: "red", width: "200px"}}>
                            <Typography style={{color: "red"}}>{wrongPassword}</Typography> <Error />
                          </InputAdornment>
                        )
                        }
                        :
                        null
                    }
                />
                
                </DialogContent>      
                <DialogActions>
                    <Button onClick={()=>this.checkInput(functions, state)}>
                        Potvrdi
                    </Button>
                    <Button onClick={this.onClosing}>Odustani</Button>
                </DialogActions> 
                 
            </Dialog>
            return (layout)}
        }</UserContext.Consumer>
        )
    }  
}

export default RegisterForm