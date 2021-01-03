import React, { Component } from "react";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {UserContext} from "../../App"; 
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import InputAdornment from '@material-ui/core/InputAdornment';
import Error from '@material-ui/icons/Error';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {promeniSifru} from '../../backendCommunication/communication';

const styles = {
    dialog: {
        overflowX: "hidden"
      },
      root: {
        width: '100%',
      },
      heading: {
        // fontSize: "15rem",
        flexBasis: '33.33%',
        flexShrink: 0,
      },
      secondaryHeading: {
        // fontSize: "15rem",
        color: "#9e9e9e",
      },
      fieldConteiner: {
          display: "flex",
          flexDirection: "column"
      },
      field: {
        flexGrow: 1
      },
      dugmici: {
          display: "flex",
          justifyContent: "flex-end"
      }



  };

export class EditDialog extends Component {

    state = {
        passError: false,
        screenSize: window.innerWidth,
        expanded: false,
        user: "",
        ime: "",
        prezime: "",
        pass: false,
        email: "",
        name: "",
    }

    odustani() {
        this.setState({expanded: null})
        this.clear()
    }

    clear() {
        this.setState({        
            user: "",
            ime: "",
            prezime: "",
            email: "",
            pass: false,
            name: false,

        })
    }

    handleChange = panel => (event, isExpanded) => {
      this.setState({expanded : isExpanded ? panel : false});
    };

    updateScreenSize = () => this.setState({screenSize: window.innerWidth, resizeScreen: true});

    componentDidMount(){
        window.addEventListener("resize", this.updateScreenSize);
    }
  
    componentWillUnmount() {
      window.removeEventListener("resize", this.updateScreenSize);
    }

    checkPass = () => {
        if(this.state.passError===true)
            this.setState({passError: false})
        const pass1 = document.getElementById("password").value
        const pass2 = document.getElementById("rePassword").value
        const pass3 = document.getElementById("oldPassword").value
        this.setState({
            pass : ((pass1 !== '' && pass2 !== '') && pass1.length === pass2.length) && pass3 !=="" ? true : false  
        })
        console.log(this.state.pass)
    }

    
    checkEmail = () => {

    }
    
    checkNameAndSurname = () => {
        const name = document.getElementById("ime").value
        const surname = document.getElementById("prezime").value
        this.setState({
            name : (name !== '' && surname !== '') ? true : false  
        })

    }
    

