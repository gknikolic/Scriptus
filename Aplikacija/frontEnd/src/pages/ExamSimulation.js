import React, { Component } from "react";
import Appbar from "../components/sharedComponents/appbars/Appbar";
import ExamSimulation from "../components/exam/ExamPresentation";
import BottomBar from "../components/sharedComponents/appbars/Bottom";
import {UserContext} from "../App"; 
import ChoosenCategory from "../components/sharedComponents/headings/PagesForSelection";
import {examSimulation} from "../backendCommunication/communication"

const container = {
  flexGrow: 1,
  display: "flex",
  flexDirection: "column"
};

const spacer = {
  flexGrow: 1,
}

export class SubjectPresentation extends Component {

  render() {
    
    return (
     
      <UserContext.Consumer>
        {value=>{
          const {subject, category} = value.state; 
          let path = examSimulation + subject

          return (
            
            <div style={container}>
            <Appbar />
            <ChoosenCategory>{category+": "}{subject}</ChoosenCategory>
            <ExamSimulation path={path}/>
            <div style={spacer}></div>
            <BottomBar/>
            </div>
            )
          }}
          </UserContext.Consumer>
    )
  }
}

export default SubjectPresentation;
