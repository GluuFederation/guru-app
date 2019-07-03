import axios from "axios";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";

import actions from "./constants";
import { PaymentCard, PaymentInvoice, PaymentReceipt } from "../types/payments";
import { Company } from "../types/profiles";

export interface SetPaymentCardsAction {
  type: string;
  cards: Array<PaymentCard>;
}

export interface ClearPaymentCardsAction {
  type: string;
}

export interface SetPaymentInvoicesAction {
  type: string;
  invoices: Array<PaymentInvoice>;
}

export interface SetPaymentReceiptsAction {
  type: string;
  receipts: Array<PaymentReceipt>;
}

export interface ClearPaymentReceiptsAction {
  type: string;
}

export interface ClearPaymentInvoicesAction {
  type: string;
}

export interface ResetPaymentStateAction {
  type: string;
}

export type PaymentAction =
  | SetPaymentCardsAction
  | ClearPaymentCardsAction
  | SetPaymentInvoicesAction
  | SetPaymentReceiptsAction
  | ClearPaymentInvoicesAction
  | ClearPaymentReceiptsAction
  | ResetPaymentStateAction;

export const setPaymentCards = (
  cards: Array<PaymentCard>
): SetPaymentCardsAction => ({
  type: actions.SET_PAYMENT_CARDS,
  cards
});

export const setPaymentInvoices = (
  invoices: Array<PaymentInvoice>
): SetPaymentInvoicesAction => ({
  type: actions.SET_PAYMENT_INVOICES,
  invoices
});

export const setPaymentReceipts = (
  receipts: Array<PaymentReceipt>
): SetPaymentReceiptsAction => ({
  type: actions.SET_PAYMENT_RECEIPTS,
  receipts
});

export const clearPaymentCards = (): ClearPaymentCardsAction => ({
  type: actions.CLEAR_PAYMENT_CARDS
});

export const clearPaymentInvoices = (): ClearPaymentInvoicesAction => ({
  type: actions.CLEAR_PAYMENT_INVOICES
});

export const clearPaymentReceipts = (): ClearPaymentReceiptsAction => ({
  type: actions.CLEAR_PAYMENT_RECEIPTS
});

export const resetPaymentState = (): ResetPaymentStateAction => ({
  type: actions.RESET_PAYMENTS_STATE
});

export const fetchPaymentCards = (company: Company) => {
  return async (
    dispatch: ThunkDispatch<{}, {}, AnyAction>
  ): Promise<Array<PaymentCard>> => {
    const URL = `${process.env.REACT_APP_API_BASE}/api/v1/payments/cards/`;
    const params = { company: company.id };
    return axios.get(URL, { params }).then(response => {
      const results = response.data.results;
      dispatch(setPaymentCards(results));
      return Promise.resolve(results);
    });
  };
};

export const fetchPaymentInvoices = (company: Company) => {
  return async (
    dispatch: ThunkDispatch<{}, {}, AnyAction>
  ): Promise<Array<PaymentInvoice>> => {
    const URL = `${process.env.REACT_APP_API_BASE}/api/v1/payments/invoices/`;
    const params = { company: company.id };
    return axios.get(URL, { params }).then(response => {
      const results = response.data.results;
      dispatch(setPaymentInvoices(results));
      return Promise.resolve(results);
    });
  };
};

export const fetchPaymentReceipts = (company: Company) => {
  return async (
    dispatch: ThunkDispatch<{}, {}, AnyAction>
  ): Promise<Array<PaymentInvoice>> => {
    const URL = `${process.env.REACT_APP_API_BASE}/api/v1/payments/receipts/`;
    const params = { company: company.id };
    return axios.get(URL, { params }).then(response => {
      const results = response.data.results;
      dispatch(setPaymentReceipts(results));
      return Promise.resolve(results);
    });
  };
};
