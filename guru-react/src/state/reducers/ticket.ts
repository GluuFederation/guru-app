import actions from "../actions/constants";
import * as ticketActions from "../actions/ticket";
import { CreateTicketState } from "../types/state";

const initialState: CreateTicketState = {
  step: 1,
  slug: "",
  companyAssociation: null,
  createdBy: null,
  createdFor: null,
  assignee: null,
  issueType: NaN,
  category: NaN,
  status: NaN,
  gluuServer: "",
  os: "",
  osVersion: "",
  hasProducts: undefined,
  products: [],
  title: "",
  body: "",
  isPrivate: false
};

const ticketReducer = (
  state: CreateTicketState = initialState,
  action: ticketActions.CreateTicketAction
): CreateTicketState => {
  switch (action.type) {
    case actions.SET_TICKET_CREATE_STEP:
      const step = (action as ticketActions.SetTicketStepAction).step;
      return { ...state, step };
    case actions.SET_TICKET_CREATE_COMPANY:
      const companyAssociation = (action as ticketActions.SetTicketCompanyAction)
        .companyAssociation;
      return { ...state, companyAssociation };
    case actions.SET_TICKET_CREATE_CREATOR:
      const createdFor = (action as ticketActions.SetTicketCreatorAction)
        .createdFor;
      return { ...state, createdFor };
    case actions.SET_TICKET_CREATE_ISSUE_TYPE:
      const issueType = (action as ticketActions.SetTicketIssueTypeAction)
        .issueType;
      return { ...state, issueType };
    case actions.SET_TICKET_CREATE_CATEGORY:
      const category = (action as ticketActions.SetTicketCategoryAction)
        .category;
      return { ...state, category };
    case actions.SET_TICKET_CREATE_GLUU_SERVER:
      const gluuServer = (action as ticketActions.SetTicketGluuServerAction)
        .gluuServer;
      return { ...state, gluuServer };
    case actions.SET_TICKET_CREATE_OS:
      const os = (action as ticketActions.SetTicketOsAction).os;
      return { ...state, os };
    case actions.SET_TICKET_CREATE_OS_VERSION:
      const osVersion = (action as ticketActions.SetTicketOsVersionAction)
        .osVersion;
      return { ...state, osVersion };
    case actions.SET_TICKET_CREATE_HAS_PRODUCTS:
      const hasProducts = (action as ticketActions.SetTicketHasProductsAction)
        .hasProducts;
      console.log(hasProducts);
      return { ...state, hasProducts };
    case actions.ADD_TICKET_CREATE_PRODUCT:
      const product = (action as ticketActions.AddTicketProductAction).product;
      return {
        ...state,
        products: [
          ...state.products.filter(item => item.id !== product.id),
          product
        ]
      };
    case actions.REMOVE_TICKET_CREATE_PRODUCT:
      const index = (action as ticketActions.RemoveTicketProductAction).index;
      return {
        ...state,
        products: [
          ...state.products.filter((item, itemIndex) => itemIndex !== index)
        ]
      };
    case actions.SET_TICKET_CREATE_TITLE:
      const title = (action as ticketActions.SetTicketTitleAction).title;
      return { ...state, title };
    case actions.SET_TICKET_CREATE_BODY:
      const body = (action as ticketActions.SetTicketBodyAction).body;
      return { ...state, body };
    case actions.SET_TICKET_CREATE_PRIVACY:
      const isPrivate = (action as ticketActions.SetTicketPrivacyAction)
        .isPrivate;
      return { ...state, isPrivate };
    case actions.UPDATE_NEW_TICKET:
      const ticket = (action as ticketActions.UpdateNewTicketAction).ticket;
      return { ...state, ...ticket };
    case actions.CLEAR_TICKET_ENTRY:
      return { ...initialState };
    default:
      return state;
  }
};

export default ticketReducer;
