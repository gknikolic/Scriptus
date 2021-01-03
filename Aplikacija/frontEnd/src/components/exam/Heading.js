import React, { Component } from "react";
import Typography from '@material-ui/core/Typography';
import { withStyles } from "@material-ui/core/styles";

const styles = {

    container: {
        backgroundColor: "#164da7",
    },

    textFormat: {
        textAlign: "center",
        borderBottom: "3px solid #164da7",
        color: "white",
    }
}

export class Question extends Component {

  render() {
    const { classes } = this.props;
    const {year, exam, number, text } = this.props.data;
  
    return (
        <div className={classes.container}>
            <Typography variant="h6" className={classes.textFormat}> {year + " " + exam } </Typography>
            <Typography variant="h6" className={classes.textFormat}> {number + ": " + text} </Typography>
        </div>
  );
  }
}

export default withStyles(styles)(Question);
