<template>
  <div class="galery" data-aos="fadeIn" data-aos-duration="2000">
    <PARALAX :PARALAX="DATA_PARALAX" />

    <v-timeline :dense="$vuetify.breakpoint.smAndDown" class="white--text mx-5">
      <v-container grid-list-xs>
        <v-layout row justify-center>
          <v-flex xs12 md8>
            <v-timeline align-top :dense="$vuetify.breakpoint.smAndDown">
              <v-timeline-item color="primary" v-for="n in items" :key="n" icon="image">
                <v-img
                  :src="n.gambar"
                  class="hidden-md-and-down"
                  style="border-radius:5px;"
                  slot="opposite"
                  height="200"
                ></v-img>
                <v-card color="primary" dark>
                  <v-img :src="n.gambar" class="hidden-md-and-up" height="200"></v-img>
                  <v-card-title class="title text-capitalize">{{n.title}}</v-card-title>
                  <v-card-text class="white text--primary">
                    <p class="text-capitalize">{{n.text+'.'}}</p>
                  </v-card-text>
                </v-card>
              </v-timeline-item>
            </v-timeline>
          </v-flex>
        </v-layout>
      </v-container>
    </v-timeline>
  </div>
</template>
<script>
import PARALAX from "@/components/paralax";
export default {
  name: "Galery",
  data: () => ({
    items: [
      {
        title: "Villa 1",
        text: "ini adalah villa 1 kami",
        gambar: require("@/assets/img/villa/villa-1.jpg"),
        aos: {
          card: "fade-left",
          durasi: 1500
        }
      },
      {
        title: "Kamar Villa 1",
        text: "ini adalah kamar villa 1 kami",
        gambar: require("@/assets/img/villa/2.jpg"),
        aos: {
          card: "fade-right",
          durasi: 1500
        }
      },
      {
        title: "Villa 2",
        text: "ini adalah villa 2 kami",
        gambar: require("@/assets/img/villa/villa-2.jpg"),
        aos: {
          card: "fade-left",
          durasi: 1500
        }
      },
      {
        title: "Kamar Villa 2",
        text: "ini adalah kamar villa 2 kami",
        gambar: require("@/assets/img/villa/3.jpg"),
        aos: {
          card: "fade-left",
          durasi: 1500
        }
      },
      {
        title: "Villa 3",
        text: "ini adalah villa 3 kami",
        gambar: require("@/assets/img/villa/villa-3.jpg"),
        aos: {
          card: "fade-left",
          durasi: 1500
        }
      },
      {
        title: "Kamar Villa 3",
        text: "ini adalah kamar villa 3 kami",
        gambar: require("@/assets/img/villa/4.jpg"),
        aos: {
          card: "fade-right",
          durasi: 1500
        }
      }
    ]
  }),
  components: {
    PARALAX
  },
  computed: {
    DATA_PARALAX() {
      return {
        name: "Pavilion",
        gambar: require("@/assets/img/vbanner.webp"),
        height: "150",
        text: ""
      };
    }
  },
  methods: {}
};
</script>
