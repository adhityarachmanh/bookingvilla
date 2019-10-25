<template>
  <material-notification
    v-if="PROTECT_DATA"
    :class="`mb-3 ${match_id?'success':'info'} lighten-1 mb-3`"
    icon="mdi-account"
    style="cursor:pointer"
    @click="PILIH_USER(DATA_USER['.key'])"
  >
    <div class="title">
      {{DATA_USER.name}}
      <small
        v-if="UNREAD.length>0"
        style="border-radius:50%;"
        class="red lighten-1 py-1 px-2"
      >{{UNREAD.length}}</small>
    </div>
    <p>{{USER_CHAT&&USER_CHAT[0].text}}</p>
  </material-notification>
</template>
<script>
export default {
  props: ["DATA_CHAT", "DATA_USER", "pilih_user"],
  created() {},
  methods: {
    PILIH_USER(ID) {
      this.$emit("PILIH_USER", ID);
    }
  },
  computed: {
    UNREAD_AVAILABLE() {
      return this.UNREAD.length > 1;
    },
    UNREAD() {
      return this.USER_CHAT.filter(d => {
        return d.status === "unread" && d.to === "admin";
      });
    },
    match_id() {
      return this.pilih_user === this.DATA_USER[".key"];
    },
    USER_CHAT() {
      const CHAT = this.DATA_CHAT.filter(d => {
        return d.uid === this.DATA_USER[".key"];
      });
      return (
        CHAT &&
        CHAT.sort((d1, d2) => {
          return d1.created_at < d2.created_at;
        })
      );
    },
    PROTECT_DATA() {
      return this.USER_CHAT.length > 0;
    }
  }
};
</script>