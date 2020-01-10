import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import { makeStyles } from "@material-ui/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

import { getSignupUrl } from "../../../state/actions/profiles";
import { paths } from "../../../routes";
import { withProfiles, WithProfilesProps } from "../../../state/hocs/profiles";
import Page from "../../../components/Page";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    textAlign: "center",
    paddingTop: "10em",
    paddingBottom: "10em"
  }
});

const SignupRedirect = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    getSignupUrl()(dispatch)
      .then(url => {
        window.location.href = url;
      })
      .catch(() => {
        history.push(paths.ERROR_PAGE, {
          errorTitle: "Unable to Sign you up"
        });
      });
  });
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
};

export default SignupRedirect;
