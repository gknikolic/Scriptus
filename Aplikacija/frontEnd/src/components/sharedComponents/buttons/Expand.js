import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import FormatLineSpacing from "@material-ui/icons/FormatLineSpacing";
import {UserContext} from "../../../App";


const styles = {
    color: {
        color: "white",
        "&:hover": {
            background: "#133e86",
        },
        display: "flex",
    },

};

export class Expand extends Component {
   
  

    render() {
        const { classes } = this.props;

        return (
            <UserContext.Consumer>
            {value=>{
                 const {setExpand} = value.functions;
                 
            return(    
             
            <Button className={classes.color} size="small"  onClick={()=>setExpand()} >
                <FormatLineSpacing/>
            </Button>
            
            )
            }}
            </UserContext.Consumer>
        );
    }
}
export default withStyles(styles)(Expand);