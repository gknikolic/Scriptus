import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Link} from 'react-router-dom'
import image from "../../../images/home.jpg"

const styles = {
    spacer: {
        display: "flex",
        alignItems: "center",
        justifyContent: "left",
        flexGrow: 1,
        marginRight: 20,
    },
};

export class Scriptus extends Component{
    state = { 
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

        return (
            <Typography  variant="h4" color="inherit" className={classes.spacer} component={Link} to="/">
                <img src={image} alt="Smiley face" height="45" width="45"/>
                {
                    
                    this.state.screenSize > 500 ? "Scriptus" : null
                }
            </Typography>
    );}
    
}

export default withStyles(styles)(Scriptus);