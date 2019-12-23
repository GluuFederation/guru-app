import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import { makeStyles } from "@material-ui/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

import { getLoginUrl } from "../../../state/actions/profiles";
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

const LoginRedirect = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    getLoginUrl()(dispatch)
      .then(url => {
        window.location.href = url;
      })
      .catch(() => {
        history.push(paths.ERROR_PAGE, {
          errorTitle: "Unable to Log you in"
        });
      });
  });
  return (
    <Page>
      <div className={classes.root}>
        <CircularProgress />
        <p>Redirecting you to Gluu IDP...</p>
      </div>
    </Page>
  );
};

export default LoginRedirect;
