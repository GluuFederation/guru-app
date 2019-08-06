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

class LoginCallback extends Component<Props> {
  componentDidMount() {
    const searchParams = new URLSearchParams(this.props.location.search);
    const queryParams = {
      code: searchParams.get("code"),
      scope: searchParams.get("scope"),
      session_id: searchParams.get("session_id"),
      state: searchParams.get("state"),
      session_state: searchParams.get("session_state")
    };
    this.props
      .login(queryParams)
      .then(success => {
        this.props.history.push(paths.HOMEPAGE);
      })
      .catch(error => {
        if (
          error &&
          error.response &&
          error.response.data &&
          error.response.data.details &&
          error.response.data.details === "['login-405']"
        ) {
          this.props.history.push(paths.ERROR_PAGE, {
            errorTitle: "Email not found",
            errorMessage:
              "We were unable to find an email for this account. Please sign up for a new account",
            errorActionText: "Signup",
            errorAction: process.env.REACT_APP_USERS_BASE,
            isExternalAction: true
          });
        } else {
          this.props.history.push(paths.ERROR_PAGE, {
            errorTitle: "Unable to Log you in"
          });
        }
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
            <p>Logging you in...</p>
          </div>
        </div>
        <Footer />
      </Page>
    );
  }
}

export default withProfiles(withRouter(withStyles(styles)(LoginCallback)));