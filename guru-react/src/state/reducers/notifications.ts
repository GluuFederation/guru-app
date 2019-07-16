import actions from "../actions/constants";
import * as nActions from "../actions/notifications";
import { AppNotificationsState } from "../types/state";
import { AppNotificationSettings } from "../types/notifications";

const initialSettingsState: AppNotificationSettings = {
  receiveNewsletter: false,
  newTickets: false
};

const initialState: AppNotificationsState = {
  allActivities: [],
  yourActivities: [],
  settings: initialSettingsState
};

const notificationsReducer = (
  state: AppNotificationsState = initialState,
  action: nActions.AppNotificationAction
): AppNotificationsState => {
  switch (action.type) {
    case actions.ADD_NOTIFICATION:
      const notification = (action as nActions.AddAppNotificationAction)
        .notification;
      return {
        ...state,
        allActivities: [
          ...state.allActivities.filter(item => item.id !== notification.id),
          notification
        ]
      };
    case actions.ADD_YOUR_NOTIFICATION:
      const yNotification = (action as nActions.AddYourAppNotificationAction)
        .notification;
      return {
        ...state,
        yourActivities: [
          ...state.yourActivities.filter(item => item.id !== yNotification.id),
          yNotification
        ]
      };
    case actions.SET_NOTIFICATIONS:
      const notifications = (action as nActions.SetAppNotificationsAction)
        .notifications;
      return {
        ...state,
        allActivities: notifications
      };
    case actions.SET_YOUR_NOTIFICATIONS:
      const yNotifications = (action as nActions.SetYourAppNotificationsAction)
        .notifications;
      return {
        ...state,
        yourActivities: yNotifications
      };
    case actions.CLEAR_NOTIFICATIONS:
      return {
        ...state,
        allActivities: []
      };
    case actions.CLEAR_YOUR_NOTIFICATIONS:
      return {
        ...state,
        yourActivities: []
      };
    case actions.CLEAR_ALL_NOTIFICATIONS:
      return {
        ...state,
        allActivities: [],
        yourActivities: []
      };
    case actions.CHANGE_NOTIFICATION_SETTING:
      const setting = (action as nActions.ChangeAppNotificationSettingAction)
        .setting;
      const value = (action as nActions.ChangeAppNotificationSettingAction)
        .value;
      return {
        ...state,
        settings: { ...state.settings, [setting]: value }
      };
    default:
      return state;
  }
};

export default notificationsReducer;
