const getters = {
  currentUser(state) {
    return state.user;
  },
  address(state) {
    if (state.user && state.user.address) {
      return state.user.address.line_1;
    }
    return "N/A";
  },
  isAuthenticated(state) {
    return !!state.token;
  },
  isVerified(state) {
    if (state.user && state.user.isVerified) {
      return state.user.isVerified;
    }
    return false;
  },
  isCompleted(state) {
    if (state.user && state.user.isProfileCompleted) {
      return state.user.isProfileCompleted;
    }
    return false;
  }
};

export default getters;
