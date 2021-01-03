import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { Redirect } from 'react-router-dom';   
import AccountCirlce from "@material-ui/icons/AccountCircle";


const styles = {
    color: {
        color: "white",
        "&:hover": {
            background: "#133e86",
            
        },
        display: "flex",
    },

};

export class Account extends Component {
    state = {
        route: null,
    };

    changeRoute = () => {
        let path = window.location.pathname
        if(path!=="/Account")
            this.setState({route: `/Account`})
    }

    render() {
        const { classes } = this.props;
        const {route} = this.state;

        const layout = route !== null ?
        <Redirect  push  to={route}/>
            :
        <Button className={classes.color} onClick={this.changeRoute}>
            <AccountCirlce></AccountCirlce>
        </Button>
                
        return layout;
    }
}

export default withStyles(styles)(Account);





