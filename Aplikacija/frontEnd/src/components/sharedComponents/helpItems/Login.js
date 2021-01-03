import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import VpnKey from '@material-ui/icons/VpnKey';
import LoginForm from "./LoginForm"
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

const styles = {
    color: {
        color: "white",
        "&:hover": {
            background: "#133366",
        },
       display: "flex",
       flexGrow: 1,
       justifyContent: "normal",
    },

    container: {
        display: "flex",
    }
};

export class BigMenu extends Component{

    state = { 
        openDialog: false
    }

    openDialog = () => this.setState({openDialog: true});
    closeDialog = () => this.setState({openDialog: false});

    render(){

        const { classes } = this.props;

        return(
            
                <div className={classes.container}>
                    <Button  classes={{root: classes.color}} size="small" onClick={this.openDialog}><VpnKey/>Prijavljivanje</Button>
                    <ClickAwayListener onClickAway={this.closeDialog}>
                    <LoginForm open={this.state.openDialog} toggleLoginDialog={this.closeDialog}/>
                    </ClickAwayListener>
                </div>
        )
    }
}

export default withStyles(styles)(BigMenu);