import React, { Component } from "react"
import {UserContext} from "../../App"
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper';
import image from "../../images/MaleStudentAvatar.png"
import {adress} from "../../backendCommunication/communication"
import Typography from '@material-ui/core/Typography';
import SubjectPresentation from './FetchForum'

const styles = {
  container: {
    display: "flex",
    flexGrow: 1,
    margin: "2% 2% 0% 2%",
    '@media (max-width: 507px)': {
      flexDirection: "column",
      // justifyContent: "space-between",
      // alignItems: "center"
      
  },
  },

  shadow: {
    // boxShadow: "inset 0 0 10px #000000",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.2) inset",
    padding: 15,
    margin: 20, 
    flexGrow: 1
  },

  spacer: {
    flexGrow: 1,
  },

  leftPart: {
      display: "flex",
      flexDirection: "column",
      borderRight: "1px solid",
      '@media (max-width: 507px)': {
        flexDirection: "row",
        borderBottom: "1px solid"
        
    },
  },

  rightPart: {
    display: "flex",
    flexDirection: "column-reverse",
    flexGrow: 1,

    
    
  },

  imageContainer: {
      width: 230,
      height: 230,
      '@media (max-width: 507px)': {
        width: 50,
        height: 50
    },
  },

  textStyle: {
      textAlign : "left",
  },

  datum: {
    padding: 5,
    display: "flex", 
    justifyContent: "flex-end"
  },

  userInfoConteiner: {
    flexGrow: 1
  },

  userInfo: {
    textAlign: "center",
    '@media (max-width: 507px)': {
      fontSize: "1rem",
      textAlign: "left",
      marginLeft: "1rem"
    },
  },

  poeni: {
    '@media (max-width: 507px)': {
      fontSize: "0.8rem",
      color: "#9e9e9e"
    },
  }

};

export class Comment extends Component {

  render() {
      const {data} = this.props
      console.log(data)
      let path = image
      if(data.userInfo.path!==null)
        path = adress + data.userInfo.path
    

    return (
      <UserContext.Consumer>
        {value=>{
          const { classes } = this.props;
          const {username, userType} = value.state

          return (

            <Paper className={classes.container}>
                <div className={classes.leftPart}>
                    <img src={path} className={classes.imageContainer}></img>
                    <div className={classes.userInfoConteiner}>
                      <Typography variant={"h6"} className={classes.userInfo}>{data.userInfo.user}</Typography>
                      <Typography variant={"h6"} className={`${classes.userInfo} ${classes.poeni}`}>{"poeni " + data.userInfo.points}</Typography>
                    </div>
                </div>
                <div className={classes.rightPart}>
                    <Typography variant={"subheading"} className={classes.datum}>{data.heading.datum}</Typography>
                    {/* <div className={classes.spacer}></div> */}
                    <Typography variant={"h6"} className={classes.shadow}>{data.heading.text}</Typography>
                </div>
            </Paper>
            )}
      }
      </UserContext.Consumer>
    );
  }
}

export default withStyles(styles)(Comment)
