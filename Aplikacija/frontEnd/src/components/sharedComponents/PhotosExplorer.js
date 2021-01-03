import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {adress} from "../../backendCommunication/communication";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowUp from "@material-ui/icons/KeyboardArrowUp";

const styles = {

    container: {
        textAlign: "center",
        backgroundColor: "#fafafa",
    },

    spacer: {
        flexGrow: 1,
    },

    arrowsContainer: {
      display: "flex",
    }
}

export class Answer extends Component {
    constructor(props)
    {
        super(props)
        this.positionRef = React.createRef();
        this.arrowsPositionRef = React.createRef();
    }

    state = {
        selectedImage: false,
        screenSize: window.innerWidth,
        changeFromArrow: false,
    }

   updateScreenSize = () => this.setState({screenSize: window.innerWidth});

   componentDidMount(){
        window.addEventListener("resize", this.updateScreenSize);
    }
  
    componentWillUnmount() {
        window.removeEventListener("resize", this.updateScreenSize);
    }

  handleChange = (event, newValue) => {
    if(this.state.selectedImage!==newValue)
      this.setState({selectedImage: newValue})
    else
      this.setState({selectedImage: false})  
  }

  hideImages = () => {
    let element = this.positionRef.current
    window.scrollTo(element.offsetLeft, element.offsetTop - window.innerHeight/3)
    this.setState({selectedImage: false})
  }

  swipeLeft = () => {
    if(this.state.selectedImage > 0)
      this.setState({selectedImage: this.state.selectedImage-1, changeFromArrow: true})
  }

  swipeRight = (imagesCount) => {
    if(this.state.selectedImage < imagesCount-1)
      this.setState({selectedImage: this.state.selectedImage+1, changeFromArrow: true})
  }

  componentDidUpdate(){

    if(this.state.changeFromArrow){
      let element = this.arrowsPositionRef.current
      window.scrollTo(element.offsetLeft, element.offsetTop - window.innerHeight + element.clientHeight)
      this.setState({changeFromArrow: false})
    }
  }
  
  showSelectedImage(images, selectedImage){
    const {screenSize} = this.state
    const widthDevice  = this.state.screenSize <800 ?  "100%" : "98.8%"
    let src  
    if(this.props.localUpload)
      src = URL.createObjectURL(images[selectedImage])
    else
      src = adress+images[selectedImage].path
    return <img width={widthDevice} src={src}/>
  }

  render() {
    const { classes } = this.props;
    const {images} = this.props;
    const {selectedImage, screenSize} = this.state;
    const widthParent = screenSize >= 800 ? screenSize * 0.7 : screenSize-30
    const widthDevice  = screenSize <800 ?  "100%" : "98.8%" //mobile or computer

    return (
            images.length > 0 ?
            <div ref={this.positionRef} style={{width: widthParent}}>
                <Tabs value={selectedImage} style={{width: widthDevice, marginBottom: "10px"}} onChange={this.handleChange} variant="scrollable" scrollButtons="on">
                {
                    images.map((image, index) =>{ 
                    let src  
                    if(this.props.localUpload)
                      src = URL.createObjectURL(image)
                    else
                      src = adress+image.path
                    return <Tab key={index} label={<img width={"100%"} src={src} key={index}/> } />
                    })
                }
                </Tabs>
                {
                  
                    selectedImage !== false ?
                    <div>  
                        {
                          
                          this.showSelectedImage(images, selectedImage)

                          // (() => {
                          //  let src  
                          //   if(this.props.localUpload)
                          //     src = URL.createObjectURL(images[selectedImage])
                          //   else
                          //     src = adress+images[selectedImage].path
                          //   return <img width={"100%"} src={src}/>
                          // })()
                        }
                        {
                          
                            <div className={classes.arrowsContainer} ref={this.arrowsPositionRef}>
                              <div style={{width: "64px"}}></div>
                              <div className={classes.spacer}></div>
                            {
                              !this.props.localUpload ?
                              <div>
                              {
                                  selectedImage > 0 ?
                              <Button onClick={this.swipeLeft}><KeyboardArrowLeft /></Button>
                              : 
                              null
                              }
                              {
                                  selectedImage<images.length-1 ? 
                                  <Button onClick={() => this.swipeRight(images.length)}><KeyboardArrowRight /></Button>
                                  :
                                  null
                              }
                              </div>
                              : 
                              null
                             }
                              <div className={classes.spacer}></div>
                              <Button onClick={this.hideImages}><KeyboardArrowUp /></Button>
                            </div>
                        }
                    </div>
                    :
                    null
                }
            </div>
            : 
            null
    );
  }
}

export default withStyles(styles)(Answer);
