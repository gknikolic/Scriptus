import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Popper from "@material-ui/core/Popper";
import { Redirect } from 'react-router-dom';
import School from "@material-ui/icons/School";
import {UserContext} from "../../../App"; 
import { Link} from 'react-router-dom'


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
        boxShadow: "0px 1px 10px 0px",
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

    poperPosition: {
        marginTop: "9px"
},

};

export class BigMenu extends Component {
    state = {
        open: false,
        position: null,
        route: null,
    };

    toggleMenu = e => {
        this.setState({ open: !this.state.open, position: e.currentTarget });
    };

    hideMenu = () => {
        this.setState({ open: false });
    };

    changeRoute = (route, AppState) => {
        // this.setState({route: route})
        // console.log(AppState)
        const {yearOfStudy, department, category, subject} = AppState
        let path = window.location.pathname
        if(route!==path){
            if(yearOfStudy===null) 
                this.setState({route: "/YearSelection"})
            else if(yearOfStudy==="Prva godina" && department===null)
                this.setState({route: "/SubjectSelection"})
            else if(department===null)    
                this.setState({route: "/DepartmentSelection"})
            else if(subject===null)
                this.setState({route: "/SubjectSelection"})
            else  
                this.setState({route: "/CategorySelection"})   
        }

        // console.log(path, route)
    }

    render() {
        const { classes } = this.props;
        const { route } = this.state;
        

        return (
    
            <UserContext.Consumer>
                {value=>{
                const {state} = value; 

                const layout = route !== null ?
                <Redirect  push  to={route}/>
                : 
                <Button className={classes.color} size="small" onClick={this.toggleMenu}>
                    <School/>
                    <Popper open={this.state.open} anchorEl={this.state.position} className={classes.poperPosition}>
                    <ClickAwayListener onClickAway={this.hideMenu}> 
                     <div className={classes.paperAlign}> 
                            {/* <Button onClick={()=>this.changeRoute("/CategorySelection", state)} className={classes.backgroundColor}>Odabir kategorije</Button>
                            <Button onClick={()=>this.changeRoute("/SubjectSelection", state)} className={classes.backgroundColor}>Odabir predmeta</Button>
                            <Button onClick={()=>this.changeRoute("/YearSelection", state)} className={classes.backgroundColor}>Odabir godine</Button>
                            <Button onClick={()=>this.changeRoute("/DepartmentSelection", state)} className={classes.backgroundColor}>Odabir smera</Button> */}
                            <Button component={Link} to="/CategorySelection" className={classes.backgroundColor}>Odabir kategorije</Button>
                            <Button component={Link} to="/SubjectSelection" className={classes.backgroundColor}>Odabir predmeta</Button>
                            <Button component={Link} to="/YearSelection" className={classes.backgroundColor}>Odabir godine</Button>
                            <Button component={Link} to="/DepartmentSelection" className={classes.backgroundColor}>Odabir smera</Button>
                     
                     </div>  
                    </ClickAwayListener>
                    </Popper>
                </Button>
       
            return layout
            }}</UserContext.Consumer>
        )
    }
}

export default withStyles(styles)(BigMenu);





