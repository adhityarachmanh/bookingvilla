<template>
  <div class="emoji-picker" style="border-radius:10px" v-if="show">
    <v-card height="300px" class="grey lighten-1"  v-if="show">
      <v-card-title class="blue white--text">
        <span class="headline">Pilih Emoji</span>
      </v-card-title>
      <v-card-text>
        <div class="emoji-content">
          <emoji v-for="(emoji,i) in emojis" :emoji="emoji" v-bind:key="i" @click="onEmojiClick"></emoji>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import Emoji from "./Emoji.vue";
import axios from "axios";
export default {
  data() {
    return {
      emojis: [],
      API_LINK:
        "https://raw.githubusercontent.com/shanraisshan/EmojiCodeSheet/master/json/string/People.json"
    };
  },
  props: {
    show: true
  },
  created() {
    axios
      .get(this.API_LINK)
      .then(res => {
        this.emojis = res.data.peoples.people;
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    onEmojiClick(emoji) {
      this.$emit("click", emoji);
    },
    closePicker() {
      this.$emit("close");
    }
  },
  components: {
    emoji: Emoji
  }
};
</script>

<style>
.emoji-picker {
  background: white;
  position: absolute;
  bottom: 5rem;
  left: 0;
  width: 300px;
  user-select: none;
}
.emoji-picker .emoji-header {
  display: flex;
  padding: 5px;
  box-shadow: 0px 5px 9px 0px rgba(0, 0, 0, 0.15);
}
.emoji-picker .emoji-header .emoji-close {
  margin-left: auto;
}
.emoji-picker .emoji-content {
  margin-top: 10px;
  overflow-y: auto;
  height: 200px;
}
.emoji-picker span {
  cursor: pointer;
  font-size: 25px;
}
</style>