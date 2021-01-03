import React, { Component } from 'react';
import ScriptusHeading from "../components/home/ScriptusHeading";
import ScriptusDescription from "../components/home/ScriptusDescription";
import GraduationImage from "../components/home/GraduationImage";
import ButtonNextPage from "../components/home/ButtonNextPage";
import Appbar from "../components/sharedComponents/appbars/Appbar";
import BottomBar from "../components/sharedComponents/appbars/Bottom";

const spacer = {
    flexGrow: 1,
  }

const container = {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
}  

export class Home extends Component{

    render(){

        return(
            <div style={container}>
                    <Appbar/>
                    <ScriptusHeading/>
                    <ScriptusDescription/>
                    <GraduationImage/>
                    <div style={spacer}></div>
                    <ButtonNextPage/>
                    <BottomBar/>
            </div>
        )
    }
}

export default Home


