import { createStore } from "vuex";

export default createStore({
  state() {
    return {
      credentials: {
        id: sessionStorage.getItem("id") || "",
        userEmail: sessionStorage.getItem("email") || "please log in",
        token: sessionStorage.getItem("token") || "",
        role: sessionStorage.getItem("role") || "",
      },
      signInFlag: sessionStorage.getItem("signInFlag") || false,
      data: [],
      error: {},
    };
  },
  mutations: {
    setCredentials(state, payload) {
      state.credentials.email = payload.email;
      state.credentials.token = payload.token;
      state.signInFlag = payload.signInFlag;
      state.credentials.id = payload.id;
      state.credentials.role = payload.role;
    },
    setError(state, payload) {
      state.error = payload;
    },
  },
  actions: {},
  modules: {},
  getters: {
    getEmail: (state) => state.credentials.email,
    getToken: (state) => state.credentials.token,
    getSignInFlag: (state) => state.signInFlag,
    getError: (state) => state.error,
    getId: (state) => state.credentials.id,
    getRole: (state) => state.credentials.role,
  },
});
