import React, { Component } from "react"
import Typography from '@material-ui/core/Typography'
import { withStyles } from "@material-ui/core/styles"
import Button from '@material-ui/core/Button'
import ThumbUpAlt from "@material-ui/icons/ThumbUpAlt"
import ThumbDownAlt from "@material-ui/icons/ThumbDownAlt"
import ArrowDownward from "@material-ui/icons/ArrowDownward"
import ArrowUpward from "@material-ui/icons/ArrowUpward"
import Settings from "../sharedComponents/buttons/Settings"
import {likeExamQuestion} from "../../backendCommunication/communication"
import {unlikeExamQuestion} from "../../backendCommunication/communication"
import LoginFirst from "../sharedComponents/dialogs/LoginFirst"
import HowToReg from "@material-ui/icons/HowToReg"
import {UserContext} from "../../App"; 
import { Redirect } from 'react-router-dom';   

const styles = {

    mainContainer: {
      backgroundColor: "#164da7",
    },

    container: {
        color: "white",
        display: "flex",
        paddingTop: "3px",
        borderTop: "1px solid white",
    },

    container2: {
      color: "white",
      display: "flex",
      justifyContent: "center",
  },

    color: {
      color: "white",
      "&:hover": {
          background: "#164da7",
      },
    },

    spacer: {
      flexGrow: 1,
    }, 

    star: {
      marginTop: "5px",
      marginLeft: "5px",
    },

    userInfo: {
      paddingTop: "4px",
      backgroundColor: "#164da7",
      color: "white",
    },

    userColor: {
      color: "black",
    },

    likePosition: {
      display: "flex",
      alignItems: "center",
    }
}

export class Question extends Component {

  constructor(props)
  {
    super(props);

    this.state = {
      toggleArrows: false,
      expand: this.props.expand,
      likes: this.props.likes,
      openDialog: false,
      screenSize: window.innerWidth,
      isLiked: this.props.isLiked,
      route: null,
    }
  }

  updateScreenSize = () => this.setState({screenSize: window.innerWidth});

  componentDidMount(){
      window.addEventListener("resize", this.updateScreenSize);
  }

  componentWillUnmount() {
      window.removeEventListener("resize", this.updateScreenSize);
  }



  handleExpand = () => {
    this.setState({toggleArrows: !this.state.toggleArrows})
    this.props.setExpandOnArrow(!this.state.toggleArrows);
  } 

  openDialog = () => this.setState({openDialog: true});
  closeDialog = () => this.setState({openDialog: false});

  static getDerivedStateFromProps(props, current_state) {
      
      if (current_state.expand !== props.expand) {
        props.setExpandOnArrow(props.expand);
        return {
          toggleArrows: props.expand,
          expand: props.expand,
        }
      }
      else
        return null
  }

  handleLike = (user) => {
    if(this.props.username==null){
     this.openDialog()
    }
    else{
    fetch(likeExamQuestion, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        }, 
    method: "POST", 
    body: JSON.stringify({username: user, materijal_id: this.props.answerId})
    })
    .then((response)=>response.text())
    .then(response => {
      // console.log(response)
      if(response > this.state.likes)
      this.setState({
       likes: response,
       isLiked: 1
      })
      else
      this.setState({
        likes: response,
        isLiked: 0
       })

    })
    .catch(err => console.log(err))
  }
}

handleUnlike = (user) => {
  if(this.props.username==null){
   this.openDialog()
  }
  else{
  fetch(unlikeExamQuestion, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
      }, 
  method: "POST", 
  body: JSON.stringify({username: user, materijal_id: this.props.answerId})
  })
  .then((response)=>response.text())
  .then(response => {
    // console.log(response)
    if(response < this.state.likes)
    this.setState({
     likes: response,
     isLiked: -1
    })
    else
    this.setState({
      likes: response,
      isLiked: 0
    })
  })
  .catch(err => console.log(err))
}
}


viewProfile = (user, setProfileView) => {
  this.setState({route: `/ProfileView`}, setProfileView(user))
}

  render() {
    const { classes } = this.props;
    const { user, date, username} = this.props;
    const { likes, toggleArrows, screenSize, isLiked, route} = this.state;
  
    let likeColor = "#777b83"
    let unlikeColor = "#777b83"

    if(isLiked===1)
      likeColor = null
    else if(isLiked===-1)
      unlikeColor = null


    

      const layout = route !== null ?
      <Redirect  push  to={route}/>
          :
      <UserContext.Consumer>
        {value=>{
          const {subject, category} = value.state; 
          const {setProfileView} = value.functions;

          return(
            <div className={classes.mainContainer}> 
              <div className={classes.container}>
              
                  <Button className={classes.color} onClick={()=>this.handleLike(username)} type="small">
                    <ThumbUpAlt style={{color: likeColor}}/>
                  </Button>
                  <Typography variant="h6" color={"inherit"} className={classes.likePosition}>{likes}</Typography>
                  <Button className={classes.color} onClick={()=>this.handleUnlike(username)} type="small">
                    <ThumbDownAlt style={{color: unlikeColor}}/>
                  </Button>
                 
                  <div className={classes.spacer}></div>
                  {
                    screenSize >= /*673*/ 800?
                    <div className={classes.container2} >
                      <Button className={classes.userInfo}  size="small" onClick={()=>this.viewProfile(user, setProfileView)}> 
                       <HowToReg/>
                        <Typography variant="h6" color={"inherit"}> {user} </Typography>
                      </Button>     
                      <Typography variant="h6" color={"inherit"} className={classes.userInfo} > {date} </Typography>
                    </div> 
                    : 
                    null
                  }
                  <div className={classes.spacer}></div>
                  <Button className={classes.color} onClick={this.handleExpand}>{ toggleArrows ? <ArrowUpward/> : <ArrowDownward/>}</Button>
                  <Settings createNewAnswer={this.props.createNewAnswer} id={this.props.answerId}/>
                  { this.state.openDialog ? <LoginFirst open={this.state.openDialog} closeDialog={this.closeDialog}/> : null}
              </div> 
              {  
                screenSize < /*673*/ 800 ?
                <div className={classes.container2} >
                   <Button className={classes.userInfo}  size="small" onClick={()=>this.viewProfile(user, setProfileView)}> 
                  <HowToReg/>
                    <Typography variant="h6" color={"inherit"}>  {user} </Typography>
                  </Button>  
                  <Typography variant="h6" color={"inherit"} className={classes.userInfo} > {date} </Typography>
                </div> 
                :
                null
              }
            </div>  
          )
            }}</UserContext.Consumer>

    return ( layout)
  }
}

export default withStyles(styles)(Question);
