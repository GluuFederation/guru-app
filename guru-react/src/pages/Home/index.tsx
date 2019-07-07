import React, { Component } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";

import { WithProfilesProps, withProfiles } from "../../state/hocs/profiles";
import { paths } from "../../routes";
import Page from "../../components/Page";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

type Props = WithProfilesProps & RouteComponentProps;

class Home extends Component<Props> {
  render() {
    return (
      <Page>
        <Navbar />
        <div>Welcome to the homepage</div>
        <Footer />
      </Page>
    );
  }
}

export default withRouter(withProfiles(Home));
