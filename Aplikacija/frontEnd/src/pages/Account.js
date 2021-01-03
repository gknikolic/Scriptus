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
          const {username, userType} = value.state

          return (

            <div className={classes.container}>
            <Appbar />
            <UserHeading>{"Profil korisnika"}</UserHeading>
            <Info username={username} />
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
