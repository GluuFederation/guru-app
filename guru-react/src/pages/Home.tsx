import React, { Component } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";

import { WithProfilesProps, withProfiles } from "../state/hocs/profiles";
import { paths } from "../routes";
import Page from "../components/Page";

type Props = WithProfilesProps & RouteComponentProps;

class Home extends Component<Props> {
  render() {
    console.log(this.props)
    return (
      <Page>
        <div>Welcome to the homepage</div>
      </Page>
    );
  }
}

export default withRouter(withProfiles(Home));
