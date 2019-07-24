import axios from "axios";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { User, Company, TeamMember } from "../types/profiles";
import actions from "./constants";

export interface SaveUserAction {
  type: string;
  user: User;
}

export interface SaveTokenAction {
  type: string;
  token: string;
}

export interface AddAssociatedCompanyAction {
  type: string;
  company: Company;
}

export interface RemoveAssociatedCompanyAction {
  type: string;
  company: Company;
}

export interface ClearAssociatedCompaniesAction {
  type: string;
}

export interface SetAssociatedCompaniesAction {
  type: string;
  companies: Array<Company>;
}

export interface AddTeamMemberAction {
  type: string;
  member: TeamMember;
}

export interface AddInviteeAction {
  type: string;
  member: TeamMember;
}

export interface RemoveInviteeAction {
  type: string;
  member: TeamMember;
}

export interface RemoveTeamMemberAction {
  type: string;
  member: TeamMember;
}

export interface ChangeTeamMemberRoleAction {
  type: string;
  member: TeamMember;
}

export interface ResetProfileStateAction {
  type: string;
}

export type ProfileAction =
  | SaveUserAction
  | SaveTokenAction
  | AddAssociatedCompanyAction
  | RemoveAssociatedCompanyAction
  | ClearAssociatedCompaniesAction
  | SetAssociatedCompaniesAction
  | AddTeamMemberAction
  | RemoveInviteeAction
  | AddInviteeAction
  | RemoveTeamMemberAction
  | ChangeTeamMemberRoleAction
  | ResetProfileStateAction;

export const saveUser = (user: User): SaveUserAction => ({
  type: actions.SAVE_USER,
  user
});

export const saveToken = (token: string): SaveTokenAction => ({
  type: actions.SAVE_TOKEN,
  token
});

export const addAssociatedCompany = (
  company: Company
): AddAssociatedCompanyAction => ({
  type: actions.ADD_ASSOCIATED_COMPANY,
  company
});

export const removeAssociatedCompany = (
  company: Company
): RemoveAssociatedCompanyAction => ({
  type: actions.REMOVE_ASSOCIATED_COMPANY,
  company
});

export const setAssociatedCompanies = (
  companies: Array<Company>
): SetAssociatedCompaniesAction => ({
  type: actions.SET_ASSOCIATED_COMPANIES,
  companies
});

export const clearAssociatedCompanies = (): ClearAssociatedCompaniesAction => ({
  type: actions.CLEAR_ASSOCIATED_COMPANIES
});

export const addTeamMember = (member: TeamMember): AddTeamMemberAction => ({
  type: actions.ADD_TEAM_MEMBER,
  member
});

export const addInvitee = (member: TeamMember): AddInviteeAction => ({
  type: actions.ADD_INVITEE,
  member
});

export const removeInvitee = (member: TeamMember): RemoveInviteeAction => ({
  type: actions.REMOVE_INVITEE,
  member
});

export const removeTeamMember = (
  member: TeamMember
): RemoveTeamMemberAction => ({
  type: actions.REMOVE_TEAM_MEMBER,
  member
});

export const resetProfileState = (): ResetProfileStateAction => ({
  type: actions.RESET_PROFILE_STATE
});

export const getLoginUrl = () => {
  return async (
    dispatch: ThunkDispatch<{}, {}, AnyAction>
  ): Promise<string> => {
    const URL = `${
      process.env.REACT_APP_API_BASE
    }/api/v1/auth/get-authorization-url/`;
    const params = { app: "guru" };
    return axios.get(URL, { params }).then(response => {
      const results = response.data.results;
      return Promise.resolve(results.loginUrl);
    });
  };
};

export const login = (queryParams: object) => {
  return async (
    dispatch: ThunkDispatch<{}, {}, AnyAction>
  ): Promise<boolean> => {
    const URL = `${process.env.REACT_APP_API_BASE}/api/v1/auth/login-callback/`;
    const params = { ...queryParams, app: "guru" };
    return axios.get(URL, { params }).then(response => {
      const user = response.data.results;
      const token = user.token;
      axios.defaults.headers.common["Authorization"] = `Token ${token}`;
      dispatch(saveUser(user));
      dispatch(saveToken(token));
      return Promise.resolve(true);
    });
  };
};

