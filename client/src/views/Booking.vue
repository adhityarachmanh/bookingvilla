<template>
  <div class="galery" data-aos="fadeIn" data-aos-duration="2000">
    <PARALAX :PARALAX="DATA_PARALAX" />
    <v-container grid-list-xs>
      <v-layout row justify-center>
        <v-flex xs12 md10>
          <v-item-group v-model="pilih " mandatory>
            <v-container grid-list-md>
              <v-layout row>
                <v-flex v-for="n in villa" :key="n" xs4 md4>
                  <v-item v-slot:default="{ active, toggle }">
                    <v-img
                      :src="n.gambar"
                      height="200"
                      style="border-radius:5px;cursor:pointer;"
                      :class="`d-flex align-center pa-2 ${active?'border':null} white--text `"
                      @click="toggle"
                    >
                      <v-scroll-y-transition>
                        <div
                          v-if="active"
                          :class="`display-${size} flex-grow-1 text-center text-capitalize  font-weight-bold`"
                        >
                          Selected
                          <v-chip class="title primary lighten-1">{{VILLA_NAME}}</v-chip>
                        </div>
                      </v-scroll-y-transition>
                    </v-img>
                  </v-item>
                </v-flex>
              </v-layout>
              <v-layout class="mt-5" row v-if="pilih!==null">
                <v-flex v-for="(n,i) in 2" :key="i" xs12 md6>
                  <table-booking :all_booking="all_booking" :villa="VILLA_NAME" v-if="i===0" />
                  <form-booking v-else :all_booking="all_booking" :villa="VILLA_NAME" />
                </v-flex>
              </v-layout>
            </v-container>
          </v-item-group>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>
<script>
import PARALAX from "@/components/paralax";
import fb from "@/config/firebaseConfig";
export default {
  created() {
    if (window.innerWidth < 600) {
      this.size = this.size / 3;
    }
    console.log(this.booking);
  },
  firestore() {
    return {
      all_booking: fb.firestore().collection("booking")
    };
  },
  name: "Galery",
  data: () => ({
    size: 3,
    pilih: null,
    villa: [
      {
        name: "Villa 1",
        gambar: require("@/assets/img/villa/villa-1.jpg")
      },
      {
        name: "Villa 2",
        gambar: require("@/assets/img/villa/villa-2.jpg")
      },
      {
        name: "Villa 3",
        gambar: require("@/assets/img/villa/villa-3.jpg")
      }
    ]
  }),
  components: {
    PARALAX
  },
  mounted: {},
  watch: {},
  methods: {},
  computed: {
    VILLA_NAME() {
      return this.villa[this.pilih].name;
    },
    DATA_PARALAX() {
      return {
        name: "Booking Villa",
        gambar: require("@/assets/img/vbanner.webp"),
        height: "150",
        text: ""
      };
    }
  }
};
</script>
<style scoped>
.border {
  border: solid 1px;
}
</style>