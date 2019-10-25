<template>
  <v-badge color="red">
    <template v-slot:badge v-if="CHAT_UNREAD > 0">{{CHAT_UNREAD}}</template>
    <v-icon>chat</v-icon>
  </v-badge>
</template>
<script>
import fb from "@/config/firebaseConfig";
export default {
  firestore() {
    return {
      chat: fb.firestore().collection("chat")
    };
  },
  methods: {},
  computed: {
    user() {
      return this.$store.getters.user;
    },
    CHAT_UNREAD() {
      return this.chat.filter(d => {
        return (
          d.uid === this.user.uid && d.status === "unread" && d.from === "admin"
        );
      }).length;
    }
  }
};
</script>