<template>
  <v-dialog
    v-model="dialog.START_DIALOG"
    persistent
    scrollable
    max-width="400px"
    :overlay="false"
    transition="dialog-transition"
  >
    <v-card dark>
      <v-card-title primary-title>
        Start Date
        <v-spacer></v-spacer>
        <v-btn fab @click="TUTUP_DIALOG" text small depressed>
          <v-icon>close</v-icon>
        </v-btn>
      </v-card-title>

      <v-date-picker
        width="100%"
        v-model="date.start"
        header-color="primary"
        color="primary lighten-1"
        :show-current="true"
        :allowed-dates="ALLOW_DATES"
      ></v-date-picker>
      <app-alert v-if="alert.status" :text="alert.text" />

      <v-alert v-else type="info">Pilih Tanggal Awal Booking</v-alert>
    </v-card>
  </v-dialog>
</template>

<script>
import moment from "moment";
export default {
  props: ["ALLOW_DATES", "end"],
  data: () => ({
    date: {
      start: null
    },
    alert: {
      status: false,
      type: null,
      text: null
    }
  }),
  watch: {
    start(start) {
      if (start) {
        if (this.HANDLE_CLICK(start)) {
          this.SUMMON_ALERT(
            true,
            "error",
            "Tanggal yang Anda pilih tidak valid"
          );
          this.$emit("DATE", {
            update: "start",
            value: null
          });
          return;
        }
        this.$emit("DATE", {
          update: "start",
          value: start
        });
        this.TUTUP_DIALOG();
      }
    }
  },
  computed: {
    start() {
      return this.date.start;
    },
    dialog() {
      return this.$store.getters.dialog;
    }
  },
  methods: {
    HANDLE_CLICK(start) {
      return (
        start < moment(new Date()).format("YYYY-MM-DD") ||
        this.end === start ||
        this.end < start ||
        start === moment(new Date()).format("YYYY-MM-DD")
      );
    },
    UNSUMMON_ALERT() {
      this.alert.status = false;
      this.alert.type = null;
      this.alert.text = null;
    },
    SUMMON_ALERT(status, type, text) {
      this.alert.status = status;
      this.alert.type = type;
      this.alert.text = text;
    },
    TUTUP_DIALOG() {
      this.$store.dispatch("MANAGE_DIALOG", "START_DIALOG");
      this.UNSUMMON_ALERT();
    }
  }
};
</script>