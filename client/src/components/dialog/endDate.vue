<template>
  <v-dialog
    v-model="dialog.END_DIALOG"
    persistent
    scrollable
    max-width="400px"
    :overlay="false"
    transition="dialog-transition"
  >
    <v-card dark>
      <v-card-title primary-title>
        End Date
        <v-spacer></v-spacer>
        <v-btn fab @click="TUTUP_DIALOG" text small depressed>
          <v-icon>close</v-icon>
        </v-btn>
      </v-card-title>

      <v-date-picker
        width="100%"
        v-model="date.end"
        header-color="primary"
        color="primary lighten-1"
        :show-current="true"
        :allowed-dates="ALLOW_DATES"
      ></v-date-picker>
      <app-alert v-if="alert.status" :text="alert.text" />

      <v-alert v-else type="info">Pilih Tanggal Akhir Booking</v-alert>
    </v-card>
  </v-dialog>
</template>

<script>
import moment from "moment";
export default {
  props: ["ALLOW_DATES", "start"],
  data: () => ({
    date: {
      end: null
    },
    alert: {
      status: false,
      type: null,
      text: null
    }
  }),
  watch: {
    end(end) {
      if (end) {
        if (
          end < moment(new Date()).format("YYYY-MM-DD") ||
          this.start === end ||
          this.start > end ||
          end === moment(new Date()).format("YYYY-MM-DD")
        ) {
          this.SUMMON_ALERT(
            true,
            "error",
            "Tanggal yang Anda pilih tidak valid"
          );
          this.$emit("DATE", {
            update: "end",
            value: null
          });
          return;
        }
        this.$emit("DATE", {
          update: "end",
          value: end
        });
        this.TUTUP_DIALOG();
      }
    }
  },
  computed: {
    end() {
      return this.date.end;
    },
    dialog() {
      return this.$store.getters.dialog;
    }
  },
  methods: {
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
      this.$store.dispatch("MANAGE_DIALOG", "END_DIALOG");
      this.UNSUMMON_ALERT();
    }
  }
};
</script>