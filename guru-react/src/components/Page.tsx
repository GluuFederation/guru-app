import React from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import axios from "axios";

import { paths } from "../routes";
import { WithProfilesProps, withProfiles } from "../state/hocs/profiles";
import { withInfo, WithInfoProps } from "../state/hocs/info";

type Props = WithInfoProps & WithProfilesProps & RouteComponentProps;

class Page extends React.Component<Props> {
  initAuth = () => {
    const profiles = this.props.profiles;
    const { user, token } = profiles;
    const pathname = this.props.match.path;

    const openPaths: Array<string> = [
      paths.HOMEPAGE,
      paths.TICKET_LIST,
      paths.TICKET_DETAIL,
      paths.ERROR_PAGE,
      paths.LOGIN,
      paths.LOGIN_CALLBACK,
      paths.SIGNUP
    ];

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
    this.props.fetchInfo();
  }

  render() {
    return <div>{this.props.children}</div>;
  }
}

export default withRouter(withProfiles(withInfo(Page)));
