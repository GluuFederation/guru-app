import React, { Component } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";

import { withStyles, WithStyles, createStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

import { paths } from "../../routes";
import { withProfiles, WithProfilesProps } from "../../state/hocs/profiles";
import Page from "../../components/Page";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      textAlign: "center",
      paddingTop: "10em",
      paddingBottom: "10em"
    }
  });

type Props = WithStyles<typeof styles> &
  RouteComponentProps &
  WithProfilesProps;

class SignupRedirect extends Component<Props> {
  componentDidMount() {
    this.props
      .getSignupUrl()
      .then(url => {
        window.location.href = url;
      })
      .catch(() => {
        this.props.history.push(paths.ERROR_PAGE, {
          errorTitle: "Unable to Sign you up"
        });
      });
  }
  render() {
    const { classes } = this.props;
    return (
      <Page>
        <Navbar />
        <div className="app-body">
          <div className={classes.root}>
            <CircularProgress />
            <p>Redirecting you to Gluu Users ...</p>
          </div>
        </div>
        <Footer />
      </Page>
    );
  }
}

export default withProfiles(withStyles(styles)(withRouter(SignupRedirect)));
