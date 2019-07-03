import axios from "axios";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";

import actions from "./constants";
import { AppNotification } from "../types/notifications";
import { Company } from "../types/profiles";

export interface AddAppNotificationAction {
  type: string;
  notification: AppNotification;
}

export interface AddYourAppNotificationAction {
  type: string;
  notification: AppNotification;
}

export interface SetAppNotificationsAction {
  type: string;
  notifications: Array<AppNotification>;
}

export interface SetYourAppNotificationsAction {
  type: string;
  notifications: Array<AppNotification>;
}

export interface ClearAppNotificationsAction {
  type: string;
}

export interface ClearYourAppNotificationsAction {
  type: string;
}

export interface ClearAllAppNotificationsAction {
  type: string;
}

export interface ChangeAppNotificationSettingAction {
  type: string;
  setting: string;
  value: boolean;
}

export type AppNotificationAction =
  | AddAppNotificationAction
  | AddYourAppNotificationAction
  | SetYourAppNotificationsAction
  | SetAppNotificationsAction
  | ClearAppNotificationsAction
  | ClearYourAppNotificationsAction
  | ClearAllAppNotificationsAction
  | ChangeAppNotificationSettingAction;

export const addAppNotification = (
  notification: AppNotification
): AddAppNotificationAction => ({
  type: actions.ADD_NOTIFICATION,
  notification
});

export const addYourAppNotification = (
  notification: AppNotification
): AddYourAppNotificationAction => ({
  type: actions.ADD_YOUR_NOTIFICATION,
  notification
});

export const setAppNotifications = (
  notifications: Array<AppNotification>
): SetAppNotificationsAction => ({
  type: actions.SET_NOTIFICATIONS,
  notifications
});

export const setYourAppNotifications = (
  notifications: Array<AppNotification>
): SetYourAppNotificationsAction => ({
  type: actions.SET_YOUR_NOTIFICATIONS,
  notifications
});

export const clearAppNotifications = (): ClearAppNotificationsAction => ({
  type: actions.CLEAR_NOTIFICATIONS
});

export const clearYourAppNotifications = (): ClearYourAppNotificationsAction => ({
  type: actions.CLEAR_YOUR_NOTIFICATIONS
});

export const clearAllAppNotifications = (): ClearAllAppNotificationsAction => ({
  type: actions.CLEAR_ALL_NOTIFICATIONS
});

export const changeAppNotificationSetting = (
  setting: string,
  value: boolean
): ChangeAppNotificationSettingAction => ({
  type: actions.CHANGE_NOTIFICATION_SETTING,
  setting,
  value
});

export const fetchAllNotifications = (company: Company) => {
  return async (
    dispatch: ThunkDispatch<{}, {}, AnyAction>
  ): Promise<Array<AppNotification>> => {
    const URL = `${process.env.REACT_APP_API_BASE}/api/v1/notifications/all/`;
    const params = { company: company.id };
    return axios.get(URL, { params }).then(response => {
      const results = response.data.results;
      dispatch(setAppNotifications(results));
      return Promise.resolve(results);
    });
  };
};

export const fetchYourNotifications = (company: Company) => {
  return async (
    dispatch: ThunkDispatch<{}, {}, AnyAction>
  ): Promise<Array<AppNotification>> => {
    const URL = `${process.env.REACT_APP_API_BASE}/api/v1/notifications/mine/`;
    const params = { company: company.id };
    return axios.get(URL, { params }).then(response => {
      const results = response.data.results;
      dispatch(setYourAppNotifications(results));
      return Promise.resolve(results);
    });
  };
};
