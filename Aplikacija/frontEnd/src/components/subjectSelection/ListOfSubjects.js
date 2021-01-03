import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { Redirect } from 'react-router-dom';


const styles = {
    subjectType: {
        backgroundColor: "#133366",
        color: "white",
        minHeight: "50px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    
    subjectBehavior: {
        "&:hover": {
            backgroundColor: "#133e86",
        },
        minHeight: "35px",
        textAlign: 'center',
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#164da7",
        margin: "3px",
        color: "white", 
        borderRadius: "5% 5%",
    },

    centerText: {
        margin: "auto",
        fontSize: "1.25rem",
        fontFamily: "Roboto, Helvetica, Arial, sans-serif",
        fontWeight: 500,
        lineHeight: 1.6,
        letterSpacing: "0.0075em",
    },

    listContainer: {
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        textAlign: "center",
    },

    completeList: {
        flexGrow: 1,
        // borderLeft: "2px solid #164da7",
        // borderRight: "2px solid #164da7",
        // borderBottom: "2px solid #164da7",
        margin: "10px 10px 10px 10px",
        display: "flex",
        flexDirection: "column",
    },

    optionalList: {
        display: "flex",
        flexDirection: "column",
        // flexGrow: 1,
    },

    requiredList: {
        display: "flex",
        flexDirection: "column",
    },

 

  };

export class Subjects extends Component{
    state={
        route: null,
    }

    render(){
        const {route } = this.state; 
        const { classes } = this.props;
        let requiredSubjects =  this.props.semesterData.filter(subject => subject.type === "O");
        let optionalSubjects =  this.props.semesterData.filter(subject => subject.type === "I");

        let handleOnClick = (subjectName, setSubject) => {
          
            setSubject(subjectName);

            // let delay=null;
            // if(window.innerWidth<600)
            //     delay= 75;

            // setTimeout(() => this.setState({ route: "/CategorySelection" }), delay)
            this.setState({ route: "/CategorySelection" })
        }

        const layout = route !== null ?
            <Redirect  push  to={route}/>
            : 
        (
            <div className={classes.listContainer}>
                <div className={classes.completeList}>
                    <div className={classes.optionalList}>
                        <Typography variant="h4" className={classes.subjectType}>Obavezni </Typography>
                        {
                            requiredSubjects.map(subject=>
                                {
                                    return (
                                        <div 
                                            key={subject.name}
                                            onClick = {()=>handleOnClick(subject.name, this.props.subject)}
                                            className={classes.subjectBehavior}
                                        >
                                            <div className={classes.centerText}>{subject.name}</div>
                                        </div>
                                    )
                                }
                            )
                        }
                    </div>
                    {
                        
                            optionalSubjects.length === 0 ?  null   :
                        <div className={classes.requiredList}>
                            
                            <Typography variant="h4" className={classes.subjectType}>Izborni </Typography>
                            {
                                optionalSubjects.map(subject=>
                                    {
                                        return (
                                            <div 
                                                key={subject.name}
                                                onClick = {()=>handleOnClick(subject.name, this.props.subject)}
                                                className={classes.subjectBehavior}
                                            >   
                                                <div className={classes.centerText}>{subject.name}</div>
                                            </div>
                                        )
                                    }
                                )
                            }
                        </div>
                    }
                </div>
                
            </div>
        )
        return layout
    }
}

export default withStyles(styles)(Subjects);