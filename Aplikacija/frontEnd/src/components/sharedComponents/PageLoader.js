import React, { Component } from "react";
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Error from "../../images/error.jpg";
import Slide from '@material-ui/core/Slide';

const spinnerContainer = {
  marginTop: "10%", 
  textAlign: "center",
}

const errorContainer = {
  marginTop: "3%",
  marginBottom: "3%",
  textAlign: "center",
}

const emptyPageContainer = {
  display: "flex",
  justifyContent: "center",
}

const emptyPageDesign = {
  backgroundColor: "#323232",
  color: "white",
  padding: "10px",
  borderRadius: "4px",
}

export class ExamPresentation extends Component {
  state = { 
    screenSize: window.innerWidth,
}

updateScreenSize = () => this.setState({screenSize: window.innerWidth});

componentDidMount(){
    window.addEventListener("resize", this.updateScreenSize);
}

componentWillUnmount() {
    window.removeEventListener("resize", this.updateScreenSize);
  }

execute = () => {
  let width
      if(this.state.screenSize<500)
          width = "70%"
      else if(this.state.screenSize>=500 && this.state.screenSize<750)
          width = "50%"
      else if(this.state.screenSize>=750 && this.state.screenSize<1000)
          width = "40%"
      else if(this.state.screenSize>1000 && this.state.screenSize<1500)
          width = "30%"
      else  
          width = "50%"

    if(this.props.loadingError===false && this.props.emptyPage===false)
      return(  
            <div style={spinnerContainer}>
              <CircularProgress/>
              <Typography>Strana se ucitava</Typography>
            </div>
      )

    else if(this.props.emptyPage===true){
      let path = window.location.pathname
      let slidingText = "Strana je prazna, budite prvi ko će uneti sadržaj!"
      if(path === "/Simulacija%20ispita")
        slidingText = "Ne postoji dovoljan broj pitanja kako bi se formirao blanket."

      return (
            <Slide direction="left" in mountOnEnter unmountOnExit>
              <div style={emptyPageContainer}>
                <Typography variant="h5" style={emptyPageDesign}> 
                  {slidingText}
                </Typography>
              </div>
            </Slide>
      )}
      
    else if(this.props.loadingError===true)
      return (
          <div style={errorContainer}>
            <img src={Error} width ={width} />
            <Typography variant="h5">Nije moguće učitati stranu</Typography>
          </div>
      )
    else
        console.log("Page loader is not used correctly")
}

render() {
          return (
              this.execute()
            )
  }
}

export default ExamPresentation;