    handleName = (user) => {
        fetch(promeniSifru, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }, 
            method: "POST", 
            body: JSON.stringify(
                {
                    name: document.getElementById("ime").value, 
                    surname: document.getElementById("prezime").value,
                    username: user
                })
        })
        .then(response => {
            return response.text();
        })
        .then(result => {
            if(result === "1") {
                alert("Sifra promenjena")
            }
            else{
                alert("Pogresna sifra")
            }
            
        })
        .catch(err => {
            console.log(err)
        })
    }
    
    handlePass = (user) => {
        fetch(promeniSifru, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }, 
            method: "POST", 
            body: JSON.stringify(
                {
                    newPassword: document.getElementById("password").value, 
                    password: document.getElementById("oldPassword").value,
                    username: user
                })
        })
        .then(response => {
            return response.text();
        })
        .then(result => {
            if(result === "1") {
                alert("Sifra promenjena")
            }
            else{
                alert("Pogresna sifra")
            }
            
        })
        .catch(err => {
            console.log(err)
        })
    }



    render() {
        const { classes } = this.props;

        let unvisible = true;
        let unvisibleName = true;
        const {user,pass, emailSet, screenSize}= this.state;
        let wrongPassword = screenSize < 500 ? null : "Nisu iste šifre."
        let dialogWidth = screenSize * 0.8 + "px"

        if(pass)
            unvisible=false;
        if(this.state.name)
            unvisibleName = false;
        return (
     
            <UserContext.Consumer>
              {value=>{
                const {subject, username, screenSize} = value.state; 
                
      
                return (
                    
                    <Dialog 
                        open={this.props.open}
                        onClose={this.props.handleClose}
                        aria-labelledby="form-dialog-title"
                    >
                            
                        <DialogTitle id="form-dialog-title" className={classes.dialog}>
                            <div style={{width: dialogWidth}}>Izmeni informacije profila</div>
                        </DialogTitle>
                        <DialogContent>
                            {/* <ExpansionPanel 
                                expanded={this.state.expanded === 'username'} 
                                onChange={this.handleChange('username')}>
                                <ExpansionPanelSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1bh-content"
                                    id="panel1bh-header"
                                >
                                    <Typography className={classes.heading}>Korisnilko ime:</Typography>
                                    <Typography className={classes.secondaryHeading}>
                                        {username}
                                    </Typography>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails className={classes.fieldConteiner}>
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        id="username"
                                        label="username"
                                        type="text"
                                        fullWidth
                                    />
                                    <TextField
                                        margin="dense"
                                        id="sifra"
                                        label="sifra"
                                        type="password"
                                        fullWidth
                                    />
                                    <div className={classes.dugmici}>
                                        <Button onClick={() => {this.odustani()}} color="primary">
                                            Odustani
                                        </Button>
                                        <Button onClick={this.props.handleClose} color="primary" disabled={unvisible}>
                                            Sačuvaj
                                        </Button>
                                    </div>
                                </ExpansionPanelDetails>
                            </ExpansionPanel> */}
                            <ExpansionPanel 
                                expanded={this.state.expanded === 'password'} 
                                onChange={this.handleChange('password')}>
                                <ExpansionPanelSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel3bh-content"
                                    id="panel3bh-header"
                                >
                                    <Typography className={classes.heading}>Šifra</Typography>
                                
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails className={classes.fieldConteiner}>
                                <TextField
                                    autoFocus
                                    id="password"
                                    label="Sifra"
                                    type="password"
                                    autoComplete="current-password"
                                    margin="normal"
                                    fullWidth
                                    onChange={this.checkPass}
                                    InputProps={
                                        this.state.passError === true ?                       
                                        {
                                        startAdornment: (
                                        <InputAdornment position="start" style={{color: "red", width: "120px"}}>
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
                                <TextField
                                    id="oldPassword"
                                    label="Stara sifra"
                                    type="password"
                                    autoComplete="current-password"
                                    margin="normal"
                                    fullWidth
                                    onChange={this.checkPass}
                                />
                                <div className={classes.dugmici}>
                                    <Button onClick={() => {this.odustani()}} color="primary">
                                        Odustani
                                    </Button>
                                    <Button onClick={()=>this.handlePass(username)} color="primary" disabled={unvisible}>
                                        Sačuvaj
                                    </Button>
                                </div>
                            
                            </ExpansionPanelDetails>
                            </ExpansionPanel>
                                <ExpansionPanel 
                                expanded={this.state.expanded === 'ime'} 
                                onChange={this.handleChange('ime')}>
                                <ExpansionPanelSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1bh-content"
                                    id="panel1bh-header"
                                >
                                    <Typography className={classes.heading}>Ime i prezime:</Typography>
                                    <Typography className={classes.secondaryHeading}>
                                        {`${this.props.ime}  ${this.props.prezime}`}
                                    </Typography>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails className={classes.fieldConteiner}>
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        id="ime"
                                        label="Ime"
                                        type="text"
                                        fullWidth
                                        onChange={this.checkNameAndSurname}
                                    />
                                    <TextField
                                        margin="dense"
                                        id="prezime"
                                        label="prezime"
                                        type="text"
                                        fullWidth
                                        onChange={this.checkNameAndSurname}
                                    />
                                    <div className={classes.dugmici}>
                                        <Button onClick={() => {this.odustani()}} color="primary">
                                            Odustani
                                        </Button>
                                        <Button onClick={() => {this.handleName(user)}} color="primary" disabled={unvisibleName}>
                                            Sačuvaj
                                        </Button>
                                    </div>
                                </ExpansionPanelDetails>
                                </ExpansionPanel>
                                {/* <ExpansionPanel 
                                expanded={this.state.expanded === 'email'} 
                                onChange={this.handleChange('email')}>
                                <ExpansionPanelSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel2bh-content"
                                    id="panel2bh-header"
                                >
                                    <Typography className={classes.heading}>E-mail</Typography>
                                    <Typography className={classes.secondaryHeading}>
                                        {this.props.email}
                                    </Typography>

                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails className={classes.fieldConteiner}>
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        id="email"
                                        label="Email Address"
                                        type="email"
                                        fullWidth
                                        onChange={this.checkEmail}
                                    />
                                    <div className={classes.dugmici}>
                                        <Button onClick={() => {this.odustani()}} color="primary">
                                            Odustani
                                        </Button>
                                        <Button onClick={this.handleClose} color="primary" disabled={unvisible}>
                                            Sačuvaj
                                        </Button>
                                    </div>


                                </ExpansionPanelDetails>
                                </ExpansionPanel> */}

                                </DialogContent>
                                <DialogActions>
                                <Button onClick={this.props.handleClose} color="primary">
                                    Odustani
                                </Button>

                                </DialogActions>
                            </Dialog>
                      );
                    }}
            </UserContext.Consumer>
        )
    }
  
}

export default withStyles(styles)(EditDialog)