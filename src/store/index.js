import Vue from "vue";
import Vuex from "vuex";
import firebase from "firebase";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    drawer: false,
    addresses: [],
    login_user: null,
  },
  mutations: {
    toggleSideMenu(state) {
      state.drawer = !state.drawer;
    },
    addAddress(state, { id, address }) {
      address.id = id;
      state.addresses.push(address);
    },
    setLoginUser(state, user) {
      state.login_user = user;
    },
    deleteLoginUser(state) {
      state.login_user = null;
    },
    updateAddress(state, { id, address }) {
      const index = state.addresses.findIndex((address) => address.id === id);
      state.addresses[index] = address;
    },
     deleteAddress(state, { id }) {
      const index = state.addresses.findIndex((address) => address.id === id);
      state.addresses.splice(index, 1)
    },
  },
  actions: {
    login() {
      const google_auth_provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithRedirect(google_auth_provider);
      console.log("login called");
    },
    logout() {
      firebase.auth().signOut();
    },
    toggleSideMenu({ commit }) {
      commit("toggleSideMenu");
    },
    addAddress({ getters, commit }, address) {
      if (getters.uid) {
        firebase
          .firestore()
          .collection(`users/${getters.uid}/addresses`)
          .add(address)
          .then((doc) => {
            commit("addAddress", { id: doc.id, address });
          });
      }
    },
    setLoginUser({ commit }, user) {
      commit("setLoginUser", user);
    },
    deleteLoginUser({ commit }) {
      commit("deleteLoginUser");
    },
    fetchAddresses({ getters, commit }) {
      firebase
        .firestore()
        .collection(`users/${getters.uid}/addresses`)
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc) =>
            commit("addAddress", { id: doc.id, address: doc.data() })
          );
        });
    },
    updateAddress({ getters, commit }, { id, address }) {
      if (getters.uid) {
        firebase
          .firestore()
          .collection(`users/${getters.uid}/addresses`)
          .doc(id)
          .update(address)
          .then(() => {
            commit("updateAddress", { id, address });
          });
      }
    },
    deleteAddress({ getters, commit }, { id }) {
      if (getters.uid) {
        firebase
          .firestore()
          .collection(`users/${getters.uid}/addresses`)
          .doc(id)
          .delete()
          .then(() => {
            commit("deleteAddress", { id });
          });
      }
    },
  },
  getters: {
    userName: (state) => (state.login_user ? state.login_user.displayName : ""),
    photoURL: (state) => (state.login_user ? state.login_user.photoURL : ""),
    uid: (state) => (state.login_user ? state.login_user.uid : null),
    getAddressById: (state) => (id) =>
      state.addresses.find((address) => address.id === id),
  },
  modules: {},
});
