import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import {UserContext} from "../../../App"; 

const styles = {
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    minWidth: 400,
    "@media (max-width: 600px)" : {
        minWidth: 200,
    },
    marginRight: "3px",
  },

  input: {
    marginLeft: 8,
    flex: 1,
  },

  iconButton: {
    padding: 10,
  },

}

export class Search extends Component {

    handleSearch = (setSearchString) => {
        let value = document.getElementById("searchInput").value
        setSearchString(value)
    }

    render(){
        const { classes } = this.props;

        return (
     
          <UserContext.Consumer>
            {value=>{
              const {setSearchString} = value.functions; 

              return (
                  <Paper className={classes.root}>
                  <InputBase
                      className={classes.input}
                      placeholder="Pretraži"
                      inputProps={{ 'aria-label': 'Search Google Maps' }}
                      id="searchInput"
                  />
                  <IconButton className={classes.iconButton} aria-label="Search" onClick={()=>this.handleSearch(setSearchString)}>
                      <SearchIcon />
                  </IconButton>
                  </Paper>
              );
            }}
        </UserContext.Consumer>)
    }
}


export default withStyles(styles)(Search);