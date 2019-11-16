import React from "react";
import ReactDOM from "react-dom";
import axios, { AxiosResponse, AxiosError } from "axios";
import { push } from "connected-react-router";

import App, { paths } from "./routes";
import store from "./state/store";
import { logout } from "./state/actions/logout";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(<App />, document.getElementById("root"));

axios.interceptors.response.use(
  function(response): AxiosResponse<any> | Promise<AxiosResponse<any>> {
    return response;
  },
  function(error: AxiosError) {
    const isLogout = (error.request.responseURL as string).includes(
      "get-logout-url"
    );
    if (!isLogout && error.response && error.response.status === 401) {
      logout()(store.dispatch);
      store.dispatch(push(paths.HOMEPAGE));
    }
    return Promise.reject(error);
  }
);

serviceWorker.unregister();
