<template>
  <div>
    <app-sign-in-dialog v-bind:dialog="dialog.SIGNIN_DIALOG" />
    <app-sign-up-dialog v-bind:dialog="dialog.SIGNUP_DIALOG" />
    <app-chat-dialog v-bind:dialog="dialog.CHAT_DIALOG" />
  </div>
</template>
<script>
export default {
  computed: {
    dialog() {
      return this.$store.getters.dialog;
    }
  },
  methods: {}
};
</script>