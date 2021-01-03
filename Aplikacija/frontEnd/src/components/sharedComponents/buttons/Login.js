import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import LoginForm from "../dialogs/Login";
import VpnKey from '@material-ui/icons/VpnKey';
import Tooltip from '@material-ui/core/Tooltip';

const styles = {
    color: {
        color: "white",
        "&:hover": {
            background: "#133e86",
        },
        display: "flex",
    },

    size: {
        width: "100%",
        display: "flex",
    },

    tooltipPlacementBottom: {
        '@media (max-width: 507px)': {
            marginTop: "8px",
        },

        '@media (min-width: 508px) and (max-width : 599px)' : {
            marginTop: "4px",
        },

        '@media (min-width: 600px)': {
            marginTop: "12px",
        },
    },

    iconPosition: {
        marginLeft: "5px",
    }



};

export class BigMenu extends Component{

    state = { 
        loginDialog: false,
        screenSize: window.innerWidth,
    }

    updateScreenSize = () => this.setState({screenSize: window.innerWidth});

    componentDidMount(){
        window.addEventListener("resize", this.updateScreenSize);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateScreenSize);
      }

    toggleLoginDialog = () => this.setState({loginDialog: !this.state.loginDialog});

    showText = () => {
        const {screenSize} = this.state;
        if(screenSize > 750 )
            return "Prijavljivanje" 
        else
            return null 
    }

    render(){
        const { classes } = this.props;
        const {screenSize} = this.state;

        return(
                <div className={classes.size}>
                    <Tooltip 
                        title={ screenSize < 750 ? "Prijavljivanje na sajt" : ""}
                        placement="bottom" 
                        classes={{tooltipPlacementBottom: classes.tooltipPlacementBottom}}
                    >
                    <Button  classes={{root: classes.color}} onClick={this.toggleLoginDialog}>{this.showText()}<VpnKey className={classes.iconPosition}/></Button>
                    </Tooltip>
                    <LoginForm open={this.state.loginDialog} toggleLoginDialog={this.toggleLoginDialog}/>
                </div>
        )
    }
}

export default withStyles(styles)(BigMenu);