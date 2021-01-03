import React, { Component } from "react";
import Appbar from "../components/sharedComponents/appbars/Appbar";
import ExamPresentation from "../components/exam/ExamPresentation";
import BottomBar from "../components/sharedComponents/appbars/Bottom";
import {UserContext} from "../App"; 
import ChoosenCategory from "../components/sharedComponents/headings/PagesForSelection";
import {examsPath} from "../backendCommunication/communication"
import { withStyles } from '@material-ui/core/styles';
import AddQuestion from "../components/exam/AddQuestionExam"

const container = {
  flexGrow: 1,
  display: "flex",
  flexDirection: "column"
};

const spacer = {
  flexGrow: 1,
};

const styles = {
  button: {
    justifyContent: "flex-end",
    display: "flex",
    marginTop: 20,
    marginRight: 50,
  },
};

export class SubjectPresentation extends Component {

  render() {
    const { classes } = this.props;
    return (
     
      <UserContext.Consumer>
        {value=>{
          const {subject, category, username, reloadQuestions, searchString, department, newQuestion} = value.state; 
          const {setReloadQuestions, setSearchString, setNewQuestion} = value.functions
          const searchRequirements = {
            predmet: subject,
            smer: department,
            username: username,
            searchString: searchString,
          }
          let path = examsPath + subject + "/" + username
          return (
            
            <div style={container}>
            <Appbar />
            <ChoosenCategory>{category+": "}{subject}</ChoosenCategory>
            <div className={classes.button}>
                <AddQuestion/>
              </div> 
            <ExamPresentation setNewQuestion={setNewQuestion} newQuestion={newQuestion} path={path} searchRequirements={searchRequirements} searchString={searchString} setSearchString={setSearchString} reloadQuestions={reloadQuestions} setReloadQuestions={setReloadQuestions}/>
            <div style={spacer}></div>
            <BottomBar/>
            </div>
            )
          }}
          </UserContext.Consumer>
    )
  }
}

export default withStyles(styles)(SubjectPresentation);
