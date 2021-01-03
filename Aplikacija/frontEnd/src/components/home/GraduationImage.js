import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import image from "../../images/home.jpg"

const styles = {
    
    position: {
        textAlign: "center",
    }
};

export class GraduationImage extends Component{
    render(){

        const { classes } = this.props;

        return(
                <div className={classes.position}>
                    <img src={image} alt="Smiley face" height="300" width="300"/>
                </div>
    );}
    
}

export default withStyles(styles)(GraduationImage);