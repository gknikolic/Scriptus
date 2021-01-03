import React, { Component } from "react"
import {UserContext} from "../../App"
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import {profile, adress} from "../../backendCommunication/communication"
import PageLoader from "../sharedComponents/PageLoader"
import image from "../../images/MaleStudentAvatar.png"
import EditButton from "./EditButton";

const styles = {
    color: {
        color: "white",
        "&:hover": {
            background: "#133e86",
        },
        "&:hover": {
            backgroundColor: "#164da7",
          },
    },

  mainContainer: {
    "&:hover": {
      boxShadow: "0px 1px 15px 0px",
    },
    boxShadow: "0px 1px 10px 0px",
    display: "flex",
    flexDirection: "column",
    margin: "0% 10%",
  },

  content: {
    display: "flex",
    flexDirection: "column",
    backgroundColor:" #fff",
    flexGrow: 1,
  },

  spacer: {
    flexGrow: 1,
  },

  heading: {
    background: "#133366",
    color: "white",
  },

  info: {
    padding: "0px 5px 0px 5px",
  },

  contentContainer: {
    display: "flex",
    "@media (max-width: 700px)" : {
      flexDirection: "column",
    }
  },

  editButton: {
    alignItems: "center",
    display: "flex",
    margin: 15,
    alignItems: "flex-end",
  },

  detailsDesign: {
    display: "flex",
    flexGrow: 1,
    justifyContent: "flex-end",
    marginTop: "20px",
  }
};

export class SubjectPresentation extends Component {
    state={
      screenSize: window.innerWidth,
      userProfile: null,
      loadingError: false,
      emptyPage: false,
  }

  // KORISTI SE NAKON IZMENA KONTROLA KORISNIKA
  // componentDidUpdate(){
  //   if(this.props.reloadQuestions===true){
  //         this.fetchData()
  //         this.props.setReloadQuestions(false) 
  //       }
  // }

  updateScreenSize = () => this.setState({screenSize: window.innerWidth});

  fetchData = () => {
    fetch(profile + this.props.username)
    .then((response)=> response.json()) 
    .then(response => {
  
      if(response.result===0) //nema nista
        this.setState({emptyPage: true})
      else
        this.setState({userProfile: response})
    })
    .catch(err=>{
      this.setState({loadingError: true})
    })
  }

  componentDidMount(){
      window.addEventListener("resize", this.updateScreenSize);
      this.fetchData()
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateScreenSize);
  }

  render() {
    const {screenSize, userProfile} = this.state
    let path = window.location.pathname
    console.log(userProfile)
    let imagePath

    let variant="headline"
    
    if(userProfile && userProfile.path){
        imagePath = adress + userProfile.path
        console.log(imagePath);
        console.log(userProfile)
      }
    else
        imagePath = image

    return (
      <UserContext.Consumer>
        {value=>{
          const { classes } = this.props;
          const {username, userType} = value.state

          return (
            userProfile !==null ?
            <div className={classes.mainContainer}>
              <div className={classes.contentContainer}>
                <div className={classes.content} >
                <Typography variant={"h5"} align="center" className={classes.heading}>
                    {userProfile.username }
                  </Typography>
                    <img src={imagePath} height="200" style={{borderRadius: "50%", margin: "auto"}} width="200"/>
                    <Typography variant={variant} align="center" className={classes.info}>
                            {"Sakupljeni poeni: " + userProfile.poeni}
                    </Typography>
                </div>
                <div className={classes.content}>
                        <Typography variant={"h5"} align="center" className={classes.heading}>
                          Detalji: 
                        </Typography>
                        <div className={classes.detailsDesign}>
                          <div>
                            <Typography variant={variant} align="center" className={classes.info}>
                            {"Tip korisnika: " + userType }
                            </Typography>

                            <Typography variant={variant} align="center" className={classes.info}>
                            {"Email: " + userProfile.email}
                            </Typography>

                            <Typography variant={variant} align="center" className={classes.info}>
                            {"Ime: " + userProfile.ime}
                            </Typography>

                            <Typography variant={variant} align="center" className={classes.info}>
                            {"Prezime: " + userProfile.prezime}
                            </Typography>

                            <Typography variant={variant} align="center" className={classes.info}>
                            {"Indeks: " + userProfile.indeks}
                            </Typography>

                          </div>
                          {path==="/ProfileView" ? 
                          <div className={classes.editButton}></div>
                          : 
                          <div className={classes.editButton}>
                            <EditButton 
                            ime={userProfile.ime}
                            prezime={userProfile.prezime}
                            email={userProfile.email}
                            />
                          </div>
                          }
                        </div>

                  </div>
                </div>
            </div>
            :
            <PageLoader loadingError={this.state.loadingError} emptyPage={this.state.emptyPage}/>
            )}
      }
      </UserContext.Consumer>
    );
  }
}

export default withStyles(styles)(SubjectPresentation)
