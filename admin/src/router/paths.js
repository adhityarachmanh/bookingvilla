
import Dashboard from '@/views/Dashboard.vue'
import AdminLayout from '@/layouts/Admin.vue'
import LoginAdmin from '@/layouts/LoginAdmin.vue'
import AuthGuard from './auth-guard'

const MANAGE_COMPO = (data) => {
  return (resovle) => import(
    `@/views/${data}.vue`
  ).then(resovle)
}

export default [
  { path: "/", redirect: "/admin/dashboard" },
  {
    path: '/admin',
    name: 'admin',
    component: AdminLayout,
    beforeEnter: AuthGuard,
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: MANAGE_COMPO("Dashboard")
      },
      {
        path: 'chat',
        name: 'User Profile',
        component: MANAGE_COMPO("Chat")
      },
      {
        path: 'booking-list/success',
        name: 'Booking List',
        component: MANAGE_COMPO("Booking/Success")
      },
      {
        path: 'booking-list/waiting',
        name: 'Booking List',
        component: MANAGE_COMPO("Booking/Waiting")
      }
    ]

  },
  {
    path: '/login-admin',
    name: 'Login Admin',
    component: LoginAdmin
  }

]
