import React, { Component } from "react";
import Heading from "./Heading"; 
import Info from "./Info";
import { withStyles } from "@material-ui/core/styles";
import {UserContext} from "../../App"; 
import Answers from "./Answers";
import CreateAnswer from "./CreateAnswer";
import Paper from '@material-ui/core/Paper';

const styles = {

  container: {
      marginLeft: "15%",
      marginRight: "15%",
      marginTop: "50px",
      boxShadow: "0px 1px 10px 0px",
      "&:hover": {
        boxShadow: "0px 1px 15px 0px",
      },
      "@media (max-width: 800px)" : {
        marginLeft: "15px",
        marginRight: "15px",
      }
  },
}

export class Question extends Component {

  state = {
    expandOnArrow: false,
    moreAnswers: false,
    newAnswer: false,
  }

  createNewAnswer = () => {
    this.setState({newAnswer: !this.state.newAnswer})
  }

  setExpandOnArrow = (expandOnArrow) => {
    this.setState({expandOnArrow: expandOnArrow})
  }

  render() {
    const { classes } = this.props;
    const {heading, officialAnswer, info} = this.props.data;
    const {likes, user, datum, isLiked} = info;

    return (
     
        <UserContext.Consumer>
          {value=>{
            const {expand, username, reloadAnswers} = value.state; 
            const {setReloadAnswers} = value.functions;
            const {newAnswer, expandOnArrow} = this.state;

            return (
                  <Paper className={classes.container}>
                    <Heading data={heading}/>
                    <Info date={datum} isLiked={isLiked} likes={likes} user={user} username={username} answerId={officialAnswer.id} expandOnArrow={expandOnArrow} expand={expand} setExpandOnArrow={this.setExpandOnArrow} createNewAnswer={this.createNewAnswer}/>
                    <Answers reloadAnswers={reloadAnswers} setReloadAnswers={setReloadAnswers} answerId={officialAnswer.id} username={username} expandOnArrow={expandOnArrow}/>
                    {
                      newAnswer ?
                      <CreateAnswer createNewAnswer={this.createNewAnswer} answerId={officialAnswer.id} user={username} />
                      :
                      null
                    } 
                  </Paper>
            )}}
        </UserContext.Consumer>
    );
  }
}

export default withStyles(styles)(Question);
