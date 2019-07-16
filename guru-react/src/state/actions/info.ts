import axios from "axios";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";

import actions from "./constants";
import {
  TicketCategory,
  TicketIssueType,
  GluuProduct,
  TicketStatus,
  Permission,
  UserRole
} from "../types/info";

export interface SetCategoriesAction {
  type: string;
  categories: Array<TicketCategory>;
}

export interface SetIssueTypesAction {
  type: string;
  issueTypes: Array<TicketIssueType>;
}

export interface SetProductsAction {
  type: string;
  products: Array<GluuProduct>;
}

export interface SetStatusesAction {
  type: string;
  statuses: Array<TicketStatus>;
}

export interface SetPermissionsAction {
  type: string;
  permissions: Array<Permission>;
}

export interface SetUserRolesAction {
  type: string;
  userRoles: Array<UserRole>;
}

export interface ResetInfoState {
  type: string;
}

export type InfoAction =
  | SetCategoriesAction
  | SetIssueTypesAction
  | SetProductsAction
  | SetStatusesAction
  | SetPermissionsAction
  | SetUserRolesAction
  | ResetInfoState;

export const setCategories = (
  categories: Array<TicketCategory>
): SetCategoriesAction => ({
  type: actions.SET_CATEGORIES,
  categories
});

export const setProducts = (
  products: Array<GluuProduct>
): SetProductsAction => ({
  type: actions.SET_PRODUCTS,
  products
});

export const setIssueTypes = (
  issueTypes: Array<TicketIssueType>
): SetIssueTypesAction => ({
  type: actions.SET_ISSUE_TYPES,
  issueTypes
});

export const setStatuses = (
  statuses: Array<TicketStatus>
): SetStatusesAction => ({
  type: actions.SET_STATUSES,
  statuses
});

export const setPermissions = (
  permissions: Array<Permission>
): SetPermissionsAction => ({
  type: actions.SET_PERMISSIONS,
  permissions
});

export const setUserRoles = (
  userRoles: Array<UserRole>
): SetUserRolesAction => ({
  type: actions.SET_USER_ROLES,
  userRoles
});

export const resetInfoState = (): ResetInfoState => ({
  type: actions.RESET_INFO_STATE
});

export const fetchInfo = () => {
  return async (
    dispatch: ThunkDispatch<{}, {}, AnyAction>
  ): Promise<boolean> => {
    const URL = `${process.env.REACT_APP_API_BASE}/api/v1/info/all/`;
    return axios.get(URL).then(response => {
      const results = response.data.results;
      dispatch(setCategories(results.categories));
      dispatch(setProducts(results.products));
      dispatch(setIssueTypes(results.types));
      dispatch(setStatuses(results.statuses));
      dispatch(setPermissions(results.permissions));
      dispatch(setUserRoles(results.userRoles));
      return Promise.resolve(true);
    });
  };
};
