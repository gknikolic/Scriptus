import React, { Component } from "react";
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Viewer from "./Viewer"
import PDFReader from "./PDFReader";

export class UploadButton extends Component {
    constructor(props)
    {
        super(props)
        this.inputRef = React.createRef();
    }

    state = {
        file: null
    }

    uploadFile = (e) => {
        if(e.target.files[0]!=null)
        {
            this.setState({
                file: e.target.files[0]
            })
        }
    }

    fileBrowser = () => {
        this.inputRef.current.click();
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
        <div>
        <Button variant="contained" onClick={this.fileBrowser}>
            Upload
        <CloudUploadIcon/>
        </Button>
        <input type="file" ref={this.inputRef} style={{display: "none"}} onChange={this.uploadFile} accept=".pdf, .doc*"/>
        {this.chooseReader(fileExtension, url, file)}
        </div>
    );
    }
}
export default UploadButton

