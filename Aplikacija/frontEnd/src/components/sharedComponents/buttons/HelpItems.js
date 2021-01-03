import React, { Component } from 'react';
import Login from "../helpItems/Login";
import Register from "../helpItems/Register";


export class BigMenu extends Component{


    render(){

        return(
            <div >
                <Login/>
                <Register/>
            </div>
    );}
    
}

export default BigMenu