<template>
  <v-app>
    <Navbar :JUDUL="JUDUL" />
    <ALL-DIALOG />
    <v-content class="grey darken-3" fill-height>
      <router-view :JUDUL="JUDUL"></router-view>
    </v-content>

    <Footer :JUDUL="JUDUL" />
  </v-app>
</template>

<script>
import ALL_DIALOG from "@/components/dialog";
import Navbar from "@/components/Layouts/Navbar";
import Footer from "@/components/Layouts/Footer";
export default {
  name: "App",
  components: {
    "ALL-DIALOG": ALL_DIALOG,
    Navbar,
    Footer
  },
  data: () => ({
    judul: "Pantai Benteng Portugis"
  }),
  computed: {
    JUDUL() {
      return this.judul.split(" ");
    }
  },
  methods: {
    UPDATE_DIALOG(dialog) {
      this.dialog[dialog] = !this.dialog[dialog];
    }
  }
};
</script>
<style scoped>
.bg-app {
  background: #424242;
}
</style>