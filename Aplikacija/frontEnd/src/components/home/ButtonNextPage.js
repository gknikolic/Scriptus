import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom'

const styles = {
    color: {
        background: "#164da7",
        color: "white", 
        "&:hover": {
            background: "#133e86",
        }
    },

    container: {
        textAlign: "center",
        paddingBottom: "5px",
    },

};

export class ButtonNextPage extends Component{

    render(){

        const { classes } = this.props;
   
        return(
           
                <div className={classes.container}>
                    <Button classes={{root: classes.color}} component={Link} to="/YearSelection" >Nastavi sa korišćenjem sajta</Button>
                </div>
    );}
    
}

export default withStyles(styles)(ButtonNextPage);