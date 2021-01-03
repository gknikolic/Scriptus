import React, { Component } from "react";
import Appbar from "../components/sharedComponents/appbars/Appbar";
import FileUploader from "../components/sharedComponents/fileManager/FileUploader";
import BottomBar from "../components/sharedComponents/appbars/Bottom";
import {UserContext} from "../App"; 
import ChoosenCategory from "../components/sharedComponents/headings/PagesForSelection";


const container = {
  flexGrow: 1,
  display: "flex",
  flexDirection: "column"
};

const centerButton = {
  textAlign: "center",
}

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
            <div style={centerButton}><FileUploader/></div>
            
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
