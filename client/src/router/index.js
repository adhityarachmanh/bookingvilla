import Vue from "vue";
import Router from "vue-router";
import Home from "@/views/Home.vue";
import About from "@/views/About.vue";
import Galery from "@/views/Galery.vue";
import Pavilion from "@/views/Pavilion.vue";
import Booking from "@/views/Booking.vue";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/about-us",
      name: "about us",
      component: About
    },
    {
      path: "/galery",
      name: "galery",
      component: Galery
    },
    {
      path: "/pavilion",
      name: "pavilion",
      component: Pavilion
    },
    {
      path: "/booking-villa",
      name: "booking villa",
      component: Booking
    }

  ]
});

export default router