import React, { Component } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";

import { withStyles, WithStyles, createStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

import { paths } from "../../routes";
import Page from "../../components/Page";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

import Logo from "../../assets/images/logo.png";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      textAlign: "center",
      paddingTop: "10em",
      paddingBottom: "10em"
    }
  });

interface ExternalProps {
  errorTitle?: string;
  errorMessage?: string;
  errorActionText?: string;
  errorAction?: string;
  isExternalAction?: boolean;
}

type Props = ExternalProps & WithStyles<typeof styles> & RouteComponentProps;

class ErrorPage extends Component<Props> {
  navigateTo = (path: string, isExternalAction: boolean = false) => () => {
    if (isExternalAction) {
      window.location.href = path;
    } else {
      this.props.history.push(path);
    }
  };

  render() {
    let {
      classes,
      location,
      errorAction,
      errorActionText,
      errorMessage,
      errorTitle,
      isExternalAction
    } = this.props;
    const { state } = location;

    if (state) {
      if (state.errorTitle) errorTitle = state.errorTitle;
      if (state.errorMessage) errorMessage = state.errorMessage;
      if (state.errorActionText) errorActionText = state.errorActionText;
      if (state.errorAction) errorAction = state.errorAction;
      if (state.isExternalAction !== undefined)
        isExternalAction = !!state.isExternalAction;
    }

    if (!errorTitle) errorTitle = "It's not you, it's us.";
    if (!errorMessage)
      errorMessage =
        "We ran into a problem fulfilling your request. Don't worry, you did not do anything wrong. Our developers have been notified and we're working on the issue now. In the mean time, why don't you...";
    if (!errorActionText) errorActionText = "Go home";
    if (!errorAction) errorAction = paths.HOMEPAGE;

    return (
      <Page>
        <Navbar />
        <div className="app-body">
          <div className={classes.root}>
            <Grid container spacing={6} alignItems="center" justify="center">
              <Grid item md={6}>
                <img src={Logo} alt="" /> <br />
                <br />
                <Typography variant="h4">{errorTitle}</Typography>
                <p>{errorMessage}</p>
                <Button
                  color="primary"
                  variant="outlined"
                  onClick={this.navigateTo(errorAction, isExternalAction)}
                >
                  {errorActionText}
                </Button>
              </Grid>
            </Grid>
          </div>
        </div>
        <Footer />
      </Page>
    );
  }
}

export default withStyles(styles)(withRouter(ErrorPage));
