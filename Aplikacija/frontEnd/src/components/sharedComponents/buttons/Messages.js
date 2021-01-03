import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Email from "@material-ui/icons/Email";
import { Link} from 'react-router-dom'

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

    render() {
        const { classes } = this.props;
      
        return (
        <Button 
        className={classes.color} 
        component={Link} 
        to="/Messages" 
        >
            <Email/>
        </Button>
        )
    }
}

export default withStyles(styles)(Account);





