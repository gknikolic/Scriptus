import React, { Component } from "react";
import Question from "../exam/Question";
import PageLoader from "../sharedComponents/PageLoader";
import {search} from "../../backendCommunication/communication"

export class ExamPresentation extends Component {

  constructor(props)
  {
    super(props);

    this.state = {
      exams: null,
      loadingError: false,
      emptyPage: false,
      searchString: this.props.searchString,
    }
  }

  

componentDidUpdate(){
  if(this.props.reloadQuestions===true){
        this.fetchData()
        this.props.setReloadQuestions(false) 
      }
  else if(this.props.searchString!==null){
    
    fetch(search, {
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      }, 
      method: "POST", 
      body: JSON.stringify(this.props.searchRequirements)
    })
    .then((response)=> response.json()) 
    .then(response => {
  
      if(response.result===0) //nema nista
        this.setState({emptyPage: true})
      else
        this.setState({exams: response})
    })
    .catch(err=>{
      this.setState({loadingError: true})
    })

    this.props.setSearchString(null)
  }
  else if(this.props.newQuestion===true){
    this.fetchData()
    this.props.setNewQuestion(false)

  }
}

fetchData = () => {
  fetch(this.props.path)
  .then((response)=> response.json()) 
  .then(response => {

    if(response.result===0) //nema nista
      this.setState({emptyPage: true})
    else
      this.setState({exams: response})
  })
  .catch(err=>{
    this.setState({loadingError: true})
  })
}

componentDidMount(){
    this.fetchData()
}

execute = () => {
    if(this.state.exams===null)
     return <PageLoader loadingError={this.state.loadingError} emptyPage={this.state.emptyPage}/>
    else{
      return this.state.exams.map((exam, index)=><Question data={exam} key={index}/>)

    }
}

render() {
    const {exams} = this.state;
          return (
              this.execute()
            )
  }
}

export default ExamPresentation;
