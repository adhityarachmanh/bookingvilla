
import Vue from 'vue'

// Components
import './components'

// Plugins
import './plugins'

// Sync router with store
import { sync } from 'vuex-router-sync'

// Application imports
import App from './App'
import i18n from '@/i18n'
import router from '@/router'
import store from '@/store'
import FB from './config/fbConfig'
import VueFirestore from 'vue-firestore'
import 'sweetalert2/src/sweetalert2.scss'
// Sync store with router
sync(store, router)

Vue.config.productionTip = false
Vue.use(VueFirestore)
/* eslint-disable no-new */
new Vue({
  i18n,
  router,
  store,
  created() {


    this.$store.dispatch("ADMIN_AUTO_LOGIN")
  },
  render: h => h(App)
}).$mount('#app')
