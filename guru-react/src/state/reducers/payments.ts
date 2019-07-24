import actions from "../actions/constants";
import * as paymentsActions from "../actions/payments";
import { PaymentsState } from "../types/state";

const initialState: PaymentsState = {
  cards: [],
  invoices: [],
  receipts: []
};

const paymentsReducer = (
  state: PaymentsState = initialState,
  action: paymentsActions.PaymentAction
): PaymentsState => {
  switch (action.type) {
    case actions.SET_PAYMENT_CARDS:
      const cards = (action as paymentsActions.SetPaymentCardsAction).cards;
      return { ...state, cards: [...cards] };
    case actions.SET_PAYMENT_INVOICES:
      const invoices = (action as paymentsActions.SetPaymentInvoicesAction)
        .invoices;
      return { ...state, invoices: [...invoices] };
    case actions.SET_PAYMENT_RECEIPTS:
      const receipts = (action as paymentsActions.SetPaymentReceiptsAction)
        .receipts;
      return { ...state, receipts: [...receipts] };
    case actions.CLEAR_PAYMENT_CARDS:
      return { ...state, cards: [] };
    case actions.CLEAR_PAYMENT_INVOICES:
      return { ...state, invoices: [] };
    case actions.CLEAR_PAYMENT_RECEIPTS:
      return { ...state, receipts: [] };
    default:
      return state;
  }
};

export default paymentsReducer;
