
// Lib imports
import Vue from 'vue'
import Router from 'vue-router'


// Routes
import paths from './paths'

Vue.use(Router)

// Create a new router
const router = new Router({
  mode: 'history',
  routes: paths

})
export default router
