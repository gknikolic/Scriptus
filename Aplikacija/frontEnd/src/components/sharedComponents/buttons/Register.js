import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import RegisterForm from "../dialogs/Register";
import PowerSettingsNew from '@material-ui/icons/PowerSettingsNew';
import Tooltip from '@material-ui/core/Tooltip';

const styles = {
    color: {
        color: "white",
        "&:hover": {
            background: "#133e86",
        },
        display: "flex",
        flexGrow: 1,
    },

    size: {
        width: "100%",
        display: "flex",
        flexDirection: "column"
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
        registrationDialog: false,
        screenSize: window.innerWidth,
    }

    toggleRegistrationDialog = () => this.setState({registrationDialog: !this.state.registrationDialog});

    updateScreenSize = () => this.setState({screenSize: window.innerWidth});

    componentDidMount(){
        window.addEventListener("resize", this.updateScreenSize);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateScreenSize);
      }

    showText = () => {
        const {screenSize} = this.state;
        if(screenSize > 450 || window.location.pathname==="/")
            return "Registracija" 
        else
            return null 
    }

    render(){
        const { classes } = this.props;
        const {screenSize} = this.state;

        return(
            <div className={classes.size}>
                <Tooltip 
                    title={screenSize < 450 && window.location.pathname!=="/" ? "Registracija na sajt" : ""}
                    placement="bottom" 
                    classes={{tooltipPlacementBottom: classes.tooltipPlacementBottom}}
                >
                    <Button  classes={{root: classes.color}} onClick={this.toggleRegistrationDialog}>{ this.showText() }<PowerSettingsNew className={classes.iconPosition}/></Button>
                </Tooltip>
                <RegisterForm open={this.state.registrationDialog} toggleRegistrationDialog={this.toggleRegistrationDialog}/>
                
            </div>  
        )}
}

export default withStyles(styles)(BigMenu);