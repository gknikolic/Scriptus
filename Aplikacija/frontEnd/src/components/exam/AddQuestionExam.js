import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import AddQuestionExam from "./AddQuestionDialog";
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';


const styles = {
    color: {
        color: "white",
        "&:hover": {
            background: "#133e86",
        },
    },

    container: {
        display: "flex",
    }
};

export class UploadButton extends Component {
    
    state = { 
        question: false
    }

    toggleQuestion = () => this.setState({question: !this.state.question});

    render() {

        const { classes } = this.props;

        return (
            <div className={classes.container}>
                <Fab color="primary" aria-label="Add" className={classes.fab} onClick={this.toggleQuestion}>
                  <AddIcon />
                </Fab>
                    <AddQuestionExam open={this.state.question} App={this.props.state} toggleQuestion={this.toggleQuestion}/>
            </div>
        );
    }
}

export default withStyles(styles)(UploadButton);