import { useSelector } from "react-redux";

import { AppState } from "../../types/state";

export const useInfoState = () => useSelector((state: AppState) => state.info);
export const useTicketState = () =>
  useSelector((state: AppState) => state.ticket);
export const useTicketsState = () =>
  useSelector((state: AppState) => state.tickets);
export const useProfilesState = () =>
  useSelector((state: AppState) => state.profiles);
export const useNotificationsState = () =>
  useSelector((state: AppState) => state.notifications);
export const usePaymentsState = () =>
  useSelector((state: AppState) => state.payments);
export const useRouterState = () =>
  useSelector((state: AppState) => state.router);
