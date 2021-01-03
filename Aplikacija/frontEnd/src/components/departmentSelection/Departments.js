import React, { Component } from 'react';
import { Link} from 'react-router-dom'
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import departmentsData from "./DepartmentsData";


const styles = {
    
    departmentContainer: {       
        width: "200px",
        display: "inline-block",
    },

    imageSize: {
        height: 150,
        width: 150
    },

    departmentsPoistion: {
        textAlign: "center",
    },

    container: {
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
    }
  };

export class Departments extends Component{


render(){
    const { classes } = this.props;

    return(
    <div className={classes.container}>
      
            <div className={classes.departmentsPoistion}>
            {
                departmentsData.map(department=>

                <div className={classes.departmentContainer} key={department.name}>
                    <Typography>{department.name}</Typography> 
                        <Button  
                            component={Link} 
                            to="/SubjectSelection" 
                            onClick={()=>this.props.department(department.name)} 
                            className={`${classes.imageSize} ${department.image}`}
                        >
                            {""}
                        </Button>
                </div>
                    
                )
            }
            </div>
        
    </div>
    )
}
}

export default withStyles(styles)(Departments);