import actions from "../actions/constants";
import * as profileActions from "../actions/profiles";
import { ProfilesState } from "../types/state";
import { anonymousUser } from "../preloaded/profiles";

const initialState: ProfilesState = {
  user: anonymousUser,
  token: "",
  associatedCompanies: [],
  teamMembers: [],
  invitees: []
};

const notificationsReducer = (
  state: ProfilesState = initialState,
  action: profileActions.ProfileAction
): ProfilesState => {
  switch (action.type) {
    case actions.SAVE_USER:
      const user = (action as profileActions.SaveUserAction).user;
      return {
        ...state,
        user: { ...user }
      };
    case actions.SAVE_TOKEN:
      const token = (action as profileActions.SaveTokenAction).token;
      return {
        ...state,
        token
      };
    case actions.ADD_ASSOCIATED_COMPANY:
      const aCompany = (action as profileActions.AddAssociatedCompanyAction)
        .company;
      return {
        ...state,
        associatedCompanies: [
          ...state.associatedCompanies.filter(item => item.id !== aCompany.id),
          aCompany
        ]
      };
    case actions.REMOVE_ASSOCIATED_COMPANY:
      const rCompany = (action as profileActions.RemoveAssociatedCompanyAction)
        .company;
      return {
        ...state,
        associatedCompanies: [
          ...state.associatedCompanies.filter(item => item.id !== rCompany.id)
        ],
        teamMembers: [
          ...state.teamMembers.filter(
            member => member.companyId !== rCompany.id
          )
        ]
      };
    case actions.CLEAR_ASSOCIATED_COMPANIES:
      return {
        ...state,
        associatedCompanies: [],
        teamMembers: [
          ...state.teamMembers.filter(
            member =>
              state.user !== null &&
              state.user.company !== null &&
              member.companyId === state.user.company.id
          )
        ]
      };
    case actions.SET_ASSOCIATED_COMPANIES:
      const companies = (action as profileActions.SetAssociatedCompaniesAction)
        .companies;
      return {
        ...state,
        associatedCompanies: [...companies]
      };
    case actions.ADD_TEAM_MEMBER:
      const { member } = action as profileActions.AddTeamMemberAction;
      return {
        ...state,
        teamMembers: [
          ...state.teamMembers.filter(item => item.id !== member.id),
          member
        ]
      };
    case actions.REMOVE_TEAM_MEMBER:
      const rMember = (action as profileActions.RemoveTeamMemberAction).member;
      return {
        ...state,
        teamMembers: [
          ...state.teamMembers.filter(member => member.id !== rMember.id)
        ]
      };
    case actions.ADD_INVITEE:
      const invitee = (action as profileActions.AddInviteeAction).member;
      return {
        ...state,
        invitees: [
          ...state.invitees.filter(item => item.id !== invitee.id),
          invitee
        ]
      };
    case actions.REMOVE_INVITEE:
      const cInvitee = (action as profileActions.RemoveInviteeAction).member;
      return {
        ...state,
        invitees: [
          ...state.invitees.filter(invitee => invitee.id !== cInvitee.id)
        ]
      };
    case actions.RESET_PROFILE_STATE:
      return { ...initialState };
    default:
      return state;
  }
};

export default notificationsReducer;
