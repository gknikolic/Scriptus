import React, { Component } from "react";
import {UserContext} from "../../App"; 
import { withStyles } from "@material-ui/core/styles";
import AddButton from "./AddButton"
import Archive from "./Archive"
import Viewer from "../sharedComponents/fileManager/Viewer"
import PDFReader from "../sharedComponents/fileManager/PDFReader"
import PageLoader from "../sharedComponents/PageLoader";
import PhotosExplorer from "../sharedComponents/PhotosExplorer";
import {adress} from "../../backendCommunication/communication"

const styles = {

    container: {
      backgroundColor: "#fafafa",
      paddingLeft: "5px",
    },

    color: {
        color: "#282828",
        display: "flex",
    },

    button: {
        justifyContent: "flex-end",
        display: "flex",
        marginTop: 20,
        marginRight: 50,
    },

    foldersContainer: {
        margin: "0% 10% 0% 10%",
        display: "flex",
        flexWrap: "wrap",
    },

    folderParent: {
        display: "flex",
        flexGrow: 1,
        justifyContent: "center",
        "@media (min-width: 230px) and (max-width: 337px)" : {
          justifyContent: "flex-start",
        },
    },
  };

export class SubjectPresentation extends Component {
    state = {
      files: null,
      loadingError: false,
      emptyPage: false,
      uploadedFile: null,
  }

  setFile = (uploadedFile) => {
    if(this.state.uploadedFile===null)
      this.setState({uploadedFile: uploadedFile})
  }

  chooseReader = (type, url, file) => {                     
    if(file!==null)
    {
    if(type==="docx" || type==="doc")
        return <Viewer type={"docx"} url={url}/>
    else if(type==="pdf")
        return <PDFReader file={file}/>    
    else 
        alert("Uneli ste nevalidan fajl");    
    }
  }

  fetchData = () => {
    fetch(this.props.path)
    .then((response)=> response.json()) 
    .then(response => {
  
      if(response.result===0) //nema nista
        this.setState({emptyPage: true})
      else
        this.setState({files: response})
    })
    .catch(err=>{
      this.setState({loadingError: true})
    })
  }

  componentDidMount(){
     this.fetchData()
  }

  showMaterial = (file) => {
    return file.map((f, index) => {
      // console.log(f.je_slika)
      let photo = adress + f.path
      console.log(photo)

      if(f.je_slika===1)
        return <img src={photo} key={index} />  
      else
        return <div>aaaaaaaaaa</div>  

     console.log("dadadadadadadadadaad")   
    })
  } 

  render() {
    const { classes } = this.props;
    const {files, uploadedFile} = this.state
    // const file = uploadedFile
    // let url = null;
    // let fileExtension = null;

    // if(file !== null)
    // {
    //     fileExtension = file.name.split(".")[1];
    //   if(fileExtension==="docx" || fileExtension==="doc" || fileExtension==="pdf")
    //   {
    //     url = URL.createObjectURL(file);
    //   }
    // }

    return (

      <div>
        <div className={classes.button}>
          <AddButton upload={this.setFile}/>
        </div>

        { this.state.files!==null ?

          <div style={{textAlign: "center"}} onClick={()=>{if(this.state.uploadedFile!==null) this.setState({uploadedFile: null})}}>

              <div className={classes.foldersContainer}>
                {files!==null ? 
                files.map((file, index) => 
                    <Archive file={file} key={index} setFile={this.setFile}/>
                )
                :
                null}
              </div>
              {uploadedFile !== null? this.showMaterial(uploadedFile) : null}
              
              {/* // this.chooseReader(fileExtension, url, file) :  */}
          </div>

        :

        <PageLoader loadingError={this.state.loadingError} emptyPage={this.state.emptyPage}/>}
      </div>
      )
          
  }
}

export default withStyles(styles)(SubjectPresentation);
