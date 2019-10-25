<template>
  <div>
    <v-btn @click="CHAT_DIALOG" rounded small depressed class="mr-2" color="primary lighten-1">
      <badge-unread />
    </v-btn>
    <v-menu v-model="menu" :close-on-content-click="false" offset-y transition="slide-x-transition">
      <template v-slot:activator="{ on }">
        <v-btn
          class="hidden-md-and-down"
          rounded
          color="primary lighten-1"
          small
          depressed
          v-on="on"
        >
          <v-icon>person</v-icon>
          {{user.name}}
        </v-btn>
      </template>
      <v-card dark color="primary lighten-1" max-width="300">
        <v-list color="primary lighten-1">
          <v-list-item>
            <v-list-item-avatar color="grey">IMG</v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>{{user.name}}</v-list-item-title>
              <v-list-item-subtitle>{{user.email}}</v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-action></v-list-item-action>
          </v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list dark>
          <v-list-item @click="LOGOUT" link>
            <v-list-item-action>
              <v-icon>logout</v-icon>
            </v-list-item-action>
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item>
        </v-list>

        <v-card-actions></v-card-actions>
      </v-card>
    </v-menu>
  </div>
</template>
<script>
export default {
  data: () => ({
    fav: true,
    menu: false
  }),
  computed: {
    user() {
      return this.$store.getters.user;
    }
  },
  methods: {
    CHAT_DIALOG() {
       this.$store.dispatch("MANAGE_DIALOG", "CHAT_DIALOG");
    },
    LOGOUT() {
      this.$store.dispatch("LOGOUT");
    }
  }
};
</script>

