<template>
  <v-footer
    id="core-footer"
    absolute
    height="82"
  >

    <v-spacer/>
    <span class="font-weight-light copyright">
      &copy;
      {{ (new Date()).getFullYear() }}
      <a
        href="#"
     >Admin Benteng Portugis</a>, made with Rizka Anggi
    
    </span>
  </v-footer>
</template>

<script>
export default {
  data: () => ({
   
  })
}
</script>

<style>
#core-footer {
  z-index: 0;
}
</style>
