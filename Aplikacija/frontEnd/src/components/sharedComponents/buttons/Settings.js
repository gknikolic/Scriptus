import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
import Settings from "@material-ui/icons/Settings";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import { MenuItem } from "@material-ui/core";
import PriorityHigh from "@material-ui/icons/PriorityHigh"
import Add from "@material-ui/icons/AddCircle"
import DeleteQuestion from "./DeleteQuestion"
import {UserContext} from "../../../App"; 

const styles = {
    color: {
        color: "white",
        "&:hover": {
            background: "#164da7",
        },
    },

    backgroundColor: {
        flexGrow: 1,
        borderBottom: "1px solid #164da7",
        color: "#164da7",
        "&:hover": {
          background: "#164da7",
          color: "white",
          borderRadius: "0px"
        },
      },

    paperBorder: {
        border: "1px solid #164da7",
        borderRadius: "0px",
    },

    spacer: {
        flexGrow: 1,
    }
};

export class Question extends Component {

    state = {
        categoryMenu: false,
        categoryPosition: null,
        openDialog: false,
    };

    toggleCategory = e => {
        this.setState({ categoryMenu: !this.state.categoryMenu, categoryPosition: e.currentTarget });
    };

    openDialog = () => this.setState({openDialog: true});
    closeDialog = () => this.setState({openDialog: false});

    hideCategory = () => {
        this.setState({ categoryMenu: false });
    };

  render() {
    const { classes } = this.props;

    
    return (
     
        <UserContext.Consumer>
          {value=>{
            const {userType} = value.state; 

          return(
              <div>
                 <Button className={classes.color} size="small" onClick={this.toggleCategory}><Settings/>
                  <Popper open={this.state.categoryMenu} placement={"bottom-end"} anchorEl={this.state.categoryPosition} >
                    <ClickAwayListener onClickAway={this.hideCategory}> 
                            <Paper className={classes.paperBorder}> 
                                <MenuItem onClick={this.props.createNewAnswer} className={classes.backgroundColor}> Dodaj odgovor <div className={classes.spacer}></div><Add/></MenuItem>
                                {/* <MenuItem onClick={()=>console.log("darjan")} className={classes.backgroundColor}>  Prijavi administratoru <div className={classes.spacer}></div><PriorityHigh/></MenuItem> */}
                               {
                                userType==="moderator" || userType==="admin" ? 
                                <MenuItem onClick={this.openDialog} className={classes.backgroundColor}>  Obrisi pitanje <div className={classes.spacer}></div><PriorityHigh/></MenuItem>
                                :
                                null
                            }
                            </Paper>
                    </ClickAwayListener> 
                </Popper>
                 </Button>
                 <DeleteQuestion questionId={this.props.id} open={this.state.openDialog} close={this.closeDialog}/>
                 </div>
          )
          }}
          </UserContext.Consumer>
        )
  }
}

export default withStyles(styles)(Question);
