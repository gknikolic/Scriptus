import React, { Component } from "react"
import Appbar from "../components/sharedComponents/appbars/Appbar"
import {UserContext} from "../App"
import UserHeading from "../components/sharedComponents/headings/PagesForSelection"
import { withStyles } from '@material-ui/core/styles'
import Info from "../components/account/Info"
import BottomBar from "../components/sharedComponents/appbars/Bottom";


const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
  },

  spacer: {
    flexGrow: 1,
  }
};

export class SubjectPresentation extends Component {

  render() {
    return (
      <UserContext.Consumer>
        {value=>{
          const { classes } = this.props;
          const {username, userType, profileView} = value.state
          let path = window.location.pathname
          let name = path === "/ProfileView" ? profileView : username
          return (

            <div className={classes.container}>
            <Appbar />
            <UserHeading >{"Profil korisnika"}</UserHeading>
            <Info username={name}/>
            <div className={classes.spacer}></div>
            <BottomBar/>
            </div>
            )}
      }
      </UserContext.Consumer>
    );
  }
}

export default withStyles(styles)(SubjectPresentation)
