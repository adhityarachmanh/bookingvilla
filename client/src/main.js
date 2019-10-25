import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";
import vuetify from "./plugins/vuetify";
import AOS from "aos";

import fb from "./config/firebaseConfig";
import "aos/dist/aos.css";
import Alert from "./components/alert";


import 'sweetalert2/src/sweetalert2.scss'
//dialog
import SignUpDialog from "./components/dialog/signup";
import SignInDialog from "./components/dialog/signin";
import ChatDialog from "./components/dialog/chat";
import AppDrawer from "./components/Layouts/Navbar/drawer";
import BadgeUnread from './components/dialog/chat/badge-unread'
import TableBooking from './components/table/TableBooking'
import FormBooking from './components/form/FormBooking'
import StartDate from './components/dialog/startDate'
import EndDate from './components/dialog/endDate'
import Notif from './components/dialog/notification'

import VueFirestore from 'vue-firestore';

Vue.config.productionTip = false;

Vue.component("app-alert", Alert);
Vue.component("app-sign-in-dialog", SignInDialog);
Vue.component("app-sign-up-dialog", SignUpDialog);
Vue.component("app-chat-dialog", ChatDialog);
Vue.component("app-drawer", AppDrawer);
Vue.component("badge-unread", BadgeUnread)
Vue.component("table-booking", TableBooking)
Vue.component("form-booking", FormBooking)
Vue.component("app-start-dialog", StartDate)
Vue.component("app-end-dialog", EndDate)
Vue.component("app-notif-dialog", Notif)

Vue.use(VueFirestore);

new Vue({
  router,
  store,
  vuetify,
  created() {

    fb.auth().onAuthStateChanged(user => {
      if (user.uid) {
        this.$store.dispatch("AUTO_SIGNIN", user);
      }
    });
    AOS.init();
  },
  render: h => h(App)
}).$mount("#app");
