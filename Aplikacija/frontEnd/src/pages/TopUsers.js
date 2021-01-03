import React, { Component } from "react"
import Appbar from "../components/sharedComponents/appbars/Appbar"
import {UserContext} from "../App"
import TopUsersHeading from "../components/sharedComponents/headings/PagesForSelection"
import { withStyles } from '@material-ui/core/styles'
import BottomBar from "../components/sharedComponents/appbars/Bottom";
import TopUsers from "../components/topusers/TopUsers"

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
            <TopUsersHeading>{"Promocije"}</TopUsersHeading>
            <TopUsers/>
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
