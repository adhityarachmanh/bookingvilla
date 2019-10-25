<template>
  <v-dialog persistent v-model="dialog" transition="slide-y-transition" max-width="600px">
    <v-card class="grey darken-3" dark>
      <app-alert @dismissed="onDismissed" v-if="error" :text="error" />
      <v-card-title class="primary lighten-1">
        <span class="headline">Sign In</span>
        <v-spacer></v-spacer>
        <v-btn @click="TUTUP_DIALOG" small text rounded fab>
          <v-icon>close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-container grid-list-md>
          <v-form ref="form" @submit.prevent="SIGN_IN">
            <v-text-field v-model="user.email" name="email" label="Email" type="email" required></v-text-field>
            <v-text-field
              v-model="user.password"
              name="password"
              label="Password"
              :type="showPwd?'text':'password'"
              :append-icon="showPwd?'visibility':'visibility_off'"
              @click:append="showPwd=!showPwd"
              required
            ></v-text-field>
            <v-layout row>
              <v-btn
                v-if="!loading"
                type="submit"
                color="primary lighten-1"
                depressed
                rounded
              >Sign In</v-btn>
              <v-spacer v-if="!loading"></v-spacer>

              <v-progress-linear v-else indeterminate color="primary lighten-1"></v-progress-linear>
            </v-layout>
          </v-form>
        </v-container>
      </v-card-text>

      <v-card-actions></v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  props: ["dialog"],
  computed: {
    loading() {
      return this.$store.getters.loading;
    },
    error() {
      return this.$store.getters.error;
    },
    DATA_USER() {
      return this.$store.getters.user;
    }
  },
  data: () => ({
    showPwd: false,
    // dialog: false,
    user: {
      email: "",
      password: ""
    },
    alert: {
      status: false,
      text: null
    }
  }),
  watch: {
    dialog(payload) {
      if (payload === false) {
        this.reset();
      }
    },
    DATA_USER(payload) {
      if (payload) {
        if (payload && this.dialog === true) {
          this.TUTUP_DIALOG();
        }
      }
    }
  },
  methods: {
    TUTUP_DIALOG() {
      this.$store.dispatch("MANAGE_DIALOG", "SIGNIN_DIALOG");
    },
    reset() {
      this.user = { email: "", password: "" };
    },
    SIGN_IN() {
      let user = {
        ...this.user
      };
      this.$store.dispatch("SIGN_IN", user);
    }
  }
};
</script>
