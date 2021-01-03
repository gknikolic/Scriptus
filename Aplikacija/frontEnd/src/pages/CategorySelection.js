import React, { Component } from 'react';
import Appbar from "../components/sharedComponents/appbars/Appbar"
import CategorytHeading from "../components/sharedComponents/headings/PagesForSelection"
import { withStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import { Redirect } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import BottomBar from "../components/sharedComponents/appbars/Bottom";

const styles = {
    
    container: {
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
    },

    backgroundColor: {
        backgroundColor: "#164da7",
        color: "white",
        margin: "0px 20px 10px 20px",
        borderRadius: "5% 5%",
        minHeight: "60px",
        "&:hover": {
          backgroundColor: "#133e86",
        }
      },

    fontType: {
    textTransform: "none",
    },

    spacer: {
        flexGrow: 1,
    },
  };

export class CategorySelection extends Component{
    
    state={
        categoryes: ["Arhiva blanketa", "Pitanja sa blanketa", "Skripte","Ocene profesora", /*"Lab vezbe", "Novosti", */ "Forum", "Simulacija ispita"],
        route: null,
    }

    

    render(){
        const {categoryes, route} = this.state; 
        const { classes } = this.props;

        let handleOnClick = (category, setCategory) => {
            setCategory(category);

            // let delay=null;
            // if(window.innerWidth<600)
            //     delay= 75;

            // setTimeout(() => this.setState({ route: "/SubjectPresentation" }), delay)
            this.setState({ route: "/"+category })
        }

        const layout = route !== null ?
            <Redirect  push  to={route}/>
            : 
        (
            <div className={classes.container}>
                <Appbar/>
                <CategorytHeading>Odaberite kategoriju</CategorytHeading>
                {
                        categoryes.map((category) => 
                        <Button
                            key={category}
                            onClick = {()=>handleOnClick(category, this.props.category)}
                            className = {classes.backgroundColor}
                        >
                            <Typography variant="h4" color="inherit" className={classes.fontType}>{category}</Typography>
                        </Button>
                        )
                    }
                <div className={classes.spacer}></div>
                <BottomBar/>
            </div>
        )
        return layout
    }
}

export default withStyles(styles)(CategorySelection);