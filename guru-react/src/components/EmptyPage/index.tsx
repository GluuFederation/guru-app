import React, { FunctionComponent } from "react";

import Page from "../Page";
import Navbar from "../Navbar";
import Footer from "../Footer";

interface Props {
  removeRootStyle?: boolean;
}

const EmptyPage: FunctionComponent<Props> = ({ removeRootStyle, children }) => {
  return (
    <Page>
      <Navbar />
      <div className={removeRootStyle ? "" : "app-body"}>{children}</div>
      <Footer />
    </Page>
  );
};

export default EmptyPage;
