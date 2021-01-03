import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Popper from "@material-ui/core/Popper";
import Reorder from "@material-ui/icons/Subject";
import {UserContext} from "../../../App"; 
import { Redirect } from 'react-router-dom';


const styles = {
    color: {
        color: "white",
        "&:hover": {
            background: "#133e86",
        },
        display: "flex",
    },

    paperAlign: {
        display: "flex",
        flexDirection: "column",
        boxShadow: "0px 1px 8px 0px",
        // border: "0.5px solid white"
    },

    poperPosition: {
        marginTop: "9px"
    },

    backgroundColor: {
        backgroundColor: "white",
        borderRadius: "0px",    
        flexGrow: 1,
        borderBottom: "1px solid #164da7",
        color: "#164da7",
        "&:hover": {
            backgroundColor: "#164da7",
          color: "white",
        }
      },

};

export class BigMenu extends Component {
    state = {
        categoryMenu: false,
        categoryPosition: null,
        route: null,
    };

    toggleCategory = e => {
        this.setState({ categoryMenu: !this.state.categoryMenu, categoryPosition: e.currentTarget });
    };


    hideCategory = () => {
        this.setState({ categoryMenu: false });
    };

    changeCategory = (categoryName, categorySetter) => {
        let path = window.location.pathname
        let realCategoryName = categoryName

        let tmp = categoryName.split(" ")
        categoryName = "/"
        tmp.forEach((word, index) => {
            if(index===0)
                categoryName= categoryName+word
            else
                categoryName= categoryName+"%20"+word    
        })

        console.log(path, categoryName, categorySetter)
        console.log(window.location)
        if(path!==categoryName){
            // this.setState({route: categoryName}, categorySetter(realCategoryName) )
            categorySetter(realCategoryName)
                this.setState({route: categoryName}) 
        }

    };

render() {
        const { classes, setCategory} = this.props;
        const { route } = this.state;

        const layout = route !== null ?
        <Redirect  push  to={route}/>
        : 
        <Button className={classes.color} size="small" onClick={this.toggleCategory}>
            <Reorder/>
            <Popper open={this.state.categoryMenu} anchorEl={this.state.categoryPosition} className={classes.poperPosition}>
            <ClickAwayListener onClickAway={this.hideCategory}> 
                    <div className={classes.paperAlign}> 
                        <Button  onClick={()=>this.changeCategory("Arhiva blanketa", setCategory)} className={classes.backgroundColor}>Arhiva blanketa</Button>
                        <Button  onClick={()=>this.changeCategory("Pitanja sa blanketa", setCategory)} className={classes.backgroundColor}>Pitanja sa blanketa</Button>
                        <Button  onClick={()=>this.changeCategory("Skripte", setCategory)} className={classes.backgroundColor}>Skripte</Button>
                        <Button  onClick={()=>this.changeCategory("Ocene profesora", setCategory)} className={classes.backgroundColor}>Ocene profesora</Button>
                        {/* <Button  onClick={()=>this.changeCategory("Lab vezbe", setCategory)} className={classes.backgroundColor}>Lab vezbe</Button>*/}
                        {/* <Button  onClick={()=>this.changeCategory("Novosti", setCategory)} className={classes.backgroundColor}>Novosti</Button> */}
                        <Button  onClick={()=>this.changeCategory("Forum", setCategory)} className={classes.backgroundColor}>Forum</Button>
                        <Button  onClick={()=>this.changeCategory("Simulacija ispita", setCategory)} className={classes.backgroundColor}>Simulacija ispita</Button>
                    </div>
            </ClickAwayListener> 
        </Popper>
        </Button>
                
        return (layout)
          
            
    }
}

export default withStyles(styles)(BigMenu);





