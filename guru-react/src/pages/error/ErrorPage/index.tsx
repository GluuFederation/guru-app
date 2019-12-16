import React, { FunctionComponent } from "react";
import { useHistory, useLocation } from "react-router-dom";

import { makeStyles } from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

import { paths } from "../../../routes";
import Page from "../../../components/Page";

import Logo from "../../assets/images/logo.png";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    textAlign: "center",
    paddingTop: "10em",
    paddingBottom: "10em"
  }
});

interface Props {
  errorTitle?: string;
  errorMessage?: string;
  errorActionText?: string;
  errorAction?: string;
  isExternalAction?: boolean;
}

const ErrorPage: FunctionComponent<Props> = ({
  errorTitle,
  errorAction,
  errorActionText,
  errorMessage,
  isExternalAction
}) => {
  const history = useHistory();
  const location = useLocation();
  const classes = useStyles();

  const navigateTo = (
    path: string,
    isExternalAction: boolean = false
  ) => () => {
    if (isExternalAction) {
      window.location.href = path;
    } else {
      history.push(path);
    }
  };

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
              onClick={navigateTo(errorAction, isExternalAction)}
            >
              {errorActionText}
            </Button>
          </Grid>
        </Grid>
      </div>
    </Page>
  );
};

export default ErrorPage;
