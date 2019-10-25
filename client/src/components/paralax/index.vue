<template>
  <v-parallax :height="filterHeight(PARALAX.height)" :src="PARALAX.gambar">
    <v-layout align-center justify-center column>
      <h1
        :class="`white--text text-lighten-3 display-${size} font-weight-medium`"
        data-aos="fade-right"
        data-aos-duration="1000"
      >{{PARALAX.name}}</h1>
      <p class="subheading" data-aos="fade-up" data-aos-duration="1000">{{PARALAX.text}}</p>
    </v-layout>
  </v-parallax>
</template>
<script>
export default {
  props: ["PARALAX"],
  data: () => ({
    size: 3
  }),
  mounted() {
    if (window.innerWidth < 600) {
      this.size = this.size / 3;
    }
  },
  methods: {
    handleResize() {
      if (window.innerWidth < 600) {
        this.size = this.size / 3;
      }
    },
    filterHeight(data) {
      if (window.innerWidth < 600) {
        return (data * 2) / 3;
      }
      return data;
    }
  }
};
</script>
