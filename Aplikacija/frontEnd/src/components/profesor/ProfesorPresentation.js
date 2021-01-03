import React, { Component } from "react";
import {teacherRating} from "../../backendCommunication/communication"
import Profesor from "./Profesor";
import PageLoader from "../sharedComponents/PageLoader";
import AddButton from './AddButton'
import {UserContext} from "../../App"; 
import { withStyles } from '@material-ui/core/styles';

const styles = {

  addButton: {
    display: "flex",
    flexDirection: "row-reverse",
    margin: 30
  },
  conteiner: {
    displey: "flex"
  }
};

export class TeacherPresentation extends Component {
    
    state = {
        profesors: null,
        loadingError: false,
        emptyPage: false,
    }

    //UPDATOVANJE (DODAVANJE NOVOG PROFESORA)
    // componentDidUpdate(){
    //     if(this.props.reloadQuestions===true){
    //           this.fetchData()
    //           this.props.setReloadQuestions(false) 
    //         }
    //   }

    fetchData = () => {
        fetch(teacherRating+this.props.subject)
        .then((response)=> response.json()) 
        .then(response => {
      
          if(response.result===0) //nema nista
            this.setState({emptyPage: true})
          else
            this.setState({profesors: response})
        })
        .catch(err=>{
          this.setState({loadingError: true})
        })
      }

    componentDidMount(){
        this.fetchData()
    }

    render() {
        const {profesors} = this.state;
        const { classes } = this.props;

        return (
        <UserContext.Consumer>
          {value=>{
            const {username, userType, subject} = value.state; 

            return(
          
              <div className={classes.conteiner}>
                <div>

                  {
                      profesors !== null ? 
                      
                      profesors.map((profesor, index)=><Profesor profesor={profesor} key={index}/>)
                      :
                      <PageLoader loadingError={this.state.loadingError} emptyPage={this.state.emptyPage}/>
                    
                  }

                  <div className={classes.addButton}>
                  {
                    userType === "admin" || userType === "moderator" ?
                    <AddButton subject={subject}/>
                    :
                    null
                  } 
                  </div>  
                
                </div>
                </div>
             
                
            )
          }}
          </UserContext.Consumer>
        )
    }
}

export default withStyles(styles)(TeacherPresentation);
