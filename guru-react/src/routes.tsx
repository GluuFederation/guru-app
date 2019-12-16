import React from "react";
import { Switch, Route, RouteComponentProps } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { ThemeProvider } from "@material-ui/styles";

import store, { history, persistor } from "./state/store";

import "./App.css";
import theme from "./theme";

import Home from "./pages/Home";
import NotFound from "./pages/Home";
import ErrorBoundary from "./errorBoundary";
import ErrorPage from "./pages/error/ErrorPage";

import LoginRedirect from "./pages/auth/LoginRedirect";
import LoginCallback from "./pages/auth/LoginCallback";
import SignupRedirect from "./pages/auth/SignupRedirect";

import TicketList from "./pages/TicketList";
import TicketDetail from "./pages/TicketDetail";
import Notification from "./pages/Dashboard/NotificationPage";
import Team from "./pages/Dashboard/TeamPage";
import Partner from "./pages/Dashboard/PartnersPage";
import Customer from "./pages/Dashboard/CustomerPage";
import Admin from "./pages/Dashboard/AdminPage";
import CreateTicket from "./pages/CreateTicket";
export const paths = {
  // auth urls
  HOMEPAGE: "/",
  SELECT_PLAN: "/auth/select-plan",
  LOGIN: "/auth/login",
  SIGNUP: "/auth/signup",
  LOGIN_CALLBACK: "/auth/login-callback",

  // tickets urls
  TICKET_LIST: "/dashboard",
  CREATE_TICKET: "/tickets/create/:step",
  getCreateTicketPath: (step: number) => `/tickets/create/${step}`,
  TICKET_DETAIL: "/tickets/:slug",
  getTicketDetailPath: (slug: string) => `/tickets/${slug}`,

  // notifications
  NOTIFICATIONS: "/notifications",

  // profile
  PROFILE: "/profile",

  //team
  TEAM_DETAILS: "/team",

  //partner

  PARTNERS: "/partners",

  //customer

  CUSTOMERS: "/customers",

  //billing

  BILLING: "/billing",

  //account_settings

  ACCOUNT_SETTING: "/account_setting",

  //customer
  CUSTOMER: "/customer",

  //admin
  ADMIN: "/admin",

  // errors
  ERROR_PAGE: "/error-page"
};

interface RouteType {
  path: string;
  component?: React.ComponentType;
  exact?: boolean;
  render?: (props: RouteComponentProps<any>) => React.ReactNode;
}

const routes: Array<RouteType> = [
  // auth and general
  {
    path: paths.HOMEPAGE,
    component: Home
  },
  {
    path: paths.LOGIN,
    component: LoginRedirect
  },
  {
    path: paths.LOGIN_CALLBACK,
    component: LoginCallback
  },
  {
    path: paths.SIGNUP,
    component: SignupRedirect
  },
  {
    path: paths.TEAM_DETAILS,
    component: Team
  },
  {
    path: paths.NOTIFICATIONS,
    component: Notification
  },
  {
    path: paths.PARTNERS,
    component: Partner
  },
  {
    path: paths.CUSTOMER,
    component: Customer
  },
  {
    path: paths.ADMIN,
    component: Admin
  },

  // tickets
  {
    path: paths.TICKET_LIST,
    component: TicketList
  },
  {
    path: paths.TICKET_DETAIL,
    component: TicketDetail
  },
  {
    path: paths.CREATE_TICKET,
    component: CreateTicket
  },

  // errors
  {
    path: paths.ERROR_PAGE,
    component: ErrorPage
  }
];

class Routes extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ConnectedRouter history={history}>
            <ThemeProvider theme={theme}>
              <ErrorBoundary>
                <Switch>
                  <Route exact path={paths.HOMEPAGE} component={Home} />
                  {routes.map((route: RouteType, index) => {
                    const exact = route.exact === undefined || route.exact;
                    return <Route key={index} {...route} exact={exact} />;
                  })}
                  <Route component={NotFound} />
                </Switch>
              </ErrorBoundary>
            </ThemeProvider>
          </ConnectedRouter>
        </PersistGate>
      </Provider>
    );
  }
}

export default Routes;
