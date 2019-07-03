import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";

import { User } from "../state/types/accounts";
import { AppState } from "../state/reducers";
import { paths } from "../routes";
import Page from "../components/Page";
import ButtonLoader from "../components/ButtonLoader";

interface ReduxState {
  user: User | null;
}
interface ReduxDispatch {
  push: (path: string, state?: any) => any;
}

type Props = ReduxDispatch & ReduxState;

class Home extends Component<Props> {
  componentDidMount() {
    if (this.props.user && this.props.user.isVerified) {
      this.props.push(paths.DASHBOARD);
    } else {
      this.props.push(paths.GET_STARTED);
    }
  }

  render() {
    return (
      <Page>
        <ButtonLoader />
      </Page>
    );
  }
}

export default connect(
  (state: AppState) => ({
    user: state.auth.user,
    token: state.auth.token
  }),
  (dispatch: ThunkDispatch<{}, {}, AnyAction>) => ({
    push: (path: string, state?: any) => dispatch(push(path, state))
  })
)(Home);
