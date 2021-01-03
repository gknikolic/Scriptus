import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Settings from "@material-ui/icons/Settings";

const styles = {
    color: {
        color: "white",
        "&:hover": {
            backgroundColor: "#133e86",
        }
    },

};

export class Contact extends Component {

    render() {
        const { classes } = this.props;

        return (
            <Button className={classes.color} size="small" >
                <Settings/>
            </Button>
        );
    }
}

export default withStyles(styles)(Contact);