import React, { Component } from "react";
import {UserContext} from "../../App"; 
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import Folder from "@material-ui/icons/Folder";
import ArrowRight from "@material-ui/icons/KeyboardArrowRight";
import KeyboardArrowDown from "@material-ui/icons/KeyboardArrowDown";
import InsertDriveFile from "@material-ui/icons/InsertDriveFile";
import Image from "@material-ui/icons/Image";
import {requireFile} from "../../backendCommunication/communication"

const styles = {

    folderParent: {
        display: "flex",
        flexGrow: 1,
        justifyContent: "center",
        "@media (min-width: 317px) and (max-width: 475px)" : {
          justifyContent: "flex-start",
        },
        flexBasis: "200px",
    },

    structureDirection: {
        display: "flex",
        flexDirection: "column",
    },

    documentInfo: {
        width: "200px",
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "normal",
    },

    documentColor: {
        color: "#133366"
    },
  };

export class SubjectPresentation extends Component {

  state = {
      toggleArrow: false,
      fileRequest: false,
      fileRequestId: null,
      file: null,
  }  
  
  handleClick = () => {
    this.setState({toggleArrow: !this.state.toggleArrow})
  }

  requireFile = (id) => {
    if(this.state.file===null){
    this.setState({fileRequest: true, fileRequestId: id},()=> {
      if(this.state.fileRequest===true){
        
        fetch(requireFile + this.state.fileRequestId)
        .then((response)=> response.json()) 
        .then(response => {
          if(response.result===0) //nema nista
            this.setState({emptyPage: true, fileRequest: false})
          else
            this.props.setFile(response)
            // this.setState({file: response})
          
        })
        .catch(err=>{
          this.setState({loadingError: true})
        })
      }

    })}
    else
      this.setState({file: null})
  }

  render() {
    const { classes } = this.props;
    const {toggleArrow, file} = this.state;
    // console.log(file)
       
  

    return (
     
      <UserContext.Consumer>
        {value=>{
          const {subject, category} = value.state; 
          const {data, year} = this.props.file;  

          return (
           
                <div className={classes.folderParent}>
                    <div className={classes.structureDirection}> 
                        <Button onClick={this.handleClick}>
                            <Folder/> { toggleArrow ? <KeyboardArrowDown/> : <ArrowRight/> }
                            {year}
                        </Button>
                        {
                          toggleArrow ?
                          data.map((exam, index) => 
                          <div key={index} style={{textAlign: "center"}}>
                          <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>  
                              <Button  className={classes.documentInfo} onClick={()=>this.requireFile(exam.id)}>
                            {
                              (exam.je_slika===1) ? 
                              <Image className={classes.documentColor} onClick={()=>this.requireFile(exam.id)}/> 
                              : 
                              <InsertDriveFile className={classes.documentColor}/>
                            }
                              <div>
                              {exam.naslov}</div> 
                              </Button>
                          </div>
                          </div>
                          )
                          :
                          null
                        }
                    </div>
                </div>
                
            )
          }}
          </UserContext.Consumer>
    )
  }
}

export default withStyles(styles)(SubjectPresentation);
