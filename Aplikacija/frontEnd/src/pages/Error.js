import React, { Component } from "react";
// import error from "../images/error.jpg"
import Typography from '@material-ui/core/Typography';

const container = {
  flexGrow: 1,
  display: "flex",
  flexDirection: "column",
  backgroundColor: "#164da7",
  color: "white",
  alignItems: "center",
  justifyContent: "center",
};

export class SubjectPresentation extends Component {
  render() {
    const { classes } = this.props;

    return (
    //   <img src={error} alt="Smiley face" height="50%" width="50%"/>
    <Typography variant="h1" style={container}>#404 Stranica nije pronadjena</Typography>
    );
  }
}

export default SubjectPresentation;
