<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout justify-center wrap>
      <v-flex xs12 md4>
        <material-card
          color="primary lighten-1"
          title="User"
          class="grey darken-3"
          text="Select User To Start Chat"
        >
          <v-list id="logs" color="grey darken-3" class="grey darken-3">
            <core-chat-user
              v-on:PILIH_USER="PILIH_USER($event)"
              @click="PILIH_USER"
              v-for="(item,i) in users"
              :key="i"
              :pilih_user="pilih_user"
              :DATA_USER="item"
              :DATA_CHAT="DATA_CHAT"
            />
            <v-layout row justify-center v-if="DATA_CHAT.length===0">
              <v-chip class="warning lighten-1 white--text elevation-0">Tidak Ada Chat Dari User</v-chip>
            </v-layout>
          </v-list>
        </material-card>
      </v-flex>
      <v-flex xs12 md8>
        <material-card
          color="primary lighten-1"
          title="Chat "
          class="grey darken-3"
          :text="`${pilih_user?user.name:'Select User'}`"
        >
          <v-list ref="chat" id="logs" color="grey darken-3" class="grey darken-3">
            <v-layout row justify-center v-if="pilih_user===null">
              <v-chip
                class="warning lighten-1 white--text elevation-0"
              >Click User Untuk Memulai Chat</v-chip>
            </v-layout>
            <v-layout v-else v-for="(item,i) in chat" :key="i">
              <v-flex xs12 :class="`${item.from==='admin'?'text-xs-right':'text-xs-left'}`">
                <v-chip v-if="item.from==='admin'&&item.status==='read'" class="transparent" dark>
                  <small>
                    <span class="green--text">Read</span>
                    <br />
                    <span>{{MANAGE_WAKTU(item.created_at)}}</span>
                  </small>
                </v-chip>

                <v-chip
                  dark
                  :class="`${item.from==='admin'?'success':'primary'} lighten-1`"
                >{{item.text}}</v-chip>
                <v-chip class="transparent mx-1" dark v-if="item.from!=='admin'">
                  <small>
                    <br />
                    <span>{{MANAGE_WAKTU(item.created_at)}}</span>
                  </small>
                </v-chip>
              </v-flex>
            </v-layout>
          </v-list>

          <v-card-actions v-if="pilih_user!==null">
            <v-form @submit.prevent="submit" style="width:100%">
              <core-chat-emojis :show="emojiPanel" @close="toggleEmojiPanel" @click="sisipkanEmoji"></core-chat-emojis>
              <v-text-field
                v-model="text"
                label="Ketik Pesan..."
                append-icon="mdi-send"
                single-line
                full-width
                solo-inverted
                prepend-icon="mdi-emoticon"
                @click:prepend="toggleEmojiPanel"
                @click:append="submit"
              />
            </v-form>
          </v-card-actions>
        </material-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import FB from "@/config/fbConfig";
import moment from "moment";
export default {
  firestore() {
    return {
      DATA_CHAT: FB.firestore()
        .collection("chat")
        .orderBy("created_at", "asc"),
      users: FB.firestore()
        .collection("users")
        .orderBy("chat_updated", "desc")
    };
  },
  mounted() {
    this.interval = setInterval(() => {
      if (this.pilih_user !== null && this.UNREAD.length > 0) {
        console.log("Rubah Unread");
        this.$store.dispatch("READ_CHAT", this.pilih_user);
      }
    }, 1000);
  },
  destroyed() {
    clearInterval(this.interval);
  },

  computed: {
    UNREAD() {
      return this.chat.filter(d => {
        return d.status === "unread" && d.to === "admin";
      });
    },
    chat() {
      if (this.pilih_user) {
        this.AUTO_SCROLL();
      }
      return this.DATA_CHAT.filter(d => {
        return d.uid === this.pilih_user;
      });
    },
    user() {
      return {
        ...(this.pilih_user &&
          this.users.find(d => {
            return d[".key"] === this.pilih_user;
          }))
      };
    }
  },
  methods: {
    MANAGE_WAKTU(date) {
      return moment(date.toDate()).format("LT");
    },
    submit() {
      if (this.text !== "") {
        this.$store.dispatch("KIRIM_CHAT", {
          from: "admin",
          uid: this.pilih_user,
          to: this.pilih_user,
          status: "unread",
          text: this.text,
          created_at: new Date()
        });
      }
      this.text = "";
    },
    sisipkanEmoji(emoji) {
      console.log(emoji.value);
      this.text += emoji.value;
    },
    toggleEmojiPanel() {
      this.emojiPanel = !this.emojiPanel;
    },
    AUTO_SCROLL() {
      setTimeout(() => {
        this.$refs.chat.$el.scrollTop = this.$refs.chat.$el.scrollHeight;
      }, 0);
    },
    PILIH_USER(ID) {
      this.pilih_user = ID;
    }
  },
  data: () => ({
    pilih_user: null,
    text: "",
    emojiPanel: false
  })
};
</script>
<style>
#logs {
  height: 500px;
  overflow: auto;
  overflow-x: hidden;
}
</style>