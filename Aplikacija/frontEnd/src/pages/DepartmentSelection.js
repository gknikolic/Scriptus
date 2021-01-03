import React, { Component } from 'react';
import Appbar from "../components/sharedComponents/appbars/Appbar"
import DepartmentHeading from "../components/sharedComponents/headings/PagesForSelection"
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
        },
      },
    
      fontType: {
        textTransform: "none",
      },

      spacer: {
          flexGrow: 1,
      }
  };


export class DepartmentSelection extends Component{

    state={
        departments: ["Računarstvo i informatika", "Energeritka", "Automatika", "Mikroelektronika", "Elektronika", "Telekomunikacije"],
        route: null,
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
        
        const { route, screenSize} = this.state; 
        const { classes } = this.props;
        let departments = this.state.departments;

        let handleOnClick = (department, setDepartment) => {
          
            setDepartment(department);

            // let delay=null;
            // if(window.innerWidth<600)
            //     delay= 75;

            // setTimeout(() => this.setState({ route: "/SubjectSelection" }), delay)
            this.setState({ route: "/SubjectSelection" })
        }

        const layout = route !== null ?
            <Redirect  push  to={route}/>
            : 
        (
            <div className={classes.container}>
                    <Appbar/>
                    <DepartmentHeading>Odaberite smer</DepartmentHeading>
                    {
                        departments.map((department) => 
                        <Button
                            key={department}
                            onClick = {()=>{
                                handleOnClick(department, this.props.department)
                            }}
                            className = {classes.backgroundColor}
                        >
                            <Typography variant={"h4"} color="inherit" className={classes.fontType}>{department}</Typography>
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

export default withStyles(styles)(DepartmentSelection);