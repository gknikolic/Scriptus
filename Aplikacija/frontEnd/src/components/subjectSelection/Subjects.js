import React, { Component } from 'react';
import ListOfSubjects from "./ListOfSubjects";
import subjects from './index'
import { withStyles } from '@material-ui/core/styles';

const styles = {
    
    container: {
        display: "flex",
        flexGrow: 1,
        '@media (max-width: 599px)': {
            flexDirection: "column",
         },
    }
  };

export class Subjects extends Component{

    render(){
        const { classes } = this.props;
        let data; 
        let firstSemesterData;
        let secondSemesterData
        if(this.props.chosenYear==="Prva godina")
        {
            data = subjects.DataFirstYear;
            firstSemesterData = data.filter(subject => subject.semester === "1");
            secondSemesterData = data.filter(subject => subject.semester === "2");
        }
        else
        {
            if(this.props.chosenDepartment==="Računarstvo i informatika")
                data = subjects.DataComputerScience
            else if(this.props.chosenDepartment==="Energeritka")
                data = subjects.DataEnergetics
            else if(this.props.chosenDepartment==="Automatika")
                data = subjects.DataAutomatics
            else if(this.props.chosenDepartment==="Mikroelektronika")
                data = subjects.DataAutomatics
            else if(this.props.chosenDepartment==="Elektronika")
                data = subjects.DataElectronics
            else
                data = subjects.DataTelecommunications


            let chosenYear;
            if(this.props.chosenYear==="Prva godina")
                chosenYear = "1";
            else if(this.props.chosenYear==="Druga godina")
                chosenYear = "2";   
            else if(this.props.chosenYear==="Treća godina")
                chosenYear = "3"; 
            else    
                chosenYear = "4"; 
        
            firstSemesterData = data.filter(subject => 
                    {
                        return subject.semester === "1" && subject.year === chosenYear
                    });
            
            secondSemesterData = data.filter(subject => 
                    {
                        return subject.semester === "2" && subject.year === chosenYear
                    });
        }

        return(
            <div className={classes.container}>
                <ListOfSubjects heading="Prvi semestar" semesterData={firstSemesterData} subject={this.props.subject}></ListOfSubjects>
                <ListOfSubjects heading="Drugi semestar" semesterData={secondSemesterData} subject={this.props.subject}></ListOfSubjects>
            </div>
        )
    }
}

export default withStyles(styles)(Subjects);