import React, { Component } from "react";
import Typography from '@material-ui/core/Typography';
import { withStyles } from "@material-ui/core/styles";
import InfoComment from "./InfoComment"
import PhotosExplorer from "../sharedComponents/PhotosExplorer";

const styles = {

    container: {
        textAlign: "center",
        backgroundColor: "#fafafa",
    },

    name: {
        color: "white",
        marginTop: "2px",
    },
}

export class Answer extends Component {

  render() {
    const { classes } = this.props;
    const {answer} = this.props;
    const {prilozi, tekst, datum, promoted} = this.props.answer;
    if(Number(answer.id) === 26)
      console.log(answer.isLiked)

    return (
        <div >     
          <PhotosExplorer images={prilozi}/>
          <Typography variant="h6" className={classes.container}> {tekst} </Typography>
          <InfoComment isLiked={this.props.isLiked} promoted={promoted} date={datum} likes={answer.broj_lajkova} user={answer.KORISNIK_username} answerId={this.props.answerId} />
      </div> 
    );
  }
}

export default withStyles(styles)(Answer);
