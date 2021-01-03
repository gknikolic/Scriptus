import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import HelpOutline from "@material-ui/icons/HelpOutline";
import Tooltip from '@material-ui/core/Tooltip';
import Items from "./HelpItems";

const styles =(theme) => ({
    color: {
        color: "white",
        "&:hover": {
            background: "#133e86",
        },
        display: "flex",
        minHeight: "39px",
        flexGrow: 1,
    },

    dividerColor: {
        backgroundColor: "white",
    },

    AppbarLayout: {
        flexGrow: 1,
        display: "flex",
    },

    textAlign: {
        textAlign: "center"
    },

    grow: {
        flexGrow: 1,
    },

    paper: {
        background: "#133e86",
      },

      size: {
        display: "flex",
    },

    tooltipColor: {
        backgroundColor: "black",
    },

    headingColor: {
        color: "white",
        borderBottom: "2px solid white",
        paddingBottom: "2px",
    },

    tooltipPlacementBottom: {
        marginTop: "8px",
    } 
});

export class BigMenu extends Component{

    state = { 
        visibleDrawer: false,
    }

    toggleDrawer = () => this.setState({visibleDrawer: !this.state.visibleDrawer});

    render(){

        const { classes } = this.props;

        return(
            <div className={classes.size}>
                <Tooltip title="Pomoć pri korišćenju sajta" placement="bottom" classes={{tooltipPlacementBottom: classes.tooltipPlacementBottom}}>
                <Button  classes={{root: classes.color}} onClick={this.toggleDrawer}>
                    <HelpOutline/>
                </Button>
                </Tooltip>
                  <Drawer 
                  disableRestoreFocus={true} 
                  open={this.state.visibleDrawer} 
                  ModalProps={{ onBackdropClick: this.toggleDrawer }} 
                  classes={{ paperAnchorLeft: classes.textAlign, paper: classes.paper }}
              >
                  <Typography variant="h4" className={classes.headingColor}>Scriptus</Typography>
                  <Items/>
                  </Drawer>
                  </div>
                
    );}
    
}

export default withStyles(styles)(BigMenu);