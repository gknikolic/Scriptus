import React, { Component } from "react";
import Button from '@material-ui/core/Button';
import { withStyles } from "@material-ui/core/styles";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {addExamQuestion} from "../../backendCommunication/communication"
import AddQuestionExam from "./AddQuestionExam";
import {UserContext} from "../../App"

const styles = {

    color: {
        color: "white",
        "&:hover": {
            background: "#304ffe"
        }
    },

    text: {
        marginTop: "18px",
    }
}

export class UploadButton extends Component {
    
    constructor(props){
        super(props);

        const year = 2000;
        for(let i=20; i>0; i--)
            this.state.data.years.push(year+i);
        
        for(let i=0; i<20; i++)
        this.state.data.numbers.push(i);
    }

    state = {
        year: null,
        exam: null,
        type: null,
        number: null,
        question: null, 
        data: {
            years: [],
            exams: ["Kolokvijum 1", "Kolokvijum 2", "Kolokvijum 3", "Januar", "Mart", "April", "Jun", "Jul", "Septembar", "Oktobar 1", "Oktobar 2", "Novembar", "Decembar"],
            numbers: []
        },
        error: false,
       
    }

//#region  setters
    checkYear = () => {
        this.setState({year: document.getElementById("year").value});
    }

    checkExam = () => {
        this.setState({exam: document.getElementById("exam").value});
    }

    checkNumber = () => {
        this.setState({number: document.getElementById("number").value});
    }

    checkQuestion = () => {
        this.setState({question: document.getElementById("question").value});
    }
//#endregion

  
    handleSubmit = (username, subject, setReloadQuestions) => {
        const choices = {
            year: this.state.year,
            exam: this.state.exam,
            number: this.state.number,
            question: this.state.question,
            app: this.props.App,
            user: username,
            subject: subject,
        }

        fetch(addExamQuestion, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                }, 
            method: "POST", 
            body: JSON.stringify(choices)
        })
        .then(()=>{
            this.props.toggleQuestion();
            this.setState({year: null});
            this.setState({exam: null});
            this.setState({number: null});
            this.setState({question: null});
            setReloadQuestions(true);
        })
        .catch(err=>console.log(err))
    
    }

    handleClose = ()=>{
        this.props.toggleQuestion();
        this.setState({year: null});
        this.setState({exam: null});
        this.setState({number: null});
        this.setState({question: null});
    }
    render() {
        
        const { classes } = this.props;
        const {years, numbers, exams} = this.state.data;
        const submit = !(this.state.year && this.state.number && this.state.exam && this.state.question);
   
        return (
            <UserContext.Consumer>
            {value=>{
            const {state} = value;
            const {username, subject} = value.state;
            const {setReloadQuestions} = value.functions
           

            return (
                    <Dialog open={this.props.open}>
                        <DialogTitle>Kreiranje pitanja</DialogTitle>
                        <DialogContent>
                        <FormControl fullWidth >
                            <Select
                            native
                            inputProps={{
                                id: 'year',
                            }}
                            fullWidth
                            onChange={this.checkYear}
                            >
                            <option value="" style={{display: "none"}}>Godina</option>
                            {years.map((year, index) =>  <option value={year} key={index}>{year}</option>)}
                            </Select>   
                        </FormControl>
                        <FormControl fullWidth >
                            <Select
                            native
                            inputProps={{
                                id: 'exam',
                            }}
                            fullWidth
                            onChange={this.checkExam}
                            >
                            <option value="" style={{display: "none"}}>Rok</option>
                            {exams.map((exam, index) =>  <option value={exam} key={index}>{exam}</option>)}
                            </Select>
                        </FormControl>
                        <FormControl fullWidth>
                        <Select
                        native
                        inputProps={{
                            id: 'number',
                        }}
                        fullWidth
                        onChange={this.checkNumber}
                        >
                        <option value="" style={{display: "none"}}>Broj</option>
                        {numbers.map((number, index) =>  <option value={index} key={index}>{number}</option>)}
                        </Select>
                        </FormControl>
                        <div className={classes.text}>Pitanje</div>
                        
                        
                        <textarea rows="10" cols="73" id="question" onChange={this.checkQuestion}>
                        </textarea>
                        </DialogContent>      
                        <DialogActions>
                            <Button onClick={()=>this.handleSubmit(username, subject, setReloadQuestions)}  disabled={submit} id="submit">
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

export default withStyles(styles)(UploadButton);

