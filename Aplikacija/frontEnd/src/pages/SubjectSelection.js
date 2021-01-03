import React, { Component } from 'react';
import Appbar from "../components/sharedComponents/appbars/Appbar"
import { withStyles } from '@material-ui/core/styles';
import Subjects from "../components/subjectSelection/Subjects";
import BottomBar from "../components/sharedComponents/appbars/Bottom";
import SubjectHeading from "../components/sharedComponents/headings/PagesForSelection";

const styles = {
    
    container: {
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
    },

    heading: {
        textAlign: "center",
        backgroundColor: "#133366",
        borderRadius: "1% 1%",
        color: "white",
        marginLeft: "10px",
        marginRight: "10px",
        marginTop: "10px",
    },

  };

export class SubjectSelection extends Component{

    render(){
        const { classes } = this.props;

        return(
            <div className={classes.container}>
                <Appbar/>
                <SubjectHeading>Odaberite predmet</SubjectHeading>
                <Subjects 
                    subject={this.props.subject} 
                    chosenYear={this.props.chosenYear} 
                    chosenDepartment={this.props.chosenDepartment}>
                </Subjects>
                <BottomBar/>
            </div>
        )
    }
}

export default withStyles(styles)(SubjectSelection);