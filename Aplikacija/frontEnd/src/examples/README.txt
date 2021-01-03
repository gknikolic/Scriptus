            More stuff i learned while i was making application

_______________________________________________________________________________________________________________          
                Easy way to find component class with devTools


//https://material-ui.com/customization/overrides/
_______________________________________________________________________________________________________________
                Add more than one class to component 


//https://stackoverflow.com/questions/46066675/how-to-add-multiple-classes-in-material-ui-using-the-classes-props
_______________________________________________________________________________________________________________

_______________________________________________________________________________________________________________
                Override component (using classes property)

_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _
 
  The first way to override the style of a component is to use class names.
  When the className property isn't enough, and you need to access deeper 
  elements, you can take advantage of the classes property to customize 
  all the CSS injected by Material-UI for a given component. 

//https://material-ui.com/customization/overrides/
_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _               
 
1. Add your styles in a const variable at the top

    const styles = {
      root: {
        backgroundColor: 'transparent !important',
        boxShadow: 'none',
        paddingTop: '25px',
        color: '#FFFFFF'
      }
    };


2. We need to use higher order function with "withStyles" to over ride material ui classes

    export default withStyles(styles)(NavigationBar);


3. Now these styles are available to us as props in the render function try doing this - console.log(this.props.classes) - you get a classes name correspoding to properties you include in styles object. like - {root: "Instructions-root-101"}.

Add that with classes attribute

render() {
   const { classes } = this.props;
   return ( 
       <AppBar classes={{ root: classes.root }}>
        // Add other code here
       </AppBar>
   )
}

/*
  withStyles() (step 2) link a style sheet with a component. 
  It does not modify the component passed to it; instead, it returns 
  a new component with a classes property so you can override the 
  injected class names from the outside. 

//https://material-ui.com/customization/css-in-js/#withstyles-styles-options-higher-order-component  
*/
_______________________________________________________________________________________________________________
                Style component with style object (no classes) 


import React, { Component } from 'react';


const styles = {
  display: "flex",
  backgroundColor: "red",
  
}

class App extends Component {
    render(
      return (
            <div style={styles}></div>
          );
    );
    

}
export default App;

/*
    Component inline styling:

<AppBar position="static" style={{backgroundColor: "red", height: 30}} >
*/

_______________________________________________________________________________________________________________
                CSS modules

//https://facebook.github.io/create-react-app/docs/adding-a-css-modules-stylesheet                
_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _
                Style.module.css

  .ChangeToolbarHight{
      min-height: 20px !important;
  }

  .MoveToolbarButtons{
      margin-left: auto;
  }

/*
    !important - determinates Specificity
//https://www.w3schools.com/css/css_specificity.asp
*/
_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _
 
import design from "./Style.module.css";
import Button from './@material-ui/core/Button';
import AppBar from './@material-ui/core/AppBar';
import { Toolbar } from './@material-ui/core';

export class App extends Component{

    render(){

        return(
            <div>
                <AppBar position="static" >
                        <Toolbar className={design.ChangeToolbarHight}>
                            <section className={design.MoveToolbarButtons}>
                                <Button color="inherit" size="small">Prijavljivanje</Button>
                                <Button color="inherit">Pomoc</Button>
                            </section>
                        </Toolbar> 
                    </AppBar>
            </div>
        )
    }
}

export default App;

/*
    I example above we could also use:

  <Toolbar className={design.ChangeToolbarHight}> 


    One more way to accomplish this:

  <Button size="small" classes={{ label: design.ChangeButtonButty }}>aaaa</Button> 

    where "ChangeButtonButty" is our class.
*/
_______________________________________________________________________________________________________________
                CSS vh (viewport) vs percentage

//https://stackoverflow.com/questions/27612931/styling-html-and-body-selector-to-height-100-vs-using-100vh
//https://stackoverflow.com/questions/31039979/css-units-what-is-the-difference-between-vh-vw-and
//https://bitsofco.de/viewport-vs-percentage-units/                
_______________________________________________________________________________________________________________
                Centred text component (probably bad idea)

import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const styles = {
    container: {
        flexGrow: 1,
        display: "flex",
        textAlign: "center",
    },

    centredText: {
        margin: "auto",
        flexDirection: "column",
    },
};

export class CentredText extends Component{

    render(){
        const { classes } = this.props;
        return(
            <div className={classes.container}>
                <div className={classes.centredText}>
                    <Typography   variant={this.props.variant}>
                        {this.props.children}
                    </Typography>
                </div>
            </div>
    );}
}
export default withStyles(styles)(CentredText);
_______________________________________________________________________________________________________________
                    Import with index.js file

import Data from '../components/subjectSelection' 

/*
    This is possible beacuse we have file below with extension "index.js" so we dont need to have:
    '../components/subjectSelection/index.js' 
*/
_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _
import DataCS from './DataComputerScience'
import DataFirstYear from './DataFirstYear'

export default {
    DataCS,
    DataFirstYear
}
_______________________________________________________________________________________________________________
                    Hide elements

                    