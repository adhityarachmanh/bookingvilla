<template>
  <v-dialog persistent v-model="dialog" transition="slide-y-transition" max-width="600px">
    <v-card class="grey darken-3" dark>
      <v-card-title class="primary lighten-1">
        <span class="headline">Sign Up</span>
        <v-spacer></v-spacer>
        <v-btn @click="TUTUP_DIALOG" small text rounded fab>
          <v-icon>close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-container grid-list-md>
          <v-form ref="form" @submit.prevent="SIGN_UP">
            <v-text-field v-model="user.name" label="Nama" type="text" required></v-text-field>
            <v-text-field
              v-model="user.phone"
              oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');"
              label="Phone"
              type="phone"
              required
            ></v-text-field>
            <v-text-field v-model="user.email" label="Email" type="email" required></v-text-field>
            <v-text-field v-model="user.password" label="Password" type="password" required></v-text-field>
            <v-btn v-if="!loading" type="submit" color="primary lighten-1" depressed rounded>Sign Up</v-btn>
            <v-progress-linear v-else indeterminate color="primary lighten-1"></v-progress-linear>
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
  data: () => ({
    user: {
      name: "",
      email: "",
      password: "",
      phone: ""
    }
  }),
  computed: {
    DATA_USER() {
      return this.$store.getters.user;
    },
    loading() {
      return this.$store.getters.loading;
    }
  },
  watch: {
    dialog(payload) {
      if (payload === false) {
        this.reset();
      }
    },
    DATA_USER(payload) {
      if (payload) {
        if (payload.uid && this.dialog === true) {
          this.TUTUP_DIALOG();
        }
      }
    }
  },
  methods: {
    TUTUP_DIALOG() {
      this.$store.dispatch("MANAGE_DIALOG", "SIGNUP_DIALOG");
    },
    reset() {
      this.user = { email: "", password: "" };
    },
    SIGN_UP() {
      console.log(this.user);
      let newUser = {
        ...this.user
      };
      this.$store.dispatch("SIGN_UP", newUser);
    }
  }
};
</script>
