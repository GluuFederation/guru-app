import actions from "../actions/constants";
import * as infoActions from "../actions/info";
import { InfoState } from "../types/state";

const initialState: InfoState = {
  categories: [],
  statuses: [],
  issueTypes: [],
  permissions: [],
  products: [],
  userRoles: [],
  confirmationPath: "",
  confirmationText: "",
  confirmationExceptions: []
};

const infoReducer = (
  state: InfoState = initialState,
  action: infoActions.InfoAction
): InfoState => {
  switch (action.type) {
    case actions.SET_CATEGORIES:
      const categories = (action as infoActions.SetCategoriesAction).categories;
      return { ...state, categories: [...categories] };
    case actions.SET_STATUSES:
      const statuses = (action as infoActions.SetStatusesAction).statuses;
      return { ...state, statuses: [...statuses] };
    case actions.SET_ISSUE_TYPES:
      const issueTypes = (action as infoActions.SetIssueTypesAction).issueTypes;
      return { ...state, issueTypes: [...issueTypes] };
    case actions.SET_PRODUCTS:
      const products = (action as infoActions.SetProductsAction).products;
      return { ...state, products: [...products] };
    case actions.SET_PERMISSIONS:
      const permissions = (action as infoActions.SetPermissionsAction)
        .permissions;
      return { ...state, permissions: [...permissions] };
    case actions.SET_USER_ROLES:
      const userRoles = (action as infoActions.SetUserRolesAction).userRoles;
      return { ...state, userRoles: [...userRoles] };
    case actions.SET_CONFIRMATION_PATH:
      const { path } = action as infoActions.SetConfirmationPathAction;
      return { ...state, confirmationPath: path };
    case actions.SET_CONFIRMATION_TEXT:
      const { text } = action as infoActions.SetConfirmationTextAction;
      return { ...state, confirmationText: text };
    case actions.SET_CONFIRMATION_EXCEPTIONS:
      const {
        exceptions
      } = action as infoActions.SetConfirmationExceptionsAction;
      return { ...state, confirmationExceptions: exceptions };
    case actions.RESET_INFO_STATE:
      return { ...initialState };
    default:
      return state;
  }
};

export default infoReducer;
