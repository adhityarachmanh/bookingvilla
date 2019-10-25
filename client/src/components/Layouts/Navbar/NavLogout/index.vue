<template>
  <v-layout class="hidden-md-and-down">
    <v-spacer></v-spacer>
    <v-btn
      @click="DIALOG('SIGNIN_DIALOG')"
      color="primary lighten-2"
      outlined
      rounded
      depressed
      class="mr-1"
    >Sign In</v-btn>
    <v-btn
      @click="DIALOG('SIGNUP_DIALOG')"
      color="primary lighten-2"
      rounded
      depressed
      class="mr-1"
    >Sign Up</v-btn>
  </v-layout>
</template>
<script>
export default {
  methods: {
    DIALOG(dialog) {
      this.$store.dispatch("MANAGE_DIALOG", dialog);
    }
  }
};
</script>
