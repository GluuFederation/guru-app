import { useDispatch } from "react-redux";

import * as actions from "../../actions/profiles";
import { User, Company, TeamMember } from "../../types/profiles";

const useProfileActions = () => {
  const dispatch = useDispatch();

  const saveUser = (user: User) => dispatch(actions.saveUser(user));
  const saveToken = (token: string) => dispatch(actions.saveToken(token));
  const addAssociatedCompany = (company: Company) =>
    dispatch(actions.addAssociatedCompany(company));
  const removeAssociatedCompany = (company: Company) =>
    dispatch(actions.removeAssociatedCompany(company));
  const setAssociatedCompanies = (companies: Array<Company>) =>
    dispatch(actions.setAssociatedCompanies(companies));
  const clearAssociatedCompanies = () =>
    dispatch(actions.clearAssociatedCompanies());
  const addTeamMember = (member: TeamMember) =>
    dispatch(actions.addTeamMember(member));
  const addInvitee = (member: TeamMember) =>
    dispatch(actions.addInvitee(member));
  const removeInvitee = (member: TeamMember) =>
    dispatch(actions.removeInvitee(member));
  const removeTeamMember = (member: TeamMember) =>
    dispatch(actions.removeTeamMember(member));
  const resetProfileState = () => dispatch(actions.resetProfileState());
  const getLoginUrl = () => actions.getLoginUrl()(dispatch);
  const login = (queryParams: object) => actions.login(queryParams)(dispatch);
  const getSignupUrl = () => actions.getSignupUrl()(dispatch);
  const inviteTeamMember = (invitee: TeamMember) =>
    actions.inviteTeamMember(invitee)(dispatch);
  const deleteTeamMember = (member: TeamMember) =>
    actions.deleteTeamMember(member)(dispatch);
  const updateTeamMemberRole = (member: TeamMember) =>
    actions.updateTeamMemberRole(member)(dispatch);
  const cancelInvitation = (invitee: TeamMember) =>
    actions.updateTeamMemberRole(invitee)(dispatch);
  const getAssociatedCompanies = () =>
    actions.getAssociatedCompanies()(dispatch);
  const getTeamMembers = () => actions.getTeamMembers()(dispatch);
  const getInvitees = () => actions.getInvitees()(dispatch);
  const leaveAssociatedCompany = (company: Company) =>
    actions.leaveAssociatedCompany(company)(dispatch);

  return {
    saveUser,
    saveToken,
    addAssociatedCompany,
    removeAssociatedCompany,
    setAssociatedCompanies,
    clearAssociatedCompanies,
    addTeamMember,
    addInvitee,
    removeInvitee,
    removeTeamMember,
    resetProfileState,
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
  };
};

export default useProfileActions;
