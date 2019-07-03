import React, { Component } from "react";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";

import { ProfilesState, AppState } from "../types/state";
import { TeamMember, Company, User } from "../types/profiles";
import {
  getLoginUrl,
  login,
  getSignupUrl,
  inviteTeamMember,
  deleteTeamMember,
  updateTeamMemberRole,
  cancelInvitation,
  getAssociatedCompanies,
  getTeamMembers,
  getInvitees,
  leaveAssociatedCompany
} from "../actions/profiles";

export interface WithProfilesState {
  profiles: ProfilesState;
}

export interface WithProfilesDispatch {
  getLoginUrl: () => Promise<string>;
  login: (queryParams: object) => Promise<boolean>;
  getSignupUrl: () => Promise<string>;
  inviteTeamMember: (invitee: TeamMember) => Promise<TeamMember>;
  deleteTeamMember: (member: TeamMember) => Promise<boolean>;
  updateTeamMemberRole: (member: TeamMember) => Promise<TeamMember>;
  cancelInvitation: (invitee: TeamMember) => Promise<boolean>;
  getAssociatedCompanies: () => Promise<Array<Company>>;
  getTeamMembers: () => Promise<Array<TeamMember>>;
  getInvitees: () => Promise<Array<TeamMember>>;
  leaveAssociatedCompany: (company: Company) => Promise<boolean>;
}

export type WithProfilesProps = WithProfilesState & WithProfilesDispatch;

export interface WithUserProps {
  user: User | null;
}

export const withProfiles = <P extends WithProfilesProps>(
  WrappedComponent: React.ComponentType<P>
) => {
  class WithProfiles extends Component<WithProfilesProps> {
    render() {
      return (
        <WrappedComponent {...this.props as P} />
      );
    }
  }

  return connect<WithProfilesState, WithProfilesDispatch, any, any>(
    (state: AppState) => ({
      profiles: state.profiles
    }),
    (dispatch: ThunkDispatch<{}, {}, AnyAction>) => ({
      getLoginUrl: () => dispatch(getLoginUrl()),
      login: (queryParams: object) => dispatch(login(queryParams)),
      getSignupUrl: () => dispatch(getSignupUrl()),
      inviteTeamMember: (invitee: TeamMember) =>
        dispatch(inviteTeamMember(invitee)),
      deleteTeamMember: (member: TeamMember) =>
        dispatch(deleteTeamMember(member)),
      updateTeamMemberRole: (member: TeamMember) =>
        dispatch(updateTeamMemberRole(member)),
      cancelInvitation: (invitee: TeamMember) =>
        dispatch(cancelInvitation(invitee)),
      getAssociatedCompanies: () => dispatch(getAssociatedCompanies()),
      getTeamMembers: () => dispatch(getTeamMembers()),
      getInvitees: () => dispatch(getInvitees()),
      leaveAssociatedCompany: (company: Company) =>
        dispatch(leaveAssociatedCompany(company))
    })
  )(WithProfiles);
};

export const withUser = <P extends WithUserProps>(WrappedComponent: React.ComponentType<P>) => {
  class WithUser extends Component<WithUserProps> {
    render() {
      return <WrappedComponent {...this.props as P}></WrappedComponent>
    }
  }

  return connect<WithUserProps, {}, any, any>(
    (state: AppState) => ({
      user: state.profiles.user
    })
  )(WithUser)
}
