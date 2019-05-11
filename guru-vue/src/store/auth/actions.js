import ApiService from "@/common/api.service";
import { CHECK_AUTH, GET_LOGIN_URL, LOGIN, LOGOUT } from "./actions.type";
import { SET_AUTH, PURGE_AUTH } from "./mutations.type";

const actions = {
  [CHECK_AUTH](context) {
    return new Promise((resolve, reject) => {
      ApiService.get("auth/me")
        .then(({ data }) => {
          context.commit(SET_AUTH, data.results);
          resolve(data);
        })
        .catch(({ response }) => {
          reject(response);
        });
    });
  },
  [GET_LOGIN_URL]() {
    return new Promise((resolve, reject) => {
      const params = { app: "users" };
      ApiService.query(`auth/get-authorization-url`, { params })
        .then(({ data }) => {
          resolve(data.results);
        })
        .catch(({ response }) => {
          reject(response);
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
          reject(response);
        });
    });
  },
  [LOGOUT](context) {
    context.commit(PURGE_AUTH);
    // return new Promise(resolve => {
    //   ApiService.get("auth/logout")
    //     .then(({ data }) => {
    //       context.commit(PURGE_AUTH);
    //       resolve(data.results);
    //     })
    //     .catch(({ response }) => {
    //       console.log(response);
    //     });
    // });
  }
};

export default actions;
