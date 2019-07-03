import { combineReducers } from "redux";
import { connectRouter, RouterState } from "connected-react-router";
import { History } from "history";

import profiles from "./profiles";
import info from "./info";
import notifications from "./notifications";
import payments from "./payments";
import ticket from "./ticket";
import tickets from "./tickets";

export default (history: History<any>) =>
  combineReducers({
    router: connectRouter(history),
    profiles,
    info,
    notifications,
    payments,
    ticket,
    tickets
  });
