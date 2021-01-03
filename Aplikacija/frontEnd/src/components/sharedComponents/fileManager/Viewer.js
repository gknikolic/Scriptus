import React, { Component } from "react";
import FileViewer from 'react-file-viewer';
import { withStyles } from "@material-ui/core/styles";

const styles = {

    documentContainer: {
        height: "400px",
        overflow: "auto",
        width: "100%",
    },

    documentWidth: {
        width: "100%",
    }
}

export class UploadButton extends Component {

    

    render() {
        const { classes } = this.props;

    return (
            <div>
                {/* <div style={{flexGrow: 1}}></div> */}
                {
                   <div className={classes.documentContainer}><FileViewer fileType={this.props.type} filePath={this.props.url} className={classes.documentWidth}/></div> 
                }
                <a href={this.props.url} download>Click to download</a>
                
                {/* <div style={{flexGrow: 1}}></div> */}
            </div>
    );
    }
}

export default withStyles(styles)(UploadButton)