import React, { Component } from "react";
import { withStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddDialog from "./AddDialog"
import CloudUploadIcon from '@material-ui/icons/CloudUpload';


const styles = {
  fab: {
    margin: 1,
    background: "#164da7",
    color: "white",
    "&:hover": {
      backgroundColor: "#133366",
    },
  },
  extendedIcon: {
    marginRight: 1,
  },
};

export class AddButton extends Component {

  constructor(props)
  {
      super(props)
      this.inputRef = React.createRef();
  }

  uploadFile = (e) => {
      if(e.target.files[0]!=null)
      {
          this.props.upload(e.target.files[0])
      }
  }

  fileBrowser = () => {
      this.inputRef.current.click();
  }

  render() {
      const { classes } = this.props;

      return (
          <div>
              <Fab aria-label="Add" className={classes.fab} onClick={this.fileBrowser}>
                  <CloudUploadIcon />
              </Fab>
              <input type="file" ref={this.inputRef} style={{display: "none"}} onChange={this.uploadFile} accept=".pdf, .doc*"/>
          </div>
      )
  }
}

export default withStyles(styles)(AddButton);