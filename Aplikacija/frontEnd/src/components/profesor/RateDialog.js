import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {rateProfesor} from "../../backendCommunication/communication"

export class RegisterForm extends Component{
    constructor(props){
        super(props);

        for(let i=1; i<=10; i++)
        this.state.rates.push(i);
    }

    state = {
        rates: [],
        rate: null,
        submit: true,
    }

    handleSubmit = () => {
            //console.log(this.props.predajeId)
            // const data = new FormData();
            // data.append("json", JSON.stringify(this.state.rate))
    
            fetch(rateProfesor, {
                method: "POST", 
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                  },
                body: JSON.stringify({
                ocena: this.state.rate,
                id: this.props.predajeId,
                })
            })
            .then((response)=>{
                this.props.toggleLoginDialog()
                this.setState({submit: true, rate: null});
                return response.json();
            })
            .then(response => {
                // console.log(response)
                this.props.setRating(response.ocena);
            })
            .catch(err=>console.log(err))
        
    }

    handleClose = () => {
        this.props.toggleLoginDialog()
        this.setState({submit: true});
    }

    setRate = () => {
        debugger
        this.setState({rate: document.getElementById("rate").value, submit: false});
    }

    render(){
        const {rates, submit} = this.state;
       
        return (
            <div>
            <Dialog open={this.props.open}>
                <DialogTitle id="alert-dialog-title">Oceni profesora</DialogTitle>
                <DialogContent>
                <FormControl fullWidth >
                    <Select
                    native
                    inputProps={{
                        id: 'rate',
                    }}
                    fullWidth
                    onChange={this.setRate}
                    >
                    <option value="" style={{display: "none"}}>Ocena</option>
                    {rates.map((rate, index) =>  <option value={index} key={index}>{rate}</option>)}
                    </Select>   
                </FormControl>
                </DialogContent>
                <DialogActions>
                
                <Button onClick={()=>this.handleClose()} color="primary" >
                    Odustani
                </Button>
                <Button onClick={()=>this.handleSubmit()} color="primary" disabled={submit} id="submit">
                    Potvrdi
                </Button>
                
                </DialogActions>
            </Dialog>
            </div>
        );
    }
}

export default RegisterForm