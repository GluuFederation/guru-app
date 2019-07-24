import React, { Component } from "react";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";

import { InfoState, AppState } from "../types/state";
import { fetchInfo } from "../actions/info";

export interface WithInfoState {
  info: InfoState
}

export interface WithInfoDispatch {
  fetchInfo: () => Promise<boolean>
}

export type WithInfoProps = WithInfoState & WithInfoDispatch;

export const withInfo = <P extends WithInfoProps>(
  WrappedComponent: React.ComponentType<P>
) => {
  class WithInfo extends Component<WithInfoProps> {
    render() {
      return (
        <WrappedComponent {...this.props as P} />
      );
    }
  }

  return connect<WithInfoState, WithInfoDispatch, any, any>(
    (state: AppState) => ({
      info: state.info
    }),
    (dispatch: ThunkDispatch<{}, {}, AnyAction>) => ({
      fetchInfo: () => dispatch(fetchInfo()),
    })
  )(WithInfo);
};
