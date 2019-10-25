<template>
  <v-app>
    <core-filter />

    <core-toolbar />

    <core-drawer />

    <core-view />
  </v-app>
</template>
<script>
export default {
  computed: {
    admin() {
      return this.$store.getters.admin;
    }
  },
  watch: {
    admin(val) {
      if (!val) {
        this.$router.push("/login-admin");
      }
    }
  },
  methods: {}
};
</script>