import React, { Component } from "react";
import Appbar from "../components/sharedComponents/appbars/Appbar";
import BottomBar from "../components/sharedComponents/appbars/Bottom";
import {UserContext} from "../App"; 
import ChoosenCategory from "../components/sharedComponents/headings/PagesForSelection";
import {examsArchive} from "../backendCommunication/communication"
import FetchArchives from "../components/archivePresentation/FetchArchives"

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
          let path = examsArchive + subject

          return (
            <div style={container}>
              <Appbar/>
              <ChoosenCategory>{category+": "}{subject}</ChoosenCategory>
              <FetchArchives path={path} />
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
