import React from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import axios from "axios";

import { paths } from "../routes";
import { WithProfilesProps, withProfiles } from "../state/hocs/profiles";

type Props = WithProfilesProps & RouteComponentProps;

class Page extends React.Component<Props> {
  initAuth = () => {
    const profiles = this.props.profiles;
    const { user, token } = profiles;
    const pathname = this.props.match.path;

    const openPaths: Array<string> = [paths.HOMEPAGE];

    if (!openPaths.includes(pathname)) {
      if (!user) {
        this.props.history.push(paths.LOGIN);
        return;
      }
    }

    if (token)
      axios.defaults.headers.common["Authorization"] = `Token ${token}`;
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      isConfirmationModalOpen: false,
      isTermsModalOpen: false
    };
  }

  componentDidMount() {
    this.initAuth();
  }

  render() {
    return <div>{this.props.children}</div>;
  }
}

export default withRouter(withProfiles(Page));