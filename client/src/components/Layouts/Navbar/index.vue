<template>
  <nav>
    <v-app-bar app elevate-on-scroll dark>
      <v-toolbar-title
        class="headline text-uppercase"
        style="cursor:pointer"
        @click="$router.push('/')"
      >
        <span class="primary--text text--lighten-1 mr-1">{{JUDUL[0]+" "+JUDUL[1]}}</span>
        <small class="font-weight-regular">{{JUDUL[2]}}</small>
      </v-toolbar-title>

      <v-toolbar-items class="hidden-md-and-down">
        <v-btn
          v-for="(btn,i) in navItem"
          v-bind:key="i"
          active-class="primary--text text--lighten-2"
          :to="btn.name.toLowerCase().replace(/ /g,'-')"
          text
        >{{btn.name}}</v-btn>
        <v-btn @click="$router.push('/booking-villa')" text small rounded depressed class="mr-1">
          <v-icon>home</v-icon>Booking Villa
        </v-btn>
      </v-toolbar-items>

      <v-spacer></v-spacer>
      <NavLogin v-if="USER_SIGNIN" />
      <NavLogout v-else />
      <v-icon @click="drawer=!drawer" class="hidden-md-and-up">menu</v-icon>
    </v-app-bar>
    <v-navigation-drawer dark temporary clipped app right v-model="drawer" class="hidden-md-and-up">
      <app-drawer :JUDUL="JUDUL" :USER_SIGNIN="USER_SIGNIN" />
    </v-navigation-drawer>
  </nav>
</template>

<script>
import { navItem } from "../data";
import NavLogin from "./NavLogin";
import NavLogout from "./NavLogout";
export default {
  props: ["JUDUL"],
  name: "Navbar",
  components: {
    NavLogin,
    NavLogout
  },
  data: () => ({
    drawer: false,
    navItem: navItem
  }),
  mounted() {},
  computed: {
   
    user() {
      return this.$store.getters.user;
    },
    USER_SIGNIN() {
      return this.user !== null && this.user !== undefined;
    }
  },

  methods: {
    NAV_LINK(name) {
      return this.$router.push("/" + name.toLowerCase().replace(/ /g, "-"));
    }
  }
};
</script>
