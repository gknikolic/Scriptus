import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import Appbar from "../components/sharedComponents/appbars/Appbar";
import YearHeading from "../components/sharedComponents/headings/PagesForSelection";
import Typography from '@material-ui/core/Typography';
import BottomBar from "../components/sharedComponents/appbars/Bottom";

const styles = {
  container: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column"
  },

  backgroundColor: {
    backgroundColor: "#164da7",
    color: "white",
    margin: "0px 20px 10px 20px",
    borderRadius: "5% 5%",
    minHeight: "60px",
    "&:hover": {
      backgroundColor: "#133e86", 
    }
  },

  fontType: {
    textTransform: "none",
  },

  spacer: {
    flexGrow: 1,
    
  },

};

export class YearSelection extends Component {
  state = {
    years: ["Prva godina", "Druga godina", "Treća godina", "Četvrta godina"],
    route: null
  };

  handleOnClick = (index, year, setYear) => {
    setYear(year);

    // let delay = null;
    // if (window.innerWidth < 600) delay = 75;

    // setTimeout(
    //   () =>
    //     this.setState({
    //       route: index === 0 ? "/SubjectSelection" : "/DepartmentSelection"
    //     }),
    //   delay
    // );

    this.setState({
      route: index === 0 ? "/SubjectSelection" : "/DepartmentSelection"
    })
  };

  render() {
    const { years, route } = this.state;
    const { classes } = this.props;

    const layout =
      route !== null ? (
        <Redirect push to={route} />
      ) : (
        <div className={classes.container}>
          <Appbar />
          <YearHeading>Odaberite godinu</YearHeading>
          {years.map((year, index) => (
            <Button
              key={year}
              onClick={() =>
                this.handleOnClick(index, year, this.props.yearOfStudy)
              }
              className={classes.backgroundColor}
            >
              <Typography variant="h4" color="inherit" className={classes.fontType}>{year}</Typography>
            </Button>
          ))}
          <div className={classes.spacer}></div>
          <BottomBar/>
        </div>
      );
    return layout;
  }
}

export default withStyles(styles)(YearSelection);
