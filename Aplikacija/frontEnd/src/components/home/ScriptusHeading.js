import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const styles = {

    container: {
        textAlign: "center",
        // color: "white",
        // paddingBottom: "20px",
        margin: "20px 10px 20px 10px",
    },

};

export class ScriptusHeading extends Component{
    state={
        screenSize: window.innerWidth,
    }

    updateScreenSize = () => this.setState({screenSize: window.innerWidth});

    componentDidMount(){
        window.addEventListener("resize", this.updateScreenSize);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateScreenSize);
      }
    render(){
        const { classes } = this.props;
        const {screenSize} = this.state; 

        let variant="h1"
        if(screenSize<500)
            variant="h2"
            
        return(
            <Typography variant={variant} className= {classes.container}>
                       Scriptus
            </Typography>
               
            
    );}
    
}

export default withStyles(styles)(ScriptusHeading);