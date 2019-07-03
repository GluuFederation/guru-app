import actions from "../actions/constants";
import * as ticketActions from "../actions/ticket";
import { CreateTicketState } from "../types/state";
import { TicketFilterOrder } from "../types/tickets";

const initialState: CreateTicketState = {
  step: 1,
  companyAssociation: null,
  creator: null,
  issueType: null,
  category: null,
  gluuServer: "",
  os: "",
  osVersion: "",
  hasProducts: false,
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
    case actions.SET_TICKET_CREATE_COMPANY:
      const companyAssociation = (action as ticketActions.SetTicketCompanyAction)
        .companyAssociation;
      return { ...state, companyAssociation };
    case actions.SET_TICKET_CREATE_CREATOR:
      const creator = (action as ticketActions.SetTicketCreatorAction).creator;
      return { ...state, creator };
    case actions.SET_TICKET_CREATE_ISSUE_TYPE:
      const issueType = (action as ticketActions.SetTicketIssueTypeAction)
        .issueType;
      return { ...state, issueType };
    case actions.SET_TICKET_CREATE_CATEGORY:
      const category = (action as ticketActions.SetTicketCategoryAction)
        .category;
      return { ...state, category };
    case actions.SET_TICKET_CREATE_CREATOR:
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
      const productR = (action as ticketActions.RemoveTicketProductAction)
        .product;
      return {
        ...state,
        products: [...state.products.filter(item => item.id !== productR.id)]
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
    case actions.CLEAR_TICKET_ENTRY:
      return { ...initialState };
    default:
      return state;
  }
};

export default ticketReducer;
