import React, { FunctionComponent } from "react";

import Page from "../Page";
import Navbar from "../Navbar";
import Footer from "../Footer";

const EmptyPage: FunctionComponent = ({ children }) => {
  return (
    <Page>
      <Navbar />
      <div className="app-body">{children}</div>
      <Footer />
    </Page>
  );
};

export default EmptyPage;
