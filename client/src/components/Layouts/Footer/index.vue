<template>
  <v-footer dark padless>
    <v-card class="flex" flat tile>
      <v-card-title class="primary lighten-1">
        <v-spacer></v-spacer>

        <v-btn v-for="icon in icons" :key="icon" class="mx-4" dark icon>
          <v-icon size="24px">{{ icon }}</v-icon>
        </v-btn>

        <v-spacer></v-spacer>
      </v-card-title>

      <v-card-actions class="grey darken-3 justify-center">
        <span class="font-weight-light">{{ new Date().getFullYear() }}</span>
        <span class="mx-2">-</span>
        <span class="primary--text text--lighten-1 mr-1">{{JUDUL[0]+" "+JUDUL[1]}}</span>
        <span class="font-weight-light">{{JUDUL[2]}}</span>
      </v-card-actions>
    </v-card>
  </v-footer>
</template><script>
export default {
  props: ["JUDUL"],
  name: "Footer",
  data: () => ({
    icons: ["fab fa-facebook", "fab fa-google-plus", "fab fa-line"]
  })
};
</script>
