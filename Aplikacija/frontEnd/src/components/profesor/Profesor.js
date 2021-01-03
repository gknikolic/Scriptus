import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import StarRate from "@material-ui/icons/StarRate";
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AddBox from "@material-ui/icons/AddBox";
import RateDialog from "./RateDialog";
import {UserContext} from "../../App"; 

const styles = {
    
    container: {
        backgroundColor: "#164da7",
        // marginTop: "20px",
        display: "flex",
        marginLeft: "2%",
        marginRight: "2%",
        marginBottom: "20px",
    },

    color: {
        color: "white",
        "&:hover": {
            backgroundColor: "#133e86", 
        },
        "@media (max-width: 550px)" : {
          paddingTop: "48px",
         },
      },

    profesorTextColor: {
        color: "white",
    },

    profesorRate: {
        color: "white",
        display: "flex",
        alignItems: "center",
        marginLeft: "8px",
        "@media (max-width: 550px)" : {
          display: "flex",
          alignItems: "flex-end",
          marginBottom: "3px",
         },
    },
    
    spacer: {
      flexGrow: 1,
    },

    profesorInfo : {
      display: "flex",
      "@media (max-width: 550px)" : {
       flexDirection: "column",
       alignItems: "center",
      },
    },

};

export class ExamPresentation extends Component {

  constructor(props){
    super(props)
    this.state = { 
      loginDialog: false,
      srednja_ocena: this.props.profesor.srednja_ocena,
    } 
}

setRating = (rate) => {
  this.setState({srednja_ocena: rate})
}  


toggleLoginDialog = ()=>{this.setState({loginDialog: !this.state.loginDialog})}

  render() {
    const { classes } = this.props;
    const {fprofesor, ime, prezime, predajeId} = this.props.profesor;
    const {srednja_ocena} = this.state;
          return (

            <UserContext.Consumer>
          {value=>{
            const {username, userType} = value.state; 
            return (
              <div className={classes.container}>
                <div className={classes.spacer}></div>
                <div className={classes.profesorInfo}>
                  <Typography variant="h4" className={classes.profesorTextColor} align="center">{fprofesor +": "}</Typography>
                  <Typography variant="h4" className={classes.profesorTextColor} align="center">{ime +" "+ prezime}</Typography>
                </div>
                 <Typography variant="h5" className={classes.profesorRate} ><StarRate />{srednja_ocena}</Typography>
                <div className={classes.spacer}></div>
                {
                  username ?
                  <Button className={classes.color} onClick={this.toggleLoginDialog}><AddBox/></Button>
                  :
                  null
                }
                 {
                  username ?
                  <RateDialog setRating={this.setRating} open={this.state.loginDialog} predajeId={predajeId} toggleLoginDialog={this.toggleLoginDialog}/>
                  :
                  null
                }
              </div>

            )
          }}
          </UserContext.Consumer>
    );
  }
}

export default withStyles(styles)(ExamPresentation);
