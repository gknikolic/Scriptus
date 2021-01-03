import React, { Component } from "react";
import Appbar from "../components/sharedComponents/appbars/Appbar";
import BottomBar from "../components/sharedComponents/appbars/Bottom";
import {UserContext} from "../App"; 
import ChoosenCategory from "../components/sharedComponents/headings/PagesForSelection";
import Viewer from "../components/sharedComponents/fileManager/Viewer"
import PDFReader from "../components/sharedComponents/fileManager/PDFReader";
import FileUploader from "../components/sharedComponents/fileManager/FileUploader"

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
    state = {
      file: null
  }

  chooseReader = (type, url, file) => {
    if(this.state.file!==null)
    {
    if(type==="docx" || type==="doc")
        return <Viewer type={"docx"} url={url}/>
    else if(type==="pdf")
        return <PDFReader file={file}/>    
    // if(type==="docx" || type==="doc" || type==="pdf")
    //     return <Viewer type={type} url={url}/>
    else 
        alert("Uneli ste nevalidan fajl");    
    }
}

  uploadFile = (file) => {
      this.setState({file: file})
  }

  render() {

    const {file} = this.state
    let url = null;
    let fileExtension = null;

    if(file !== null)
    {
        fileExtension = file.name.split(".")[1];
      if(fileExtension==="docx" || fileExtension==="doc" || fileExtension==="pdf")
      {
        url = URL.createObjectURL(file);
      }
    }
    
    return (
     
      <UserContext.Consumer>
        {value=>{
          const {subject, category} = value.state; 

          return (

            
            <div style={container}>
            <Appbar uploadFile={this.uploadFile}/>
            <ChoosenCategory>{category+": "}{subject}</ChoosenCategory>
            <FileUploader/>
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
