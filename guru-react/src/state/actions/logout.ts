import axios from "axios";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";

import { resetProfileState } from "./profiles";
import { clearAllAppNotifications } from "./notifications";
import { resetPaymentState } from "./payments";
import { clearTicketEntry } from "./ticket";
import { resetTicketsState } from "./tickets";

export const logout = () => {
  return async (
    dispatch: ThunkDispatch<{}, {}, AnyAction>
  ): Promise<string> => {
    const URL = `${process.env.REACT_APP_API_BASE}/api/v1/auth/get-logout-url/`;
    const params = { app: "guru" };
    delete axios.defaults.headers.common["Authorization"];
    return axios.get(URL, { params }).then(response => {
      const results = response.data.results;
      dispatch(resetProfileState());
      dispatch(clearAllAppNotifications());
      dispatch(resetPaymentState());
      dispatch(clearTicketEntry());
      dispatch(resetTicketsState());
      return Promise.resolve(results.logoutUrl);
    });
  };
};
