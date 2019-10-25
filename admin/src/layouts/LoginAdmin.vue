<template>
  <v-app dark>
    <v-container fill-height fluid grid-list-xl>
      <v-layout justify-center align-center wrap>
        <v-flex xs12 md4>
          <v-alert
            elevation="0"
            :type="error.status?'error':'info'"
            :value="true"
          >{{error.status?error.msg:'Login Admin'}}</v-alert>
          <material-card class="primary">
            <v-card-text class="text-xs-center">
              <v-form @submit.prevent="LOGIN_ADMIN">
                <v-container py-0>
                  <v-layout wrap justify-center>
                    <v-flex xs12 md10>
                      <v-text-field
                        :disabled="loading"
                        v-model="admin.email"
                        label="Email"
                        class="success-input"
                      />
                    </v-flex>
                    <v-flex xs12 md10>
                      <v-text-field
                        :disabled="loading"
                        v-model="admin.password"
                        :append-icon="visibility?'mdi-eye':'mdi-eye-off'"
                        @click:append="visibility = !visibility"
                        label="Password"
                        :type="!visibility?'password':'text'"
                        class="success-input"
                      />
                    </v-flex>
                    <v-flex xs12 v-if="loading">
                      <v-progress-linear indeterminate color="success"></v-progress-linear>
                    </v-flex>

                    <v-flex xs12 text-xs-right v-else>
                      <v-btn type="submit" class="mx-0 font-weight-light" color="success">Login</v-btn>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-form>
            </v-card-text>
          </material-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    admin: {
      email: "",
      password: ""
    },
    visibility: false
  }),
  computed: {
    ADMIN() {
      return this.$store.getters.admin;
    },
    loading() {
      return this.$store.getters.loading;
    },
    error() {
      return this.$store.getters.error;
    }
  },
  watch: {
    ADMIN(val) {
      if (val && val.uid) {
        this.$router.push("/admin/dashboard");
      }
    }
  },
  methods: {
    LOGOUT_ADMIN() {
      this.$store.dispatch("LOGOUT_ADMIN");
    },
    LOGIN_ADMIN() {
      const newAdmin = {
        ...this.admin
      };

      this.$store.dispatch("LOGIN_ADMIN", newAdmin);
    }
  }
};
</script>
