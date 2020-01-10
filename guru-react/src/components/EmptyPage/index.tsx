import React, { FunctionComponent, useEffect } from "react";
import { useLocation } from "react-router-dom";

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
  const location = useLocation();
  const { pathname, search } = location;
  useEffect(() => {
    const html = document.getElementsByTagName("html")[0];
    if (html) html.scrollTop = 0;
  }, [pathname, search]);

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
