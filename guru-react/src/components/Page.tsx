import React from "react";
import { connect } from "react-redux";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { push } from "connected-react-router";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import axios from "axios";

import { AppState } from "../state/reducers";
import { User } from "../state/types/profiles";
import { paths } from "../routes";
import { logoutUser, RemoveUserAction } from "../state/actions/auth";
import {
  ClearSelectedTestsAction,
  clearSelectedTests
} from "../state/actions/tests";
import { askForPermissioToReceiveNotifications } from "../push-notifications";

interface ReduxState {
  user: User | null;
  token: string;
}

interface State {
  isTermsModalOpen: boolean;
  isConfirmationModalOpen: boolean;
}

interface ReduxDispatch {
  push: (path: string, state?: any) => any;
  logoutUser: () => RemoveUserAction;
  clearSelectedTests: () => ClearSelectedTestsAction;
}

type Props = ReduxState & ReduxDispatch & RouteComponentProps;

class Page extends React.Component<Props, State> {
  initAuth = () => {
    const { user, token } = this.props;
    const pathname = this.props.location.pathname;

    if (!pathname.startsWith("/auth") && !pathname.startsWith("/terms")) {
      if (!user) {
        this.props.push(paths.GET_STARTED);
        return;
      } else if (!user.isVerified) {
        this.props.push(paths.GET_STARTED, {
          message: "You need to complete the login process to use this app."
        });
      }
    }

    if (token)
      axios.defaults.headers.common["Authorization"] = `Token ${token}`;

    const selectTestPages = [
      paths.SELECT_TEST_ENTRY,
      paths.SELECT_TEST_VIEW,
      paths.BMI_ENTRY,
      paths.BP_ENTRY,
      paths.GLUCOSE_ENTRY,
      paths.CHOLESTEROL_ENTRY,
      paths.ANEMIA_ENTRY,
      paths.PREGNANCY_ENTRY,
      paths.TYPHOID_ENTRY,
      paths.HEPATITIS_ENTRY,
      paths.MALARIA_ENTRY
    ];
    const path = this.props.match.path;
    if (!selectTestPages.includes(path)) {
      this.props.clearSelectedTests();
    }
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
    askForPermissioToReceiveNotifications();
  }

  render() {
    return <div>{this.props.children}</div>;
  }
}

export default connect(
  (state: AppState) => ({
    user: state.auth.user,
    token: state.auth.token
  }),
  (dispatch: ThunkDispatch<{}, {}, AnyAction>) => ({
    push: (path: string, state?: any) => dispatch(push(path, state)),
    logoutUser: () => dispatch(logoutUser()),
    clearSelectedTests: () => dispatch(clearSelectedTests())
  })
)(withRouter(Page));
