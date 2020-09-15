import Vue from "vue";
import "./plugins/vuetify";
import "./plugins/vuetify";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import firebase from "firebase";

Vue.config.productionTip = false;

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBhLVZdP8oVhaF8doxdrxA4zUo1xHHNoyY",
  authDomain: "my-address-pj2-efde8.firebaseapp.com",
  databaseURL: "https://my-address-pj2-efde8.firebaseio.com",
  projectId: "my-address-pj2-efde8",
  storageBucket: "my-address-pj2-efde8.appspot.com",
  messagingSenderId: "299479965132",
  appId: "1:299479965132:web:a1bf845e78ea96459b1169",
  measurementId: "G-DW08613DDM",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
