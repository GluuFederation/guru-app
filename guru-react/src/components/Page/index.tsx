import React, { FunctionComponent, useEffect } from "react";
import { useRouteMatch, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

import { fetchInfo } from "../../state/actions/info";
import { paths } from "../../routes";
import { AppState } from "../../state/types/state";

const Page: FunctionComponent = ({ children }) => {
  const match = useRouteMatch();
  const history = useHistory();
  const dispatch = useDispatch();
  const { user, token } = useSelector((state: AppState) => state.profiles);
  const initAuth = () => {
    const pathname = match.path;

    const openPaths: Array<string> = [
      paths.HOMEPAGE,
      paths.TICKET_LIST,
      paths.TICKET_DETAIL,
      paths.ERROR_PAGE,
      paths.LOGIN,
      paths.LOGIN_CALLBACK,
      paths.SIGNUP
    ];

    if (!openPaths.includes(pathname)) {
      if (!user) {
        history.push(paths.LOGIN);
        return;
      }
    }

    if (token)
      axios.defaults.headers.common["Authorization"] = `Token ${token}`;
  };

  useEffect(() => {
    initAuth();
    fetchInfo()(dispatch);
  }, []);

  return <>{children}</>;
};

export default Page;
