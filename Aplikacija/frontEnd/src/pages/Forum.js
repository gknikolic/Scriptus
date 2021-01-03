import React, { Component } from "react";
import Appbar from "../components/sharedComponents/appbars/Appbar";
import BottomBar from "../components/sharedComponents/appbars/Bottom";
import {UserContext} from "../App"; 
import { withStyles } from '@material-ui/core/styles';
import ChoosenCategory from "../components/sharedComponents/headings/PagesForSelection";
import AddButton from "../components/forum/AddButton"
import {forum} from "../backendCommunication/communication"
import FetchForum from "../components/forum/FetchForum"



const container = {
  flexGrow: 1,
  display: "flex",
  flexDirection: "column"
};

const spacer = {
  flexGrow: 1,
}


const styles = {
  button: {
    justifyContent: "flex-end",
    display: "flex",
    marginTop: 20,
    marginRight: 50,
  },

};

export class Forum extends Component {

  render() {
    
    const { classes } = this.props;

    return (
     
      <UserContext.Consumer>
        {value=>{
          const {subject, category, reloadForum} = value.state; 
          const {setReloadForum} = value.functions
          let path = forum + subject
          return (

            <div style={container}>
              <Appbar />
              <ChoosenCategory>{category+": "}{subject}</ChoosenCategory>
              <FetchForum path={path} reloadForum={reloadForum} setReloadForum={setReloadForum}/>
              <div className={classes.button}>
                <AddButton />
              </div>
             <div style={spacer}></div>
            <BottomBar/>
            </div>
            )
          }}
          </UserContext.Consumer>
    )
  }
}

export default withStyles(styles)(Forum);
