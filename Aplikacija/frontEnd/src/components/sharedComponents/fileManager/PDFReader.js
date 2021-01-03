import React, { Component } from "react";
import { Document, Page, pdfjs} from 'react-pdf';
import { withStyles } from "@material-ui/core/styles";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;


const styles = {
    position: {
       display: "flex",
    },

    documentContainer: {
        height: "400px",
        overflow: "auto",
        overflowX: "hidden",
    }


}

export class UploadButton extends Component {

    state = {
        file: null,
        numPages: null
    }

    onDocumentLoadSuccess = ({ numPages }) => {
        this.setState({ numPages: numPages });
      };

    render() {
        const { classes } = this.props;
        const {numPages} = this.state;

        let pages = [];
        for(let i=1; i<=numPages; i++)
            pages.push(i);


    return (
                <div className={classes.position}>
                    <div style={{flexGrow: 1}}></div>
                    <Document 
                    file={this.props.file}
                    onLoadSuccess={this.onDocumentLoadSuccess}
                    className={classes.documentContainer}
                    >
                    {   
                        pages.map(page => <Page pageNumber={page} key={page}/>)
                    }
                    </Document>
                    <div style={{flexGrow: 1}}></div>
                </div>
    );
    }
}

export default withStyles(styles)(UploadButton);