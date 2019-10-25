import fb from "@/config/firebaseConfig";
const fs = table => fb.firestore().collection(table);
export const User = {
  state: {
    user: null,
    error: null
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },
    setError(state, payload) {
      state.error = payload;
    },
    clearError(state) {
      state.error = null
    }
  },
  actions: {
    SIGN_IN({ commit }, payload) {
      commit("setLoading", true);

      fb.auth()
        .signInWithEmailAndPassword(payload.email, payload.password)
        .then(res => {
          let newUser = { email: payload.email, name: payload.name };

          commit("setUser", {
            ...newUser,
            uid: res.user.uid
          });
          commit("setLoading", false);
          commit("clearError")
        })
        .catch(err => {
          commit("setError", err.message);
          commit("setLoading", false);
        });
    },
    AUTO_SIGNIN({ commit }, payload) {
      commit("setLoading", true);
      let fromAccount = {
        uid: payload.uid,
        email: payload.email
      };
      fs("users")
        .doc(payload.uid)
        .get()
        .then(doc => {
          let user = {
            ...fromAccount,
            name: doc.data().name,
            phone: doc.data().phone
          };
          commit("setUser", user);
          commit("setLoading", false);
        });
    },
    LOGOUT({ commit }) {
      commit("setLoading", true);

      fb.auth()
        .signOut()
        .then(() => {
          commit("clearError")
          commit("setLoading", false);
          commit("setUser", null);

        })
        .catch(err => {
          commit("setError", err.message);
          commit("setLoading", false);
        });
    },
    SIGN_UP({ commit }, payload) {
      commit("setLoading", true);
      fb.auth()
        .createUserWithEmailAndPassword(payload.email, payload.password)
        .then(res => {
          let newUser = {
            email: payload.email,
            name: payload.name,
            phone: payload.phone
          };

          return fs("users")
            .doc(res.user.uid)
            .set(newUser)
            .then(() => {
              commit("setUser", {
                ...newUser,
                uid: res.user.uid
              });
              commit("setLoading", false);
            });
        }).catch(err => {
          commit("setError", err.message);
          commit("setLoading", false);
        })
    }
  },
  getters: {
    user(state) {
      return state.user;
    },
    error(state) {
      return state.error;
    }
  }
};
