import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import {UserContext} from "../../../App";
import { Link } from 'react-router-dom';   
import DirectionsRun from "@material-ui/icons/DirectionsRun";
import Tooltip from '@material-ui/core/Tooltip';


const styles = {
    color: {
        color: "white",
        "&:hover": {
            background: "#133e86",
        },
        display: "flex",
    },

    tooltipPlacementBottom: {
        marginTop: "8px",
    } 
};

export class BigMenu extends Component {

    logOut = (functions) => {
        
        // fetch(register, {
        //     headers: {
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json'
        //         }, 
        //     method: "POST", 
        //     body: JSON.stringify(
        //         {
        //             username: document.getElementById("username").value, 
        //             password: document.getElementById("password").value,
        //             email: document.getElementById("email").value,
        //         })
        // })

        functions.setYear(null);
        functions.setDepartment(null);
        functions.setSubject(null);
        functions.setCategory(null);
        functions.setLoggedOn(false);
        functions.setUserName(null);
        functions.setUserType(null);
        localStorage.clear();


    }

    render() {
        const { classes } = this.props;

        return (
            <UserContext.Consumer>
            {value=>{
            const {functions} = value;

            return (
                <Tooltip title="Odjavljivanje sa sajta" placement="bottom" classes={{tooltipPlacementBottom: classes.tooltipPlacementBottom}}>
                <Button component={Link} to="/" className={classes.color} onClick={()=>this.logOut(functions)}>
                    <DirectionsRun/>
                </Button>
                </Tooltip>
                  )  
            }}
            </UserContext.Consumer>
        );
    }
}

export default withStyles(styles)(BigMenu);





