import React, { useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import { makeStyles } from "@material-ui/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

import { login } from "../../../state/actions/profiles";
import { paths } from "../../../routes";
import Page from "../../../components/EmptyPage";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    textAlign: "center",
    paddingTop: "10em",
    paddingBottom: "10em"
  }
});

const LoginCallback = () => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const classes = useStyles();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const queryParams = {
      code: searchParams.get("code"),
      scope: searchParams.get("scope"),
      session_id: searchParams.get("session_id"),
      state: searchParams.get("state"),
      session_state: searchParams.get("session_state")
    };
    login(queryParams)(dispatch)
      .then(success => {
        history.push(paths.HOMEPAGE);
      })
      .catch(error => {
        if (
          error &&
          error.response &&
          error.response.data &&
          error.response.data.details &&
          error.response.data.details === "['login-405']"
        ) {
          history.push(paths.ERROR_PAGE, {
            errorTitle: "Email not found",
            errorMessage:
              "We were unable to find an email for this account. Please sign up for a new account",
            errorActionText: "Signup",
            errorAction: process.env.REACT_APP_USERS_BASE,
            isExternalAction: true
          });
        } else {
          history.push(paths.ERROR_PAGE, {
            errorTitle: "Unable to Log you in"
          });
        }
      });
  });

  return (
    <Page>
      <div className={classes.root}>
        <CircularProgress />
        <p>Loading your info...</p>
      </div>
    </Page>
  );
};

export default LoginCallback;
