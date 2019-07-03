import React, { Component } from "react";
import { Switch, Route, RouteComponentProps } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import store, { history, persistor } from "./state/store";

import "./App.scss";

import Home from "./pages/Home";

export const paths = {
  // auth urls
  HOMEPAGE: "/",
  TERMS: "/terms",
  SETTINGS: "/settings",
  DELETE_ACCCOUNT: "/settings/delete-account",
  GET_STARTED: "/auth/get-started",
  VERIFY_CODE: "/auth/verify-code",
  RESTART_VERIFICATION: "/auth/restart-verification",
  UPDATE_PROFILE: "/auth/update-profile",
  UPDATE_BIO: "/auth/update-bio",
  CONFIRM_ACCOUNT: "/auth/confirm-account",
  SETUP_ACCOUNT: "/auth/setup-account",
  NEW_DETAILS: "/auth/new-details",
  CONNECT_ACCOUNT: "/auth/connect-account",
  VERIFY_ACCOUNT_FAILED: "/auth/verification-failed",
  COMPLETE_SIGNUP: "/auth/complete-signup",

  // Test urls
  DASHBOARD: "/dashboard",
  PROFILE: "/profile",
  EDIT_PROFILE: "/profile/edit",
  EDIT_BIO: "/profile/edit-bio",
  UPDATE_PHONE: "/profile/update-phone",
  ABOUT: "/about",
  COMPLETE_PHONE: "/profile/complete-phone-update",
  VERIFY_PHONE: "/profile/verify-phone",
  RECORD_INSIGHTS: "/tests/view/:testName/:recordId/insights",
  getRecordInsightsPath: (testName: string, recordId: number) =>
    `/tests/view/${testName}/${recordId}/insights`,

  RECORD_LIST: "/tests/view",
  RECORD_LIST_FILTER: "/tests/filter",
  SELECT_TEST_VIEW: "/tests/select",
  SEARCH_TEST: "/tests/search",

  SELECT_TEST_ENTRY: "/tests/add",
  BMI_ENTRY: "/tests/add/bmi/:traitName",
  getBmiEntryPath: (trait: TestTraitType) => `/tests/add/bmi/${trait}`,

  GLUCOSE_ENTRY: "/tests/add/glucose/:traitName",
  getGlucoseEntryPath: (trait: TestTraitType) => `/tests/add/glucose/${trait}`,

  BP_ENTRY: "/tests/add/bp/:traitName",
  getBpEntryPath: (trait: TestTraitType) => `/tests/add/bp/${trait}`,

  ANEMIA_ENTRY: "/tests/add/anemia/:traitName",
  getAnemiaEntryPath: (trait: TestTraitType) => `/tests/add/anemia/${trait}`,

  CHOLESTEROL_ENTRY: "/tests/add/cholesterol/:traitName",
  getCholesterolEntryPath: (trait: TestTraitType) =>
    `/tests/add/cholesterol/${trait}`,

  TYPHOID_ENTRY: "/tests/add/typhoid/:traitName",
  getTyphoidEntryPath: (trait: TestTraitType) => `/tests/add/typhoid/${trait}`,

  HEPATITIS_ENTRY: "/tests/add/hepatitisb",
  MALARIA_ENTRY: "/tests/add/malaria",
  PREGNANCY_ENTRY: "/tests/add/pregnancy",

  PATIENT_PHYSICIAN_LIST: "/physicians/connected",
  PHYSICIAN_LIST: "/physicians",
  SEARCH_PHYSICIAN: "/physicians/search",
  PHYSICIAN_LIST_FILTER: "/physicians/filter",
  PHYSICIAN_DETAIL: "/physicians/:healthOrgId/:physicianId",
  getPhysicianDetailPath: (healthOrgId: number, physicianId: number) =>
    `/physicians/${healthOrgId}/${physicianId}`,

  PATIENT_PHARMACY_LIST: "/pharmacies/connected",
  NEAR_PHARMACY_LIST: "/pharmacies/near-me",
  PHARMACY_LIST: "/pharmacies",
  SEARCH_PHARMACY: "/pharmacies/search",
  PHARMACY_DETAIL: "/pharmacies/:pharmacyId",
  getPharmacyDetailPath: (pharmacyId: number) => `/pharmacies/${pharmacyId}`
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
    path: paths.TERMS,
    component: Terms
  },
  {
    path: paths.SETTINGS,
    component: Settings
  },
  {
    path: paths.DELETE_ACCCOUNT,
    component: DeleteAccount
  },
  {
    path: paths.GET_STARTED,
    component: GetStarted
  },
  {
    path: paths.VERIFY_CODE,
    component: VerifyCode
  },
  {
    path: paths.RESTART_VERIFICATION,
    component: RestartVerification
  },
  {
    path: paths.UPDATE_PROFILE,
    component: UpdateProfile
  },
  {
    path: paths.UPDATE_BIO,
    component: UpdateBio
  },
  {
    path: paths.CONFIRM_ACCOUNT,
    component: ConfirmAccount
  },
  {
    path: paths.SETUP_ACCOUNT,
    component: SetupAccount
  },
  {
    path: paths.CONNECT_ACCOUNT,
    component: ConnectAccount
  },
  {
    path: paths.VERIFY_ACCOUNT_FAILED,
    component: VerifyAccountFailed
  },
  {
    path: paths.COMPLETE_SIGNUP,
    component: CompleteSignup
  },

  {
    path: paths.DASHBOARD,
    component: Dashboard
  },
  {
    path: paths.PROFILE,
    component: Profile
  },
  {
    path: paths.EDIT_PROFILE,
    component: EditProfile
  },
  {
    path: paths.EDIT_BIO,
    component: EditBio
  },
  {
    path: paths.ABOUT,
    component: About
  },
  {
    path: paths.UPDATE_PHONE,
    component: UpdatePhone
  },
  {
    path: paths.VERIFY_PHONE,
    component: VerifyPhone
  },
  {
    path: paths.COMPLETE_PHONE,
    component: CompletePhoneUpdate
  },

  {
    path: paths.RECORD_INSIGHTS,
    render: props => (
      <RecordInsights key={props.match.params.recordId || "empty"} />
    )
  },
  {
    path: paths.RECORD_LIST_FILTER,
    component: RecordListFilter
  },
  {
    path: paths.RECORD_LIST,
    render: props => (
      <RecordList
        key={Math.random()
          .toString(36)
          .replace(/[^a-z]+/g, "")}
      />
    )
  },
  {
    path: paths.SELECT_TEST_VIEW,
    component: SelectTestView
  },
  {
    path: paths.SEARCH_TEST,
    component: SearchTest
  },

  {
    path: paths.SELECT_TEST_ENTRY,
    component: SelectTestEntry
  },
  {
    path: paths.BMI_ENTRY,
    render: props => <BmiEntry key={props.match.params.traitName || "empty"} />
  },
  {
    path: paths.GLUCOSE_ENTRY,
    render: props => (
      <GlucoseEntry key={props.match.params.traitName || "empty"} />
    )
  },
  {
    path: paths.BP_ENTRY,
    render: props => <BpEntry key={props.match.params.traitName || "empty"} />
  },
  {
    path: paths.ANEMIA_ENTRY,
    render: props => (
      <AnemiaEntry key={props.match.params.traitName || "empty"} />
    )
  },
  {
    path: paths.CHOLESTEROL_ENTRY,
    render: props => (
      <CholesterolEntry key={props.match.params.traitName || "empty"} />
    )
  },
  {
    path: paths.HEPATITIS_ENTRY,
    component: HepatitisEntry
  },
  {
    path: paths.MALARIA_ENTRY,
    component: MalariaEntry
  },
  {
    path: paths.PREGNANCY_ENTRY,
    component: PregnancyEntry
  },
  {
    path: paths.TYPHOID_ENTRY,
    render: props => (
      <TyphoidEntry key={props.match.params.traitName || "empty"} />
    )
  },

  {
    path: paths.PATIENT_PHYSICIAN_LIST,
    component: PatientPhysicianList
  },
  {
    path: paths.PHYSICIAN_LIST,
    component: PhysicianList
  },
  {
    path: paths.SEARCH_PHYSICIAN,
    component: SearchPhysician
  },
  {
    path: paths.PHYSICIAN_LIST_FILTER,
    component: PhysicianListFilter
  },
  {
    path: paths.PHYSICIAN_DETAIL,
    render: props => (
      <PhysicianDetail key={props.match.params.physicianId || "empty"} />
    )
  },
  {
    path: paths.PATIENT_PHARMACY_LIST,
    component: PatientPharmacyList
  },
  {
    path: paths.NEAR_PHARMACY_LIST,
    component: PharmacyLocationList
  },
  {
    path: paths.PHARMACY_LIST,
    component: PharmacyList
  },
  {
    path: paths.SEARCH_PHARMACY,
    component: SearchPharmacy
  },
  {
    path: paths.PHARMACY_DETAIL,
    render: props => (
      <PharmacyDetail key={props.match.params.pharmacyId || "empty"} />
    )
  }
];

class Routes extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ConnectedRouter history={history}>
            <ErrorBoundary>
              <BackgroundTasks />
              <ScrollToTop>
                <Switch>
                  <Route exact path={paths.HOMEPAGE} component={Home} />
                  {routes.map((route: RouteType, index) => {
                    const exact = route.exact === undefined || route.exact;
                    return <Route key={index} {...route} exact={exact} />;
                  })}
                  <Route component={NotFound} />
                </Switch>
              </ScrollToTop>
            </ErrorBoundary>
          </ConnectedRouter>
        </PersistGate>
      </Provider>
    );
  }
}

export default Routes;
