<template>
  <v-container>
    <v-list class="text-center">
      <v-list-item justify-center>
        <v-list-item-content>
          <v-list-item-title class="title text-capitalize">
            <span class="primary--text text--lighten-1">{{JUDUL[0]+" "+JUDUL[1]}}</span>
            <small class="font-weight-regular">{{JUDUL[2]}}</small>
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider class="mt-4" light></v-divider>

      <v-list-item
        v-for="(btn,i) in navItem"
        v-bind:key="i"
        link
        :to="btn.name.toLowerCase().replace(/ /g,'-')"
      >
        <v-list-item-icon>
          <v-icon>dashboard</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title class="text-left">{{btn.name}}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-divider class="mt-4" light></v-divider>
    </v-list>
  </v-container>
</template>
<script>
import { navItem } from "@/components/Layouts/data";
export default {
  props: ["USER_SIGNIN", "JUDUL"],
  data: () => ({
    navItem: navItem
  })
};
</script>
