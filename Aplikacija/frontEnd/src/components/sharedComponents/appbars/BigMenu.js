import React, { Component } from "react"
import { withStyles } from "@material-ui/core/styles"
import {UserContext} from "../../../App"
import Help from "../buttons/Help"
import Login from "../buttons/Login"
import Register from "../buttons/Register"
import Logout from "../buttons/Logout"
import Account from "../buttons/Account"
import Category from "../buttons/Category"
import ChangePage from "../buttons/ChangePage"
import Scriptus from "../headings/Scriptus"
import AddQuestion from "../../exam/AddQuestionExam"
import Expand from "../buttons/Expand"
import Reports from "../buttons/Reports"
// import Messages from "../buttons/Messages"
import TopUsers from "../buttons/TopUsers"
import Search from "../buttons/Search"


const styles = {

    AppbarLayout: {
        flexGrow: 1,
        display: "flex",
    },

    flexContainer: {
        display: "flex"
    },

    buttons: {
        flexGrow: 1,
        display: "flex",
        overflowX: "auto",
    },

    // buttons: {
    //     flexGrow: 1,
    //     display: "flex",
    //     overflowY: "auto",
    // },

    // buttonsParent: {
    //     flexGrow: 1,
    //     overflow: "hidden",
    //     position: "relative",
    // },

    spacer: {
        flexGrow: 1,
    },
};

export class BigMenu extends Component {
    state={
        screenSize: window.innerWidth,
    }

    updateScreenSize = () => this.setState({screenSize: window.innerWidth, resizeScreen: true});

    componentDidMount(){
        window.addEventListener("resize", this.updateScreenSize);
    }
  
    componentWillUnmount() {
      window.removeEventListener("resize", this.updateScreenSize);
    }

    enableExpandButton = () => {
        let path = window.location.pathname
        if(path==="/Pitanja%20sa%20blanketa")
            return true
        else
            return false    
    }

    enableAddQuestionButton = (userType) => {
        let path = window.location.pathname
        if(path==="/Pitanja%20sa%20blanketa" && (userType==="moderator" || userType==="admin"))
            return true
        else
            return false    
    }

    enableChangePageButton = (state) => {
        let path = window.location.pathname
        if( path!=="/" && path!=="/YearSelection" && path!=="/DepartmentSelection" && path!=="/SubjectSelection")
            return true
        else
            return false   
    }

    enableCategoryButton = (state) => {
        const {category, department, subject, yearOfStudy} = state;
        let path = window.location.pathname
        if(category!==null && department!==null && subject!=null && yearOfStudy!=null && path!=="/" && path!=="/YearSelection" && path!=="/DepartmentSelection" && path!=="/CategorySelection" && path!=="/SubjectSelection"){
            return true
        }
        else
            return false  
    }

    enableReportsButton = (userType) => {
        if(userType==="admin" || userType==="moderator")
            return true
        else
            return false
    }

    enableTopUsersButton = (userType) => {
        if(userType==="admin" || userType==="moderator")
            return true
        else
            return false
    }

    enableMessagesButton = (userType) => {
        let path = window.location.pathname
        if(path==="/Pitanja%20sa%20blanketa" && (userType==="admin" || userType==="moderator"))
            return true
        else
            return false
    }

    enableSearchButton = (category) => {
        let path = window.location.pathname
        if(path==="/Pitanja%20sa%20blanketa")
            return true
        else
            return false
    }

    disableHelpButton = (userType) => {

        // if(userType==="admin" || userType==="moderator")
        //     return true
        // else
            return false
    }

    render() {
        const { classes } = this.props;
        const { screenSize } = this.state;

        let buttonsWidth = screenSize - screenSize/3

        return (
            <UserContext.Consumer>
            {value=>{
            const {state} = value;
            const {category, userType} = value.state;
            const {setCategory} = value.functions

            return(
             <div className={classes.AppbarLayout}>
                <Scriptus/>
                <div className={classes.spacer}></div>
                {/* <div style={{width: buttonsWidth}} className={classes.buttonsParent}>    */}
                    <div style={{width: buttonsWidth}} className={classes.buttons}> {/**/}
                        <div className={classes.spacer}></div>
                        {this.enableSearchButton(category) ? <Search/> : null}
                        {this.enableReportsButton(userType) ? <Reports userType={userType}/> : null}
                        {this.enableExpandButton() ? <Expand/> : null}
                        {/* {this.enableAddQuestionButton(userType) ? <AddQuestion state={state}/> :null} */}
                        {this.enableCategoryButton(state) ? <Category setCategory={setCategory}/> : null}
                        {this.enableChangePageButton() ? <ChangePage/> : null}
                        {this.enableTopUsersButton(userType) ? <TopUsers/> : null}
                        {/* {this.enableMessagesButton(userType) ? <Messages/> : null} */}
                        {
                            state.loggedOn?
                            <div className={classes.flexContainer}>
                                <Account/>
                                <Logout/>
                            </div>
                            :
                            <div className={classes.flexContainer}>
                                <Login/>
                                <Register/>
                            </div>
                        }
                        {this.disableHelpButton(userType) ? null : <Help/>}
                    </div>
                {/* </div> */}
            </div>
            )}}
            </UserContext.Consumer>
        );
    }
}

export default withStyles(styles)(BigMenu);





