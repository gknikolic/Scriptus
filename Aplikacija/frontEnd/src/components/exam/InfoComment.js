import React, { Component } from "react"
import Typography from '@material-ui/core/Typography'
import { withStyles } from "@material-ui/core/styles"
import Button from '@material-ui/core/Button'
import ThumbUpAlt from "@material-ui/icons/ThumbUpAlt"
import ThumbDownAlt from "@material-ui/icons/ThumbDownAlt"
import PriorityHigh from "@material-ui/icons/PriorityHigh"
import {likeExamAnswer} from "../../backendCommunication/communication"
import {unlikeExamAnswer} from "../../backendCommunication/communication"
import LoginFirst from "../sharedComponents/dialogs/LoginFirst"
import Star from "@material-ui/icons/Star"
import Account from "@material-ui/icons/Person"
import {UserContext} from "../../App"; 
import {promoteCommentar} from '../../backendCommunication/communication'

const styles = {

    mainContainer: {
      backgroundColor: "#1a3773",
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

    container3: {
      color: "white",
      display: "flex",
      justifyContent: "center",
      "@media (max-width: 500px)" : {
        flexDirection: "column"
    }
    },

    dateUnder500px: {
      display: "flex",
      color: "white",
      "&:hover": {
          background: " #123b7e",
      },
      paddingTop: "4px",
      "@media (max-width: 500px)" : {
        justifyContent: "center",
      }
    },

    color: {
      color: "white",
      "&:hover": {
          background: " #123b7e",
      },
      paddingTop: "4px",
    },

    spacer: {
      flexGrow: 1,
    }, 

    normalStar: {
      marginTop: "5px",
      marginLeft: "20px",
      color: "white"
    },

    star: {
      marginTop: "5px",
      marginLeft: "20px",
      color: "yellow",

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
      likes: this.props.likes,
      openDialog: false,
      screenSize: window.innerWidth,
      isLiked: this.props.isLiked
    }
  }

  updateScreenSize = () => this.setState({screenSize: window.innerWidth});

  componentDidMount(){
      window.addEventListener("resize", this.updateScreenSize);
  }

  componentWillUnmount() {
      window.removeEventListener("resize", this.updateScreenSize);
  }

  openDialog = () => this.setState({openDialog: true});
  closeDialog = () => this.setState({openDialog: false});


  handleLike = (user) => {
    if(this.props.user===null){
     this.openDialog()
    }
    else{
    fetch(likeExamAnswer, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        }, 
    method: "POST", 
    body: JSON.stringify({username: user, komentar_id: this.props.answerId})
    })
    .then((response)=>response.text())
    .then(response => {
      console.log(response)
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
  if(this.props.user==null){
   this.openDialog()
  }
  else{
  fetch(unlikeExamAnswer, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
      }, 
  method: "POST", 
  body: JSON.stringify({username: user, komentar_id: this.props.answerId})
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

handlePromote(answerId, promoted, setReloadAnswers) {


  console.log(`${promoteCommentar}${promoted ? "unpromote" : "promote"}/${answerId}`)
  
  fetch(`${promoteCommentar}${promoted ? "unpromote" : "promote"}/${answerId}`)
  .then(response => {
    this.setState({promoted: response.promoted})
    setReloadAnswers(true)
  })
}

  render() {
    const { classes } = this.props;
    const { user, date, promoted, answerId} = this.props;
    const { likes, screenSize, isLiked } = this.state;

    let likeColor = "#777b83"
    let unlikeColor = "#777b83"

    if(isLiked===1)
      likeColor = null
    else if(isLiked===-1)
      unlikeColor = null

    // console.log(this.props)
    return (
     
      <UserContext.Consumer>
        {value=>{
          const {username, userType} = value.state; 
          const {setReloadAnswers} = value.functions
        return(
          <div className={classes.mainContainer}> 
                <div className={classes.container}>
                    {
                      (userType === "moderator" || userType === "admin") && promoted?
                      <Button onClick={() => this.handlePromote(this.props.answerId, this.props.promoted, setReloadAnswers)}>
                        <Star className={classes.star}/>
                      </Button> :
                      (
                        userType === "moderator" || userType === "admin" ?
                        <Button onClick={() => this.handlePromote(this.props.answerId, this.props.promoted, setReloadAnswers)}>
                          <Star className={classes.normalStar}/>
                        </Button> 
                        :
                        (
                          promoted ?
                          <Star className={classes.star}/>
                          : null
                        )
                      )

                    }
                    <Button className={classes.color} onClick={()=>this.handleLike(username)} type="small">
                        <ThumbUpAlt style={{color: likeColor}}/>
                      </Button>
                      <Typography variant="h6" color={"inherit"} className={classes.likePosition}>{likes}</Typography>
                      <Button className={classes.color} onClick={()=>this.handleUnlike(username)} type="small">
                        <ThumbDownAlt style={{color: unlikeColor}}/>
                      </Button>
                    { promoted ? null : <div style={{width: "64px"}}></div>}
                    <div className={classes.spacer}></div>
                    {
                        screenSize >=  1200?
                        <div className={classes.container3} >
                          <Button className={classes.color}  size="small"> 
                            <Account/>
                            <Typography variant="h6" color={"inherit"}  >  {user} </Typography>
                          </Button>  
                          <Typography variant="h6" color={"inherit"} className={classes.color} > {date} </Typography>
                        </div>
                        :
                        null
                    }
                    <div className={classes.spacer}></div>
                    { this.state.openDialog ? <LoginFirst open={this.state.openDialog} closeDialog={this.closeDialog}/> : null}
                  {screenSize >1200 ? <div style={{width: "64px"}}></div> : null}
                  {screenSize >1200 ? <div style={{width: "64px"}}></div> : null}
                    <Button className={classes.color}><PriorityHigh/></Button>                     
                </div>
                {
                        screenSize < 1200? 
                        <div className={classes.container3} >
                          <Button className={classes.color}  size="small"> 
                            <Account/>
                            <Typography variant="h6" color={"inherit"}  >  {user} </Typography>
                          </Button>  
                          <Typography variant="h6" color={"inherit"} className={classes.dateUnder500px} > {date} </Typography>
                        </div>
                        :
                        null
                    }
              </div>
              )
            }}
            </UserContext.Consumer>
    )}
}

export default withStyles(styles)(Question);
