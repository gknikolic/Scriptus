import React, { Component } from "react";
import Appbar from "../components/sharedComponents/appbars/Appbar";
import ProfesorPresentation from "../components/profesor/ProfesorPresentation";
import BottomBar from "../components/sharedComponents/appbars/Bottom";
import {UserContext} from "../App"; 
import ChoosenCategory from "../components/sharedComponents/headings/PagesForSelection";


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

          return (

            
            <div style={container}>
            <Appbar />
            <ChoosenCategory>{category+": "}{subject}</ChoosenCategory>
            <ProfesorPresentation subject={subject}/>
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
