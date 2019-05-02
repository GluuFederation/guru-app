import ApiService from "@/common/api.service";
import JwtService from "@/common/jwt.service";
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

import {
  SET_AUTH,
  PURGE_AUTH,
  SET_ERROR,
  SET_LOGIN_URL,
  SET_LOGOUT_URL,
  PURGE_EMAIL_ERROR,
  PURGE_COUNTRY_ERROR,
  PURGE_TIMEZONE_ERROR
} from "./mutations.type";

const state = {
  errors: null,
  user: {},
  isAuthenticated: !!JwtService.getToken(),
  loginUrl: "",
  logoutUrl: ""
};

const getters = {
  currentUser(state) {
    return state.user;
  },
  isEmailErrors(state) {
    return state.errors && state.errors.email && state.errors.email.length;
  },
  emailErrors(state) {
    if (state.errors && state.errors.email && state.errors.email.length) {
      return state.errors.email[0];
    }
    return "";
  },
  isVerifyErrors(state) {
    return state.errors && state.errors.verify && state.errors.verify.length;
  },
  verifyErrors(state) {
    if (state.errors && state.errors.verify && state.errors.verify.length) {
      return state.errors.verify[0];
    }
    return "";
  },
  isCountryError(state) {
    return (
      state.errors &&
      state.errors.address &&
      state.errors.address.country &&
      state.errors.address.country.length
    );
  },
  isTimezoneError(state) {
    return (
      state.errors && state.errors.timezone && state.errors.timezone.length
    );
  },
  address(state) {
    if (state.user.address) {
      return state.user.address.line_1;
    }
    return "N/A";
  },
  isAuthenticated(state) {
    return state.isAuthenticated;
  },
  isVerified(state) {
    return state.user.isVerified;
  },
  isCompleted(state) {
    return state.user.isProfileCompleted;
  },
  loginUrl(state) {
    return state.loginUrl;
  },
  logoutUrl(state) {
    return state.logoutUrl;
  }
};

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
    if (JwtService.getToken()) {
      ApiService.setHeader();
      return new Promise(resolve => {
        ApiService.get("auth/me")
          .then(({ data }) => {
            context.commit(SET_AUTH, data.results);
            resolve(data);
          })
          .catch(() => {
            context.commit(PURGE_AUTH);
          });
      });
    } else {
      context.commit(PURGE_AUTH);
    }
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
      ApiService.get(`auth/get-authorization-url`)
        .then(({ data }) => {
          context.commit(SET_LOGIN_URL, data.results);
          resolve(data);
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
      ApiService.query(`auth/login-callback`, { params: params })
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
          context.commit(SET_LOGOUT_URL, data.results);
          context.commit(PURGE_AUTH);
          resolve(data);
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

const mutations = {
  [SET_ERROR](state, error) {
    state.errors = error;
  },
  [SET_AUTH](state, result) {
    state.isAuthenticated = true;
    state.user = result;
    state.errors = {};
    if (result.token) {
      JwtService.saveToken(result.token);
    }
  },
  [PURGE_AUTH](state) {
    state.isAuthenticated = false;
    state.user = {};
    state.errors = {};
    JwtService.destroyToken();
  },
  [PURGE_EMAIL_ERROR](state) {
    if (state.errors && state.errors.email) {
      state.errors.email = {};
    }
  },
  [PURGE_COUNTRY_ERROR](state) {
    if (state.errors && state.errors.address && state.errors.address.country) {
      state.errors.address.country = {};
    }
  },
  [PURGE_TIMEZONE_ERROR](state) {
    if (state.errors && state.errors.timezone) {
      state.errors.timezone = {};
    }
  },
  [SET_LOGIN_URL](state, loginUrl) {
    state.loginUrl = loginUrl.loginUrl;
  },
  [SET_LOGOUT_URL](state, logoutUrl) {
    state.logoutUrl = logoutUrl.logoutUrl;
  }
};

export default {
  state,
  actions,
  mutations,
  getters
};
