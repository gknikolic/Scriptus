import React, { Component } from "react";
import {UserContext} from "../../App"; 
import Comment from "./Comment"
import PageLoader from "../sharedComponents/PageLoader";

export class SubjectPresentation extends Component {

  state = {
      comments: null,
      loadingError: false,
      emptyPage: false, 
  }

  componentDidUpdate(){
    if(this.props.reloadForum===true){
      this.fetchData()
      this.props.setReloadForum(false)
    }
    
  }

  componentDidMount(){
    this.fetchData()
  }

  fetchData = () => {
    fetch(this.props.path)
    .then((response)=> response.json()) 
    .then(response => {
  
      if(response.result===0) //nema nista
        this.setState({emptyPage: true})
      else
        this.setState({comments: response})
    })
    .catch(err=>{
      this.setState({loadingError: true})
    })
  }

  render() {
    
    return (
     
      <UserContext.Consumer>
        {value=>{
          const {subject, category} = value.state; 
          const {comments} = this.state;

          return (
              comments !== null ? 
                comments.map((comment, index) => {
                    return <Comment key={index} data={comment}/>
                })
                :
                <PageLoader loadingError={this.state.loadingError} emptyPage={this.state.emptyPage}/>
            )
          }}
        </UserContext.Consumer>
    )
  }
}

export default SubjectPresentation;
