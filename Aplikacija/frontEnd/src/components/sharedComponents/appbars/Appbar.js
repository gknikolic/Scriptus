import React, { Component } from 'react';
import { Toolbar } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import BigMenu from "./BigMenu"
// import SmallMenu from  "./SmallMenu"


const styles = (theme) => ({

    toolbarColor: {
        minHeight: "64px",
        backgroundColor: "#164da7",
        paddingRight: "5px",
        paddingLeft: "5px", 
    },

    disableHiding: {
        // ...theme.mixins.toolbar, //  min-height: 64px
        minHeight: "64px",
    },

  });

  export class Appbar extends Component{

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
            <div className={classes.disableHiding}>
                <AppBar>
                <Toolbar className ={classes.toolbarColor}>
                    
                    {
                        // this.state.screenSize < 500 ?
                        // <SmallMenu />
                        // :
                        <BigMenu/>
                    }
                    
                </Toolbar>
                </AppBar>
            </div>
        )
    }
}

  export default withStyles(styles)(Appbar);
