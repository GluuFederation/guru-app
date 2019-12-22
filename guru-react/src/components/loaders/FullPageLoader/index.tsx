import React from "react";

import { makeStyles } from "@material-ui/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

import Page from "../../EmptyPage";

const useStyles = makeStyles({
  root: {
    textAlign: "center",
    paddingTop: "10em",
    paddingBottom: "10em"
  }
});

export default function FullPageLoader() {
  const classes = useStyles();

  return (
    <Page>
      <div className={classes.root}>
        <CircularProgress />
      </div>
    </Page>
  );
}
