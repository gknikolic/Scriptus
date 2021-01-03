import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import AddPhotoAlternate from "@material-ui/icons/AddPhotoAlternate"
import {addExamAnswer} from "../../backendCommunication/communication"
import PhotosExplorer from "../sharedComponents/PhotosExplorer"
import {UserContext} from "../../App"; 

const styles = {
    color: {
        color: "white",
        "&:hover": {
            background: "#133366",
        },
    },

    textArea: {
        width: "100%",
        resize: "vertical",
        boxSizing: "border-box",
        fontSize: "1.25rem",
        fontFamily: "Roboto, Helvetica, Arial, sans-serif",
        fontWeight: 500,
        lineHeight: 1.6,
        letterSpacing: "0.0075em",
      },
    
      controlLine: {
        backgroundColor: "#164da7",
        marginTop: -4,
        display: "flex",
      },

      spacer: {
          flexGrow: 1,
      },

      imageColor: {
        backgroundColor: "white",
      }
};

export class BigMenu extends Component{

    constructor(props)
    {
        super(props)
        this.inputRef = React.createRef();
        this.positionRef1 = React.createRef();
    }

    state = {
        images: [],
    }

    fileBrowser = () => {
        this.inputRef.current.click();
    }

    uploadFile = (e) => {

        if(e.target.files[0]){
            let listOfFiles = []

            for(let i=0; i<this.state.images.length; i++){
                listOfFiles.push(this.state.images[i])
            }

            for(let i=0; i<e.target.files.length; i++){
                listOfFiles.push(e.target.files[i])
            }

            this.setState({
                images: listOfFiles
            })
        }
    }

    
    handleSumbmit = (setNewQuestion) => {
        const {images} = this.state;
        let text = document.getElementById("answer").value;
        const {answerId} = this.props;
        const {user} = this.props
        // this.props.user
        // console.log(images)

        let formData  = new FormData();

        formData.append("materialId", answerId)
        formData.append("answer", text)
        formData.append("user", user)

        for(let i = 0; i < images.length; i++) {
          formData.append("files", images[i])
        }

        fetch(addExamAnswer, {
              body: formData,
              method: "post",
          })
          .then(response => response.text())
          .then(res => {console.log(res)
          setNewQuestion(true)
          })
          .catch(err => console.log(err))
    }

    componentDidMount(){
        
        let element = this.positionRef1.current
        window.scrollTo(element.offsetLeft, element.offsetTop - window.innerHeight/4)
    }

    render(){
        const { classes } = this.props;
        const { images } = this.state;
        

    return (
        <UserContext.Consumer>
        {value=>{
          const {subject, category} = value.state; 
          const {setNewQuestion} = value.functions

        return(
                
                <div ref={this.positionRef1}>
                    <PhotosExplorer images={images} localUpload />
                    <textarea style={{height: window.innerHeight/2}} id="answer" className={classes.textArea}/> 
                    <div className={classes.controlLine}>
                        <Button className={classes.color} onClick={this.fileBrowser}><AddPhotoAlternate/></Button>
                        <div className={classes.spacer}></div>
                        <Button className={classes.color} onClick={()=>this.handleSumbmit(setNewQuestion)}>Potvrdi</Button>
                        <Button className={classes.color} onClick={this.props.createNewAnswer}>Odustani</Button>
                    </div>
                    <input type="file" ref={this.inputRef} style={{display: "none"}} onChange={this.uploadFile} multiple/>
                </div>
        )}}
         </UserContext.Consumer>)
    }
}

export default withStyles(styles)(BigMenu);