import React, { Component } from "react";
import {examsMoreAnswers} from "../../backendCommunication/communication";
import Answer from "./Answer"


export class Answers extends Component {

    state = {
        answers: null,
    }

    componentDidMount(){
        const {answerId, username} = this.props;
        fetch(examsMoreAnswers + answerId + "/" + username)
        .then((response)=> response.json()) 
        .then(response => {
            this.setState({answers: response})
        })
        .catch(err=>console.log(err))
    }

    componentDidUpdate(){
      if(this.props.reloadAnswers){
        const {answerId, username} = this.props;
        fetch(examsMoreAnswers + answerId + "/" + username)
        .then((response)=> response.json()) 
        .then(response => {
            this.setState({answers: response})
        })
        .catch(err=>console.log(err))
        this.props.setReloadAnswers(false)
      }
    }

  render() {
    const {answers} = this.state;

    console.log(answers)
  
    return (
        
            answers && this.props.expandOnArrow ?
            answers.map((answer, index) => <Answer isLiked={answer.lajk} answerId={answer.id} username={this.props.username} answer={answer} key={index} />)
            :
            null
    );
  }
}

export default Answers
