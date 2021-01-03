import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {register} from '../../../backendCommunication/communication';
import InputAdornment from '@material-ui/core/InputAdornment';
import Error from '@material-ui/icons/Error';
import {UserContext} from "../../../App";
import { Typography } from '@material-ui/core';

export class RegisterForm extends Component{

    
    state = {
        user : false,
        pass : false,
        emailSet: false,
        userError: false,
        passError: false,
        screenSize: window.innerWidth,
    }

    updateScreenSize = () => this.setState({screenSize: window.innerWidth, resizeScreen: true});

    componentDidMount(){
        window.addEventListener("resize", this.updateScreenSize);
    }
  
    componentWillUnmount() {
      window.removeEventListener("resize", this.updateScreenSize);
    }

    handleClose = ()=>{
        this.setState({user : null});
        this.setState({passError : null});
        this.setState({emailSet : null});
        this.setState({enabled : false})
        this.props.toggleRegistrationDialog();
    }
    

    checkMail = () => {
        const email = document.getElementById("email").value;
        this.setState({
            emailSet : email !== '' ? true : false
        })
    }

    checkPass = () => {
        if(this.state.passError===true)
            this.setState({passError: false})
        const pass1 = document.getElementById("password").value
        const pass2 = document.getElementById("rePassword").value
        this.setState({
            pass : (pass1 !== '' && pass2 !== '') && pass1.length === pass2.length ? true : false  
        })
    }

    checkUsername = () => {
        if(this.state.userError===true)
            this.setState({userError: false})
        const username = document.getElementById("username").value;
        this.setState({
            user : username !== '' ? true : false
        })
    }

    removeUsernameAdornment = () => {
        if(this.state.userError)
            this.setState({
                userError: false,
            })
    }

    removePasswordAdornment = () => {
        if(this.state.passError)
            this.setState({
                passError: false,
            })
    }

    onSubmit = (functions) => {
        const pass1 = document.getElementById("password")
        const pass2 = document.getElementById("rePassword")
        if(pass1.value !== pass2.value){
            this.setState({
                passError: true
            })
            pass1.value = ''
            pass2.value = ''
        }
        else{
            fetch(register, {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                        }, 
                    method: "POST", 
                    body: JSON.stringify(
                        {
                            username: document.getElementById("username").value, 
                            password: document.getElementById("password").value,
                            email: document.getElementById("email").value,
                        })
                })
                .then(response => {
                    return response.text();
                })
                .then(result => {
                    if(result === "1") {
                        functions.setLoggedOn(true);
                        functions.setUserName(document.getElementById("username").value);
                        functions.setUserType("obican");
                        this.props.toggleRegistrationDialog()
                    }
                    else
                        this.setState({
                            userError: true
                        })
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }


render(){
        let unvisible = true;
        const {user,pass, emailSet, screenSize}= this.state;
        let wrongUsername = screenSize < 500 ? null : "Već postoji!"
        let wrongPassword = screenSize < 500 ? null : "Nisu iste šifre."

        if(user && pass && emailSet)
            unvisible=false;
    
    return (
    <UserContext.Consumer>
        {value=>{
        const {functions} = value; 
        const {newAnswer, expandOnArrow} = this.state;

        return(
            <Dialog open={this.props.open}>
                <DialogTitle>Registrovanje</DialogTitle>
                <DialogContent>
                <TextField
                    autoFocus
                    id="username"
                    label="Korisnicko ime"
                    margin="normal"
                    fullWidth
                    onClick = {this.removeUsernameAdornment}
                    onChange={this.checkUsername}
                    InputProps={
                        this.state.userError === true ?                       
                        {
                        startAdornment: (
                          <InputAdornment position="start" style={{color: "red", width: "120px"}}>
                            <Typography style={{color: "red"}}>{wrongUsername}</Typography> <Error />
                          </InputAdornment>
                        )
                        }
                        :
                        null
                    }
                />
                <TextField
                    margin="dense"
                    id="email"
                    label="Email adresa"
                    type="email"
                    fullWidth
                    onChange={this.checkMail}
                />
                <TextField
                    id="password"
                    label="Sifra"
                    type="password"
                    autoComplete="current-password"
                    margin="normal"
                    fullWidth
                    onClick = {this.removePasswordAdornment}
                    onChange={this.checkPass}
                    InputProps={
                        this.state.passError === true ?                       
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
                
                <TextField
                    id="rePassword"
                    label="Potvrda sifre"
                    type="password"
                    autoComplete="current-password"
                    margin="normal"
                    fullWidth
                    onChange={this.checkPass}
                />

                </DialogContent>      
                <DialogActions>
                    <Button disabled={unvisible} onClick={()=>this.onSubmit(functions)}>
                        Potvrdi
                    </Button>
                    <Button onClick={this.handleClose}>Odustani</Button>
                </DialogActions>   
            </Dialog>
        );
        }}
    </UserContext.Consumer>
    )
}
}

export default RegisterForm