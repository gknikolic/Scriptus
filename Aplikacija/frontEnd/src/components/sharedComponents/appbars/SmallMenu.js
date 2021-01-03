// import React, { Component } from "react";
// import { withStyles } from "@material-ui/core/styles";
// import Button from "@material-ui/core/Button";
// import Menu from "@material-ui/icons/Menu";
// import Drawer from "@material-ui/core/Drawer";
// import Typography from "@material-ui/core/Typography";
// import Login from "../buttons/Login";
// import Register from "../buttons/Register";
// import Scriptus from "../headings/Scriptus";
// import Items from "../buttons/HelpItems";
// import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
// import KeyboardArrowDown from "@material-ui/icons/KeyboardArrowDown";
// import HelpOutline from "@material-ui/icons/HelpOutline";      
// import Logout from "../buttons/Logout";
// import Account from "../buttons/Account";
// import SubjectChoices from "../buttons/ChangePage";
// import AddQuestion from "../../subjectPresentation/exam/AddQuestionExam";
// import {UserContext} from "../../../App";
// import Expand from "../buttons/Expand";

// const styles = {
//     color: {
//         color: "white",
//         "&:hover": {
//             background: "#133e86"
//         }
//     },

//     AppbarLayout: {
//         flexGrow: 1,
//         display: "flex",
//     },

//     textAlign: {
//         textAlign: "center"
//     },

//     paper: {
//         background: "#133e86",
//       },

//     headingColor: {
//         color: "white",
//         borderBottom: "2px solid white",
//         paddingBottom: "2px",
//     },

//     helpButton: {
//         color: "white",
//         "&:hover": {
//             background: "#133e86"
//         },
//         justifyContent: "left",
//         display: "flex",
//     },

//     spacer: {
//         flexGrow: 1
//     },
// };

// export class SmallMenu extends Component {
//     state = {
//         visibleDrawer: false,
//         helpItems: {
//             display: "none"
//         }
//     };

//     toggleDrawer = () => this.setState({ visibleDrawer: !this.state.visibleDrawer });
//     toggleHelpItems = () => {
//         let helpItems = { ...this.state.helpItems };

//         if (this.state.helpItems.display === "none") {
//             helpItems.display = "block";
//             this.setState({ helpItems });
//         } else {
//             helpItems.display = "none";
//             this.setState({ helpItems });
//         }
//     };

//     enableExpandButton = (category) => {
//         if(category!=="Ocena profesora" && window.location.pathname==="/SubjectPresentation")
//             return true
//         else
//             return false    
//     }

//     enableAddQuestionButton = (category, userType) => {
//         if(category==="Blanketi" && (userType==="moderator" || userType==="admin"))
//             return true
//         else
//             return false    
//     }

//     enableSubjectChoicesButton = () => {
//         if(window.location.pathname==="/SubjectPresentation")
//             return true
//         else
//             return false   
//     }

//     render() {
//         const { classes } = this.props;
//         const {display} = this.state.helpItems;

//         return (
//             <UserContext.Consumer>
//             {value=>{
//             const {state} = value;
//             const {category, userType} = value.state;
            
//             return (
//                 <section className={classes.AppbarLayout}>
//                     <Scriptus/>
//                     <Button classes={{ root: classes.color }} onClick={this.toggleDrawer}>
//                         Meni
//                         <Menu />
//                     </Button>
//                     <Drawer 
//                         disableRestoreFocus={true} 
//                         open={this.state.visibleDrawer} 
//                         ModalProps={{ onBackdropClick: this.toggleDrawer }} 
//                         classes={{ paperAnchorLeft: classes.textAlign, paper: classes.paper}}
//                     >
//                         <Typography variant="h4" className={classes.headingColor}>Scriptus</Typography>
//                         {this.enableExpandButton(category) ? <Expand/> : null}
//                         {this.enableAddQuestionButton(category, userType) ? <AddQuestion state={state}/> :null}

//                         {/* <Category/> */}

//                         {this.enableSubjectChoicesButton() ? <SubjectChoices/> : null}
//                         {
//                             state.loggedOn?
//                             <span>
//                                 {window.location.pathname==="/SubjectPresentation" ? <Account/> : null}
//                                 <Logout/>
//                             </span>
//                             :
//                             <span className={classes.flexContainer}>
//                                 <Login/>
//                                 <Register/>
//                             </span>
//                         }

//                         <Button className={classes.helpButton} onClick={this.toggleHelpItems}>
//                             <HelpOutline/>Pomoc
//                             <div className={classes.spacer}></div>
//                             {display === "none" ? <KeyboardArrowRight/>:<KeyboardArrowDown/>}</Button>
//                         <div style={this.state.helpItems}><Items/></div>
//                     </Drawer>
//                 </section>
//             );
//             }}
//             </UserContext.Consumer>
//         )
//     }
// }

// export default withStyles(styles)(SmallMenu);
