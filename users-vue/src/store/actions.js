import ApiService from "@/common/api.service";
import {
  REGISTER,
  CHECK_AUTH,
  UPDATE_USER,
  ACTIVATE_USER,
  RESEND_EMAIL,
  GET_LOGIN_URL,
  LOGIN,
  LOGOUT,
  GET_SIGNUP_CALLBACK_URL
} from "./actions.type";
import { SET_AUTH, PURGE_AUTH, SET_ERROR } from "./mutations.type";

const actions = {
  [REGISTER](context, credentials) {
    return new Promise((resolve, reject) => {
      ApiService.post("auth/signup/", credentials)
        .then(({ data }) => {
          context.commit(SET_AUTH, data.results);
          resolve(data);
        })
        .catch(({ response }) => {
          if (response) {
            context.commit(SET_ERROR, response.data);
            reject(response);
          }
        });
    });
  },
  [CHECK_AUTH](context) {
    return new Promise(resolve => {
      ApiService.get("auth/me")
        .then(({ data }) => {
          context.commit(SET_AUTH, data.results);
          resolve(data);
        })
        .catch(() => {
          context.commit(PURGE_AUTH);
          resolve();
        });
    });
  },
  [UPDATE_USER](context, payload) {
    const {
      email,
      password,
      firstName,
      lastName,
      address,
      timezone,
      isProfileCompleted
    } = payload;
    const user = {
      email,
      firstName,
      lastName,
      address,
      timezone
    };
    if (password) {
      user.password = password;
    }
    if (isProfileCompleted) {
      user.isProfileCompleted = isProfileCompleted;
    }

    return new Promise((resolve, reject) => {
      ApiService.post("auth/me/", user)
        .then(({ data }) => {
          context.commit(SET_AUTH, data.results);
          resolve(data);
        })
        .catch(({ response }) => {
          if (response) {
            context.commit(SET_ERROR, response.data);
            reject(response);
          }
        });
    });
  },
  [ACTIVATE_USER](context, payload) {
    const { userId, pin } = payload;
    return new Promise((resolve, reject) => {
      ApiService.post(`auth/verify-code/`, { pin, pk: userId })
        .then(({ data }) => {
          context.commit(SET_AUTH, data.results);
          resolve(data);
        })
        .catch(({ response }) => {
          if (response) {
            context.commit(SET_ERROR, response.data);
            reject(response);
          }
        });
    });
  },
  [RESEND_EMAIL](context, email) {
    return new Promise(resolve => {
      ApiService.post(`auth/send-verification/`, { email: email })
        .then(({ data }) => {
          context.commit(SET_AUTH, data.results);
          resolve(data);
        })
        .catch(({ response }) => {
          if (response) {
            context.commit(SET_ERROR, response.data);
          }
        });
    });
  },
  [GET_LOGIN_URL](context) {
    return new Promise(resolve => {
      const params = { app: "users" };
      ApiService.query(`auth/get-authorization-url`, { params })
        .then(({ data }) => {
          resolve(data.results);
        })
        .catch(({ response }) => {
          if (response) {
            context.commit(SET_ERROR, response.data);
          }
        });
    });
  },
  [LOGIN](context, params) {
    return new Promise((resolve, reject) => {
      let queryParams = params;
      queryParams.app = "users";
      ApiService.query(`auth/login-callback`, { params: queryParams })
        .then(({ data }) => {
          context.commit(SET_AUTH, data.results);
          resolve(data);
        })
        .catch(({ response }) => {
          if (response) {
            context.commit(SET_ERROR, response.data);
            reject(response);
          }
        });
    });
  },
  [LOGOUT](context) {
    return new Promise(resolve => {
      ApiService.get("auth/logout")
        .then(({ data }) => {
          context.commit(PURGE_AUTH);
          resolve(data.results);
        })
        .catch(({ response }) => {
          console.log(response);
        });
    });
  },
  [GET_SIGNUP_CALLBACK_URL]() {
    return ApiService.get("get-signup-callback-url");
  }
};

export default actions;
