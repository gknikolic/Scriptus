import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const styles = {
    container: {
        backgroundColor: "#282828",
        // backgroundColor: "#323232",
        display: "flex",
        "@media (max-width: 700px)" : {
            flexDirection: "column",
            alignItems: "center",
        },
        marginTop: "50px",
    },

    color: {
        color: "white",
        textAlign: "center",
    },

    contentContainer: {
        marginTop: "10px",
        marginBottom: "10px",
        width: "40%",
        "@media (max-width: 700px)" : {
            width: "80%",
        },
    },

    spacer: {
        flexGrow: 1,
    }
};

export class BottomBar extends Component{

    state = { 
        screenSize: window.innerWidth,
    }

    updateScreenSize = () => this.setState({screenSize: window.innerWidth});

    componentDidMount(){
        window.addEventListener("resize", this.updateScreenSize);
        window.scrollTo(0,0)
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateScreenSize);
      }

    render(){

        const { classes } = this.props;

            return( 
                <div className={classes.container}>
                    <div className={classes.spacer}></div>
                    <div className={classes.contentContainer}>
                        <Typography variant="h5" className={classes.color}> O nama:</Typography>  
                        <Typography variant="h6" className={classes.color}>    
                        {
                           
                            <br/> 
                        }
                                Sajt smo napravili kako  bi olakšali pripremu ispita,  
                                međutim nismo odgovorni ukoliko ne položite ispit.
                        </Typography>
                    </div >
                    <div className={classes.spacer}></div>
                    <div className={classes.contentContainer}>
                        {  
                            this.state.screenSize < 700 ?
                            <br/>  
                            :
                            null
                        }
                        <Typography variant="h5" className={classes.color}> Kontakt:</Typography>  
                        <br/>  
                        <div> 
                            <Typography variant="h6" className={classes.color}>           
                                    darjan97@gmail.com
                            </Typography>
                            <Typography variant="h6" className={classes.color}>           
                                    n.nikolic@elfak.rs 
                            </Typography>
                            <Typography variant="h6" className={classes.color}>           
                                    z.balanovic@elfak.rs
                            </Typography>
                        </div>
                    </div >
                </div>
            )
    
    }
}

export default withStyles(styles)(BottomBar);