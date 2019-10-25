<template>
  <div class="home" data-aos="fadeIn" data-aos-duration="2000">
    <!-- <v-parallax   src="@/assets/img/bg-masthead.jpg"> -->
    <PARALAX :PARALAX="DATA_PARALAX" />
    <v-container grid-list-xs mt-5>
      <v-layout justify-center row mt-5>
        <v-flex xs12 md12 xl6>
          <v-layout row justify-center class="white--text">
            <h1 class="text-lighten-3 display-2 font-weight-medium mb-5">Sejarah Benteng portugis</h1>
            <div style="text-indent: 4em; text-align:justify;">
              <p>Benteng Portugis ini dibangun tidak lepas karena keinginan Kerajaan Mataram untuk mengalahkan VOC (Belanda) yang akhirnya meminta bantuan kepada pihak ketiga yang bermusuhan dengan Belanda yaitu Portugis. Sebelumnya diceritakan Pada tahun 1916 Kota Sunda Kelapa / Jayakarta diduduki oleh VOC Belanda dan merupakan awal pendudukan Imperialis Belanda atas Bumi Indonesia.</p>
              <p>Sultan Agung yang saat itu merupakan Raja Kerajaan Mataram Islam merasa bahwa keberhasilan Belanda menguasai Jayakarta akan mengancam kekuasaan Mataram. Sehingga Sultan Agung berinisiatif untuk menyerang Belanda dengan mempersiapkan armada perangnya untuk menyerang kota Jayakarta yang diduduki oleh VOC Belanda. Masa penyerangan Sultan Agung terhadap VOC berlangsung selama 2 tahun berturut-turut, yaitu antara 1628 sampai 1629 tapi kekalahan diderita oleh pihak Mataram.</p>
              <p>Atas kekalahan tersebut Sultan Agung berfikir bahwa kemenangan atas Belanda dapat diraih jika serangan dilancarkan dari dua arah secara bersamaan yaitu dari darat dan laut. Sedangkan pasukan Mataram hanya mahir dalam peperangan di darat. Untuk itulah Sultan Agung meminta bantuan kepada Bangsa Portugis yang saat itu adalah seteru dari VOC. Itulah sebabnya kenapa ada Benteng Portugis di kota Jepara.</p>
            </div>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import PARALAX from "@/components/paralax";
export default {
  name: "Home",
  components: {
    PARALAX
  },
  props: ["JUDUL"],
  computed: {
    DATA_PARALAX() {
      return {
        name: this.JUDUL.toString()
          .replace(/,/g, " ")
          .toUpperCase(),
        gambar: require("@/assets/img/vbanner.webp"),
        height: "500",
        text: "Heritage of the portuguese state"
      };
    }
  },
  data: () => ({
    homeData: [
      { name: "About Us", icon: "location_city" },
      { name: "Contact Us", icon: "phone" },
      { name: "Galeri", icon: "photo_library" }
    ]
  })
};
</script>
