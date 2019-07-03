const actions = {
  // info
  SET_CATEGORIES: "SET_CATEGORIES",
  SET_ISSUE_TYPES: "SET_ISSUE_TYPES",
  SET_PRODUCTS: "SET_PRODUCTS",
  SET_STATUSES: "SET_STATUSES",
  SET_PERMISSIONS: "SET_PERMISSIONS",
  SET_USER_ROLES: "SET_USER_ROLES",
  RESET_INFO_STATE: "RESET_INFO_STATE",

  // profile
  SAVE_USER: "SAVE_USER",
  SAVE_TOKEN: "SAVE_TOKEN",
  SAVE_COMPANY: "SAVE_COMPANY",
  ADD_ASSOCIATED_COMPANY: "ADD_ASSOCIATED_COMPANY",
  SET_ASSOCIATED_COMPANIES: "SET_ASSOCIATED_COMPANIES",
  REMOVE_ASSOCIATED_COMPANY: "REMOVE_ASSOCIATED_COMPANY",
  CLEAR_ASSOCIATED_COMPANIES: "CLEAR_ASSOCIATED_COMPANIES",
  ADD_TEAM_MEMBER: "ADD_TEAM_MEMBER",
  ADD_INVITEE: "ADD_INVITEE",
  REMOVE_INVITEE: "REMOVE_INVITEE",
  REMOVE_TEAM_MEMBER: "REMOVE_TEAM_MEMBER",
  CHANGE_TEAM_MEMBER_ROLE: "CHANGE_TEAM_MEMBER_ROLE",
  RESET_PROFILE_STATE: "RESET_PROFILE_STATE",

  // tickets
  ADD_FILTER_COMPANY: "ADD_FILTER_COMPANY",
  ADD_FILTER_ASSIGNEE: "ADD_FILTER_ASSIGNEE",
  ADD_FILTER_CREATOR: "ADD_FILTER_CREATOR",
  ADD_FILTER_CATEGORY: "ADD_FILTER_CATEGORY",
  ADD_FILTER_ISSUE_TYPE: "ADD_FILTER_ISSUE_TYPE",
  ADD_FILTER_PRODUCT: "ADD_FILTER_PRODUCT",
  ADD_FILTER_STATUS: "ADD_FILTER_STATUS",
  REMOVE_FILTER_COMPANY: "REMOVE_FILTER_COMPANY",
  REMOVE_FILTER_ASSIGNEE: "REMOVE_FILTER_ASSIGNEE",
  REMOVE_FILTER_CREATOR: "REMOVE_FILTER_CREATOR",
  REMOVE_FILTER_CATEGORY: "REMOVE_FILTER_CATEGORY",
  REMOVE_FILTER_ISSUE_TYPE: "REMOVE_FILTER_ISSUE_TYPE",
  REMOVE_FILTER_PRODUCT: "REMOVE_FILTER_PRODUCT",
  REMOVE_FILTER_STATUS: "REMOVE_FILTER_STATUS",
  SET_FILTER_END_DATE: "SET_FILTER_END_DATE",
  SET_FILTER_START_DATE: "SET_FILTER_START_DATE",
  SET_FILTER_QUERY: "SET_FILTER_QUERY",
  SET_FILTER_ORDER: "SET_FILTER_ORDER",
  SET_FILTER_PAGE: "SET_FILTER_PAGE",
  SET_FILTER_PAGE_ITEMS: "SET_FILTER_PAGE_ITEMS",
  SET_FILTER_TOTAL_COUNT: "SET_FILTER_TOTAL_COUNT",
  CLEAR_ALL_FILTERS: "CLEAR_ALL_FILTERS",
  SET_TICKETS: "SET_TICKETS",
  SET_TICKET: "SET_TICKET",
  CLEAR_TICKET: "CLEAR_TICKET",
  SET_TICKET_ANSWERS: "SET_TICKET_ANSWERS",
  ADD_TICKET_ANSWER: "ADD_TICKET_ANSWER",
  REMOVE_TICKET_ANSWER: "REMOVE_TICKET_ANSWER",
  SET_TICKET_HISTORY: "SET_TICKET_HISTORY",
  RESET_TICKETS_STATE: "RESET_TICKETS_STATE",

  // ticket
  SET_TICKET_CREATE_COMPANY: "SET_TICKET_CREATE_COMPANY",
  SET_TICKET_CREATE_CREATOR: "SET_TICKET_CREATE_CREATOR",
  SET_TICKET_CREATE_ISSUE_TYPE: "SET_TICKET_CREATE_ISSUE_TYPE",
  SET_TICKET_CREATE_CATEGORY: "SET_TICKET_CREATE_CATEGORY",
  SET_TICKET_CREATE_GLUU_SERVER: "SET_TICKET_CREATE_GLUU_SERVER",
  SET_TICKET_CREATE_OS: "SET_TICKET_CREATE_OS",
  SET_TICKET_CREATE_OS_VERSION: "SET_TICKET_CREATE_OS_VERSION",
  SET_TICKET_CREATE_HAS_PRODUCTS: "SET_TICKET_CREATE_HAS_PRODUCTS",
  ADD_TICKET_CREATE_PRODUCT: "ADD_TICKET_CREATE_PRODUCT",
  REMOVE_TICKET_CREATE_PRODUCT: "REMOVE_TICKET_CREATE_PRODUCT",
  SET_TICKET_CREATE_TITLE: "SET_TICKET_CREATE_TITLE",
  SET_TICKET_CREATE_BODY: "SET_TICKET_CREATE_BODY",
  SET_TICKET_CREATE_PRIVACY: "SET_TICKET_CREATE_PRIVACY",
  CLEAR_TICKET_ENTRY: "CLEAR_TICKET_ENTRY",

  // notifications
  ADD_NOTIFICATION: "ADD_NOTIFICATION",
  ADD_YOUR_NOTIFICATION: "ADD_YOUR_NOTIFICATION",
  SET_NOTIFICATIONS: "SET_NOTIFICATIONS",
  SET_YOUR_NOTIFICATIONS: "SET_YOUR_NOTIFICATIONS",
  CLEAR_NOTIFICATIONS: "CLEAR_NOTIFICATIONS",
  CLEAR_YOUR_NOTIFICATIONS: "CLEAR_YOUR_NOTIFICATIONS",
  CLEAR_ALL_NOTIFICATIONS: "CLEAR_ALL_NOTIFICATIONS",
  CHANGE_NOTIFICATION_SETTING: "CHANGE_NOTIFICATION_SETTING",
  RESET_NOTIFICATIONS_STATE: "RESET_NOTIFICATIONS_STATE",

  // payments
  ADD_PAYMENT_CARD: "ADD_PAYMENT_CARD",
  REMOVE_PAYMENT_CARD: "REMOVE_PAYMENT_CARD",
  SET_PAYMENT_CARDS: "SET_PAYMENT_CARDS",
  SET_PAYMENT_INVOICES: "SET_PAYMENT_INVOICES",
  SET_PAYMENT_RECEIPTS: "SET_PAYMENT_RECEIPTS",
  CLEAR_PAYMENT_RECEIPTS: "CLEAR_PAYMENT_RECEIPTS",
  CLEAR_PAYMENT_INVOICES: "CLEAR_PAYMENT_INVOICES",
  CLEAR_PAYMENT_CARDS: "CLEAR_PAYMENT_CARDS",
  RESET_PAYMENTS_STATE: "RESET_PAYMENTS_STATE"
};

export default actions;
