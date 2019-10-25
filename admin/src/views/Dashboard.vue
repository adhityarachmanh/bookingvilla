<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout wrap>
      <v-flex sm6 xs12 md6 lg3>
        <material-stats-card
          color="green"
          icon="mdi-account"
          title="User"
          :value="length(DATA_USER)"
          sub-icon="mdi-calendar"
          :sub-text="DATE_NOW"
        />
      </v-flex>
      <v-flex sm6 xs12 md6 lg3>
        <material-stats-card
          color="orange"
          icon="mdi-calendar"
          title="Waiting Confirmation"
          :value="length(BOOKING_CONFIRMATION)"
          sub-icon="mdi-calendar"
          :sub-text="DATE_NOW"
        />
      </v-flex>
      <v-flex sm6 xs12 md6 lg3>
        <material-stats-card
          color="green"
          icon="mdi-calendar"
          title="Booking Villa"
          :value="length(BOOKING_SUCCESS)"
          sub-icon="mdi-calendar"
          :sub-text="DATE_NOW"
        />
      </v-flex>
      <v-flex sm6 xs12 md6 lg3>
        <material-stats-card
          color="info"
          icon="mdi-bell"
          title="Notifikasi"
          :value="length(DATA_NOTIF)"
          sub-icon="mdi-calendar"
          :sub-text="DATE_NOW"
        />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import FB from "@/config/fbConfig";
import moment from "moment";
export default {
  data() {
    return {
      headers: [
        {
          sortable: false,
          text: "Name",
          value: "name"
        },
        {
          sortable: false,
          text: "Villa",
          value: "villa"
        },
        {
          sortable: false,
          text: "Phone",
          value: "phone"
        },
        {
          sortable: false,
          text: "Start",
          value: "start"
        },
        {
          sortable: false,
          text: "End",
          value: "end"
        },
        {
          sortable: false,
          text: "Action"
        }
      ]
    };
  },
  firestore() {
    const fs = tbl => FB.firestore().collection(tbl);
    return {
      DATA_BOOKING: fs("booking"),
      DATA_USER: fs("users"),
      DATA_CHAT: fs("users"),
      DATA_NOTIF: fs("notifikasi")
    };
  },
  computed: {
    DATE_NOW() {
      return moment().format("LLLL");
    },
    BOOKING_SUCCESS() {
      return this.DATA_BOOKING.filter(d => {
        return d.status;
      });
    },
    BOOKING_CONFIRMATION() {
      return this.DATA_BOOKING.filter(d => {
        return !d.status;
      });
    },
    BOOKING() {
      return this.DATA_BOOKING.filter(d => {
        return (
          !d.status &&
          moment(d.end).format("LLLL") > moment(new Date()).format("LLLL")
        );
      });
    }
  },
  methods: {
    length(val) {
      return val && val.length;
    },
    MANAGE_DATE(date) {
      return moment(date).format("LL");
    },
    complete(index) {
      this.list[index] = !this.list[index];
    }
  }
};
</script>
