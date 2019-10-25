<template>
  <v-dialog
    persistent
    hide-overlay
    v-model="dialog"
    transition="slide-y-transition"
    max-width="500px"
  >
    <v-card class="elevation-12" color="primary lighten-1">
      <v-card-title>
        <span class="headline white--text">Contact Us</span>
        <v-spacer></v-spacer>
        <v-btn @click="TUTUP_DIALOG" class="white--text" small text rounded fab>
          <v-icon>close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-list ref="chat" id="logs" style="border-radius:10px;" color="grey darken-3">
          <v-layout v-if="chat.length===0" justify-center>
            <v-chip class="primary lighten-1">Tidak Ada Pesan</v-chip>
          </v-layout>
          <v-list-item v-for="(item, index) in chat" :key="index">
            <v-list-item-avatar v-if="item.from==='admin'">
              <v-img src="@/assets/img/logo-admin.png"></v-img>
            </v-list-item-avatar>
            <v-list-item-content
              :class="item.from!=='admin'?'text-right white--text':'white--text'"
            >
              <v-list-item-title>
                <v-chip class="transparent mx-1" v-if="item.to==='admin'" dark>
                  <small>
                    <span class="green--text" v-if="item.status==='read'">Read</span>
                    <br />
                    <span>{{MANAGE_WAKTU(item.created_at)}}</span>
                  </small>
                </v-chip>
                <v-chip
                  v-if="item.text"
                  :class="item.from==='admin'?'primary lighten-1':'green lighten-1 white--text'"
                >
                  <span>{{item.text}}</span>
                </v-chip>
                <v-chip class="transparent mx-1" dark v-if="item.from==='admin'">
                  <small>
                    <br />
                    <span>{{MANAGE_WAKTU(item.created_at)}}</span>
                  </small>
                </v-chip>
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card-text>

      <v-container grid-list-xs>
        <v-form @submit.prevent="submit">
          <emoji-picker :show="emojiPanel" @close="toggleEmojiPanel" @click="sisipkanEmoji"></emoji-picker>

          <v-text-field
            v-model="text"
            label="Ketik Pesan..."
            append-icon="send"
            single-line
            solo-inverted
            prepend-icon="mood"
            @click:prepend="toggleEmojiPanel"
            @click:append="submit"
          />
        </v-form>
      </v-container>
    </v-card>
  </v-dialog>
</template>
<script>
import moment from "moment";
import fb from "@/config/firebaseConfig";
import EmojiPicker from "./chat/emoji/";

export default {
  props: ["dialog"],
  components: {
    "emoji-picker": EmojiPicker
  },
  data: () => ({
    text: "",
    emojiPanel: false
  }),
  firestore() {
    return {
      FS_CHAT: fb
        .firestore()
        .collection("chat")
        .orderBy("created_at", "asc")
    };
  },
  mounted() {
    this.interval = setInterval(() => {
      if (this.dialog && this.UNREAD.length > 0) {
        this.$store.dispatch("READ_CHAT", this.user.uid);
      }
    }, 1000);
  },
  destroyed() {
    clearInterval(this.interval);
  },
  computed: {
    UNREAD() {
      return this.chat.filter(d => {
        return d.status === "unread" && d.to === this.user.uid;
      });
    },
    user() {
      return this.$store.getters.user;
    },

    chat() {
      // auto scroll chat baru
      this.AUTO_SCROLL();
      return this.FS_CHAT.filter(d => {
        return d.uid === this.user.uid;
      });
    }
  },
  methods: {
    MANAGE_WAKTU(date) {
      return moment(date.toDate()).format("LT");
    },
    AUTO_SCROLL() {
      setTimeout(() => {
        this.$refs.chat.$el.scrollTop = this.$refs.chat.$el.scrollHeight;
      }, 0);
    },
    TUTUP_DIALOG() {
      this.$store.dispatch("MANAGE_DIALOG", "CHAT_DIALOG");
    },
    sisipkanEmoji(emoji) {
      this.text += emoji.value;
    },
    toggleEmojiPanel() {
      this.emojiPanel = !this.emojiPanel;
    },

    submit() {
      if (this.text !== "") {
        this.$store.dispatch("KIRIM_CHAT", {
          from: this.user.uid,
          uid: this.user.uid,
          to: "admin",
          status: "unread",
          text: this.text,
          created_at: new Date()
        });
      }
      this.text = "";
    }
  }
};
</script>
<style>
#logs {
  height: 300px;
  overflow: auto;
}
</style>
