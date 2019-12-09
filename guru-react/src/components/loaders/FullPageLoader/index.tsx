import React from "react";

import CircularProgress from "@material-ui/core/CircularProgress";

import Page from "../../EmptyPage";

export default function FullPageLoader() {
  return (
    <Page>
      <CircularProgress />
    </Page>
  );
}
