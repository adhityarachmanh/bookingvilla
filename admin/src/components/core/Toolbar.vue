<template>
  <v-toolbar id="core-toolbar" flat prominent style="background: #eee;">
    <div class="v-toolbar-title">
      <v-toolbar-title class="tertiary--text font-weight-light">
        <v-btn v-if="responsive" class="default v-btn--simple" dark icon @click.stop="onClickBtn">
          <v-icon>mdi-view-list</v-icon>
        </v-btn>
        {{ title }}
      </v-toolbar-title>
    </div>

    <v-spacer />
    <v-toolbar-items>
      <v-menu
        v-if="PROTECT_NOTIF"
        v-model="notifOpen"
        bottom
        left
        content-class="dropdown-menu"
        offset-y
        transition="slide-y-transition"
      >
        <router-link
          v-ripple
          slot="activator"
          class="toolbar-items"
          :to="$router.history.current.path"
        >
          <v-badge color="error" overlap>
            <template slot="badge" v-if="notif_unread.length>0">{{ notif_unread.length }}</template>
            <v-icon color="tertiary">mdi-bell</v-icon>
          </v-badge>
        </router-link>
        <v-card>
          <v-list dense>
            <v-list-tile   v-for="notif in notifikasi" :key="notif['.key']" @click="onClick">
              <v-list-tile-title
                :title="notif.booking_id"
              >{{notif.user}} | {{notif.text}} | {{MANAGE_DATE(notif.created_at)}}</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-card>
      </v-menu>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
import { mapMutations } from "vuex";
import FB from "@/config/fbConfig";
import moment from "moment";
export default {
  data: () => ({
    title: null,
    responsive: false,
    responsiveInput: false,
    notifOpen: false
  }),
  firestore() {
    const fs = tbl => FB.firestore().collection(tbl);
    return {
      data_notif: fs("notifikasi").orderBy("created_at", "desc")
    };
  },
  computed: {
    PROTECT_NOTIF() {
      console.log(this.data_notif.length)
      return this.data_notif.length>0
    },
    notifikasi() {
      return this.data_notif.slice(0, 5);
    },
    notif_unread() {
      return this.data_notif.filter(d => {
        return d.status==='unread';
      });
    }
  },
  watch: {
    notifOpen(val) {
      if (val) {
        this.$store.dispatch("READ_NOTIF");
      }
    },
    $route(val) {
      this.title = val.name;
    }
  },

  mounted() {
    this.onResponsiveInverted();
    window.addEventListener("resize", this.onResponsiveInverted);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.onResponsiveInverted);
  },

  methods: {
    MANAGE_DATE(date) {
      return moment(date.toDate()).fromNow();
    },
    ...mapMutations("app", ["setDrawer", "toggleDrawer"]),
    onClickBtn() {
      this.setDrawer(!this.$store.state.app.drawer);
    },
    onClick() {
      //
    },
    onResponsiveInverted() {
      if (window.innerWidth < 991) {
        this.responsive = true;
        this.responsiveInput = false;
      } else {
        this.responsive = false;
        this.responsiveInput = true;
      }
    }
  }
};
</script>

<style>
#core-toolbar a {
  text-decoration: none;
}
</style>
