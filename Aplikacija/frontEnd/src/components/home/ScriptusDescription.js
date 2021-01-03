import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const styles = {

    container: {
        color: "white",
        backgroundColor: "#164da7",
        borderRadius: "10% 0%",
        paddingTop: "8px",
        paddingBottom: "8px",
        textAlign: "justify",
        paddingLeft: "15px",
        paddingRight: "15px",
        "@media (max-width: 500px)" : {
            borderRadius: "10% 10%",
        }
    },

    paperSize: {
        margin: "0% 10% 0% 10%",
    }
    
};

export class ScriptusDescription extends Component{
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

        return(
                <Typography variant="h5" className= {classes.container}>
                    Nastao je kao potreba da se svi materijali
                    potrebni za spremanje ispita na Elektronskom
                    fakultetu nađu na jednom mestu. Svu dostupnu literaturu na sajtu obezbedili su studenti 
                    Elektronskog fakulteta. Ukoliko vam materijali koje 
                    ovde nađete pomognu u pripremi ispita ocenite ih kako bi 
                    drugim studentima olakšali spremanje.
                </Typography>
            
    );}
    
}

export default withStyles(styles)(ScriptusDescription);