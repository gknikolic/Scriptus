import React, { Component } from "react"
import {UserContext} from "../../App"
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import {topUsers} from "../../backendCommunication/communication"
import {promoteUser} from "../../backendCommunication/communication"
import {unpromoteUser} from "../../backendCommunication/communication"
import PageLoader from "../sharedComponents/PageLoader"
import Star from "@material-ui/icons/Star";
import Button from '@material-ui/core/Button';


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

  info: {
    color: "white",
    width: "300px",
    textAlign: "left",
    marginLeft: "5px",
    flexGrow: 1,

  },

  infosContainer: {
      display: "flex",
      flexDirection: "column",
      flexGrow: 1,
  },

  singleInfo: {
      display: "flex",
      backgroundColor: "#164da7",
      borderBottom: "solid #282828",
      "@media (max-width: 800px)" : {
          margin: "0px 30px 10px 30px",
      },
      minHeight: "30px",
      "&:hover": {
        backgroundColor: "#133e86",
      },
  },

  rating: {
    color: "white",
    textAlign: "right",
    width: "40px",
  },

  userStar: {
      color: "white"
  },
  moderatorStar: {
    color: "yellow"
  },

  container: {
    display: "flex",
    flexGrow: 1,
  },

  users: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    margin: "0px 50px 0px 50px"
  },

  userType: {
    backgroundColor: "#133366",
    color: "white",
    borderBottom: "solid black",
  },
 
};

export class SubjectPresentation extends Component {
    state={
      screenSize: window.innerWidth,
      users: null,
      loadingError: false,
      emptyPage: false,
  }

  updateScreenSize = () => this.setState({screenSize: window.innerWidth, resizeScreen: true});

  componentDidMount(){
      window.addEventListener("resize", this.updateScreenSize);

      fetch(topUsers)
      .then((response)=> response.json()) 
      .then(response => {
    
        if(response.result===0) //nema nista
          this.setState({emptyPage: true})
        else
          this.setState({users: response})
      })
      .catch(err=>{
        this.setState({loadingError: true})
      })
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateScreenSize);
  }

  promote(user) {
    //alert(`kliknuo za usera ${user.username}`)


    fetch(promoteUser, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        }, 
      method: "POST", 
      body: JSON.stringify({username: user.username})
    })
      .then(response => response.json())
      .then(res => this.setState({users: res}))
      .catch(err => alert(err))
  }

  unpromote(user) {

    fetch(unpromoteUser, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        }, 
      method: "POST", 
      body: JSON.stringify({username: user.username})
    })
    .then(response => response.json())
    .then((res) => this.setState({users: res}))
    .catch(err => alert(err))
  }

  render() {
    const {screenSize, users: users} = this.state
    let variant="h4"
    if(screenSize<800)
        variant="h5"

    return (
      <UserContext.Consumer>
        {value=>{
          const { classes } = this.props;
          let moderators = []
          let topUsers = []

          if(users!=null){
            users.forEach(user => {
              if(user.tip === "moderator")
                moderators.push(user)
                else
                topUsers.push(user)
            })
            // console.log(moderators)
          }


          // console.log(users)
          return (
            users !==null ?
            
            <div className={classes.container}>
              <div className={classes.users}>
                  <Typography variant={variant} align="center" className={classes.userType}>
                  {"Moderatori"}
                  </Typography>
                {
                    moderators.map((user, index) => 
                        <div className={classes.singleInfo} key={index}>
                          <Typography variant={variant} align="center" className={classes.info}>
                          {user.tip === 'moderator'? user.username : null}
                          </Typography>
                          <Typography variant={variant} align="center" className={classes.rating}>
                          {user.tip === 'moderator'? user.poeni : null}
                          </Typography>
                          <Button onClick={() => this.unpromote(user)} className={classes.color}><Star className={classes.moderatorStar}/></Button>
                        </div> )
                }
                </div>
                <div className={classes.users}>
                  <Typography variant={variant} align="center" className={classes.userType}>
                    {"Najaktivniji korisnici"}
                  </Typography>
                {
                
                  topUsers.map((user, index) => <div className={classes.singleInfo} key={index}>
                        <Typography variant={variant} align="center" className={classes.info}>
                        {user.tip === 'obican'? user.username : null}
                        </Typography>
                        <Typography variant={variant} align="center" className={classes.rating}>
                        {user.tip === 'obican'? user.poeni : null}
                        </Typography>
                        
                        <Button onClick={() => this.promote(user)} className={classes.color}><Star className={classes.userStar}/></Button>
                    </div> )
                }
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
