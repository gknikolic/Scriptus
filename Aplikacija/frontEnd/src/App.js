import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Home from "./pages/Home"
import DepartmentSelection from "./pages/DepartmentSelection"
import YearSelection from "./pages/YearSelection"
import SubjectSelection from "./pages/SubjectSelection"
import CategorySelection from "./pages/CategorySelection"
import ExamPresentation from "./pages/ExamPresentation"
import ArchivePresentation from "./pages/ArchivePresentation"
import ProfesorPresentation from "./pages/ProfesorPresentation"
import Scripts from "./pages/Scripts"
import Account from "./pages/Account"
import Error from "./pages/Error"
import Reports from "./pages/Reports"
import TopUsers from "./pages/TopUsers"
import Messages from "./pages/Messages"
import News from "./pages/News"
import Forum from "./pages/Forum"
import ExamSimulation from "./pages/ExamSimulation"
import ProfileView from "./pages/ProfileView"


const UserContext = React.createContext();
export {UserContext}

class App extends Component {
  
  constructor(props)
  {
    super(props);
    if(localStorage.getItem("userChoices") !== null)
    {
      let savedChoices = localStorage.getItem("userChoices");
      let oldState = JSON.parse(savedChoices);
      this.state=oldState;
      this.state.expand= false;
    } 
    else {
      this.state={
          yearOfStudy: null,
          department: null,
          subject:null,
          category:null,
          loggedOn: false,
          username: null,
          userType: null,

          //ExamPresentation
          expand: false ,
          reloadQuestions: false,
          searchString: null,
          newQuestion: false,
          reloadAnswers: false,

          //ViewProfile
          profileView: null,

          //Forum
          reloadForum: false,
        }
    }
  }
 
  componentWillMount = () => {document.title = "Scriptus";}

  //new item in state requires saveChoices() parametar to be false, otherwise it wont be saved to localStorage
  componentDidMount(){window.addEventListener('beforeunload', ()=>this.saveChoices(true));} 

  saveChoices = (save) => {
    if(save) 
      localStorage.setItem("userChoices",JSON.stringify(this.state))
    else
      localStorage.clear()  
  }
  

  componentWillUnmount() { window.removeEventListener('beforeunload', this.saveChoices);}

  setReloadAnswers = (reloadAnswers)=> {this.setState({reloadAnswers: reloadAnswers})}

  setNewQuestion = (newQuestion) => {this.setState({newQuestion: newQuestion})}

  setReloadForum = (reloadForum) => {this.setState({reloadForum: reloadForum})}

  setSearchString = (searchString) => {this.setState({searchString: searchString})}

  setProfileView = (profileView) => {this.setState({profileView: profileView})}

  setReloadQuestions = (reloadQuestions)=>{this.setState({reloadQuestions: reloadQuestions})}

  setYear = (yearOfStudy)=>{this.setState({yearOfStudy: yearOfStudy})}

  setDepartment = (department)=>{this.setState({department: department})}

  setUserType = (userType) => {this.setState({userType: userType})}

  setUserName = (username)=>{this.setState({username: username})}

  setSubject = (subject) =>{this.setState({subject: subject})}

  setCategory = (category)=>{this.setState({category: category})}

  setLoggedOn = (loggedOn) => {this.setState({loggedOn: loggedOn})}

  setExpand = () =>{this.setState({expand: !this.state.expand})}

  render() {
    const functions = {
      setYear: this.setYear,
      setDepartment: this.setDepartment,
      setSubject: this.setSubject,
      setCategory: this.setCategory,
      setLoggedOn: this.setLoggedOn,
      setExpand: this.setExpand,
      setUserName: this.setUserName,
      setUserType: this.setUserType,
      setReloadQuestions: this.setReloadQuestions,
      setProfileView: this.setProfileView,
      setSearchString: this.setSearchString,
      setReloadForum: this.setReloadForum,
      setNewQuestion: this.setNewQuestion,
      setReloadAnswers: this.setReloadAnswers,
    }
   
    return (
        <UserContext.Provider value={{state: this.state, functions: functions}}>
          <Router>
            <Route exact path='/' render={()=>{return <Home />}}/> 
            <Route  path={`/YearSelection`} render={()=><YearSelection yearOfStudy={this.setYear} />} /> 
            <Route  path={`/DepartmentSelection`} render={()=><DepartmentSelection department={this.setDepartment}/>} />
            <Route  path={`/SubjectSelection`}  render={()=><SubjectSelection subject={this.setSubject} chosenYear={this.state.yearOfStudy} chosenDepartment={this.state.department}/>}/>
            <Route  path={`/CategorySelection`}  render={()=><CategorySelection category={this.setCategory}/>}/>
            <Route  path={`/Arhiva blanketa`}  render={()=><ArchivePresentation/>}/> 
            <Route  path={`/Ocene profesora`}  render={()=><ProfesorPresentation/>}/> 
            <Route  path={`/Pitanja sa blanketa`}  render={()=><ExamPresentation/>}/> 
            <Route  path={`/Simulacija ispita`}  render={()=><ExamSimulation/>}/> 
            <Route  path={`/Forum`}  render={()=><Forum/>}/> 
            <Route  path={`/Novosti`}  render={()=><News/>}/> 
            <Route  path={`/Skripte`}  render={()=><Scripts/>}/> 
            <Route  path={`/Account`}  render={()=><Account/>}/> 
            <Route  path={`/Reports`}  render={()=><Reports/>}/> 
            <Route  path={`/Messages`}  render={()=><Messages/>}/> 
            <Route  path={`/TopUsers`}  render={()=><TopUsers/>}/> 
            <Route  path={`/Error`}  render={()=><Error/>}/> 
            <Route  path={`/ProfileView`}  render={()=><ProfileView/>}/> 
          </Router>
          </UserContext.Provider>
  );
      
  }
   
}

export default App;
