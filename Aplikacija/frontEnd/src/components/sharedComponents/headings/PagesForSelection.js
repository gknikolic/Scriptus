import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const styles = {
    container: {
        justifyContent: "center",
        backgroundColor: "#133366",
        borderRadius: "1% 1%",
        color: "white",
        margin: "10px 10px 30px 10px",
        paddingTop: "10px",
        paddingBottom: "10px",
        display: "flex",
    },
};

export class ScriptusHeading extends Component{
    state={
        screenSize: window.innerWidth,
    }

    updateScreenSize = () => this.setState({screenSize: window.innerWidth, resizeScreen: true});

    componentDidMount(){
        window.addEventListener("resize", this.updateScreenSize);
        this.checkWordBreak()
    }

    componentDidUpdate(){
        this.checkWordBreak()
    }

    checkWordBreak = () => {
        let text = document.getElementById("heading")
        if(!Array.isArray(this.props.children))
            text.innerHTML = this.props.children
        else
        {
            let height = document.getElementById("heading").clientHeight
            
            if(height===80)
                text.innerHTML = this.props.children
            else
                text.innerHTML = this.props.children[0] + "<br>" + this.props.children[1]
        }
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateScreenSize);
      }
    render(){
        const { classes } = this.props;
        const {screenSize} = this.state; 
        let variant="h2"
        if(screenSize<800)
            variant="h4"
   
        return(
               <Typography variant={variant} id="heading" align="center" className={classes.container}></Typography>
        );}
    
}

export default withStyles(styles)(ScriptusHeading);