import { useDispatch } from "react-redux";

import * as actions from "../../actions/info";
import {
  TicketCategory,
  GluuProduct,
  TicketIssueType,
  TicketStatus,
  Permission,
  UserRole
} from "../../types/info";

const useInfoActions = () => {
  const dispatch = useDispatch();

  const setCategories = (categories: Array<TicketCategory>) =>
    dispatch(actions.setCategories(categories));
  const setProducts = (products: Array<GluuProduct>) =>
    dispatch(actions.setProducts(products));
  const setIssueTypes = (issueTypes: Array<TicketIssueType>) =>
    dispatch(actions.setIssueTypes(issueTypes));
  const setStatuses = (statuses: Array<TicketStatus>) =>
    dispatch(actions.setStatuses(statuses));
  const setPermissions = (permissions: Array<Permission>) =>
    dispatch(actions.setPermissions(permissions));
  const setUserRoles = (userRoles: Array<UserRole>) =>
    dispatch(actions.setUserRoles(userRoles));
  const setConfirmationPath = (path: string) =>
    dispatch(actions.setConfirmationPath(path));
  const setConfirmationText = (text: string) =>
    dispatch(actions.setConfirmationText(text));
  const setConfirmationExceptions = (exceptions: Array<string>) =>
    dispatch(actions.setConfirmationExceptions(exceptions));
  const resetInfoState = () => dispatch(actions.resetInfoState());
  const fetchInfo = () => actions.fetchInfo()(dispatch);

  return {
    setCategories,
    setProducts,
    setIssueTypes,
    setStatuses,
    setPermissions,
    setUserRoles,
    setConfirmationPath,
    setConfirmationText,
    setConfirmationExceptions,
    resetInfoState,
    fetchInfo
  };
};

export default useInfoActions;
