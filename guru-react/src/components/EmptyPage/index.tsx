import React, { FunctionComponent } from "react";

import Page from "../Page";
import Navbar from "../Navbar";
import Footer from "../Footer";
import ConfirmationModal from "../ConfirmationModal";

interface Props {
  removeRootStyle?: boolean;
  confirmNavigation?: boolean;
}

const EmptyPage: FunctionComponent<Props> = ({
  removeRootStyle,
  confirmNavigation,
  children
}) => {
  return (
    <Page>
      <Navbar confirmNavigation={confirmNavigation} />
      <div className={removeRootStyle ? "" : "app-body"}>{children}</div>
      <Footer confirmNavigation={confirmNavigation} />
      <ConfirmationModal />
    </Page>
  );
};

export default EmptyPage;