export const getSignupUrl = () => {
  return async (
    dispatch: ThunkDispatch<{}, {}, AnyAction>
  ): Promise<string> => {
    const URL = `${process.env.REACT_APP_API_BASE}/api/v1/auth/get-signup-url/`;
    const params = { app: "guru" };
    return axios.get(URL, { params }).then(response => {
      const results = response.data.results;
      return Promise.resolve(results.signupUrl);
    });
  };
};

export const inviteTeamMember = (invitee: TeamMember) => {
  return async (
    dispatch: ThunkDispatch<{}, {}, AnyAction>
  ): Promise<TeamMember> => {
    const URL = `${process.env.REACT_APP_API_BASE}/api/v1/companies/${
      invitee.companyId
    }/invite/`;
    const body = { ...invitee };
    return axios.post(URL, { ...body }).then(response => {
      const results = response.data.results;
      const userExists = response.data.userExists;
      if (userExists) {
        dispatch(addTeamMember(results));
      } else {
        dispatch(addInvitee(results));
      }
      return Promise.resolve(results);
    });
  };
};

export const deleteTeamMember = (member: TeamMember) => {
  return async (
    dispatch: ThunkDispatch<{}, {}, AnyAction>
  ): Promise<boolean> => {
    const URL = `${process.env.REACT_APP_API_BASE}/api/v1/companies/${
      member.companyId
    }/remove-user/`;
    const body = { ...member };
    return axios.post(URL, { ...body }).then(response => {
      dispatch(removeTeamMember(member));
      return Promise.resolve(true);
    });
  };
};

export const updateTeamMemberRole = (member: TeamMember) => {
  return async (
    dispatch: ThunkDispatch<{}, {}, AnyAction>
  ): Promise<TeamMember> => {
    const URL = `${process.env.REACT_APP_API_BASE}/api/v1/companies/${
      member.companyId
    }/update-role/`;
    const body = { ...member };
    return axios.post(URL, { ...body }).then(response => {
      dispatch(addTeamMember(member));
      return Promise.resolve(member);
    });
  };
};

export const cancelInvitation = (invitee: TeamMember) => {
  return async (
    dispatch: ThunkDispatch<{}, {}, AnyAction>
  ): Promise<boolean> => {
    const URL = `${process.env.REACT_APP_API_BASE}/api/v1/invitations/${
      invitee.id
    }/cancel/`;
    const body = { ...invitee };
    return axios.post(URL, { ...body }).then(response => {
      dispatch(removeInvitee(invitee));
      return Promise.resolve(true);
    });
  };
};

export const getAssociatedCompanies = () => {
  return async (
    dispatch: ThunkDispatch<{}, {}, AnyAction>
  ): Promise<Array<Company>> => {
    const URL = `${process.env.REACT_APP_API_BASE}/api/v1/companies/`;
    return axios.get(URL).then(response => {
      const results = response.data.results;
      dispatch(setAssociatedCompanies(results));
      return Promise.resolve(results);
    });
  };
};

export const getTeamMembers = () => {
  return async (
    dispatch: ThunkDispatch<{}, {}, AnyAction>
  ): Promise<Array<TeamMember>> => {
    const URL = `${
      process.env.REACT_APP_API_BASE
    }/api/v1/companies/team-members/`;
    return axios.get(URL).then(response => {
      const results = response.data.results;
      results.forEach((member: TeamMember) => {
        dispatch(addTeamMember(member));
      });
      return Promise.resolve(results);
    });
  };
};

export const getInvitees = () => {
  return async (
    dispatch: ThunkDispatch<{}, {}, AnyAction>
  ): Promise<Array<TeamMember>> => {
    const URL = `${
      process.env.REACT_APP_API_BASE
    }/api/v1/companies/invitations/`;
    return axios.get(URL).then(response => {
      const results = response.data.results;
      results.forEach((invitee: TeamMember) => {
        dispatch(addInvitee(invitee));
      });
      return Promise.resolve(results);
    });
  };
};

export const leaveAssociatedCompany = (company: Company) => {
  return async (
    dispatch: ThunkDispatch<{}, {}, AnyAction>
  ): Promise<boolean> => {
    const URL = `${process.env.REACT_APP_API_BASE}/api/v1/companies/${
      company.id
    }/leave/`;
    return axios.post(URL).then(response => {
      dispatch(removeAssociatedCompany(company));
      return Promise.resolve(true);
    });
  };
};
