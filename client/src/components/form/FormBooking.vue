<template>
  <v-item>
    <v-card
      :class="`d-flex align-center ${user && BOOKED.length >0?'elevation-0':'border'} text-center pb-5`"
      dark
    >
      <v-layout row justify-center>
        <v-flex xs8 md8>
          <div class="display-1">
            {{TITLE}}
            <small class="title">({{villa}})</small>
          </div>

          <v-form v-if="user && user.uid &&!PROTECT_BOOKED" @submit.prevent="BOOKING">
            <v-text-field disabled label="Nama" :value="user.name"></v-text-field>
            <v-text-field disabled label="No Telepon" :value="user.phone"></v-text-field>
            <v-layout row wrap>
              <v-flex>
                <v-text-field
                  @focus="MANAGE_DIALOG('START_DIALOG')"
                  :value="date.start?MANAGE_DATE(date.start):null"
                  label="Start Date"
                ></v-text-field>
              </v-flex>

              <v-flex>
                <v-text-field
                  :value="date.end?MANAGE_DATE(date.end):null"
                  @focus="MANAGE_DIALOG('END_DIALOG')"
                  label="End Date"
                ></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout row>
              <v-flex>
                <v-btn
                  color="primary lighten-1"
                  @click="RESET_FORM"
                  rounded
                  outlined
                  depressed
                >Reset Form</v-btn>
              </v-flex>
              <v-flex>
                <v-btn
                  color="primary lighten-1"
                  :disabled="!PROTECT_SUBMIT"
                  type="submit"
                  rounded
                  depressed
                >Booking</v-btn>
              </v-flex>
            </v-layout>
            <app-start-dialog
              :MANAGE_ALL_BOOKING="MANAGE_ALL_BOOKING"
              v-on:DATE="FROM_EMIT_DATE($event)"
              :end="date.end"
              :ALLOW_DATES="ALLOW_DATES"
            />
            <app-end-dialog
              :MANAGE_ALL_BOOKING="MANAGE_ALL_BOOKING"
              v-on:DATE="FROM_EMIT_DATE($event)"
              :start="date.start"
              :ALLOW_DATES="ALLOW_DATES"
            />
          </v-form>
          <div v-if="!user  &&!PROTECT_BOOKED">
            <v-btn @click="SIGNIN_DIALOG" color="primary white--text" rounded outlined small>Login</v-btn>
            <span class="ml-1">Untuk Booking {{villa}}</span>
          </div>
          <div v-if="user && user.uid && PROTECT_BOOKED">
            <v-container fluid>
              <v-data-iterator :items="BOOKED" hide-default-footer>
                <template v-slot:default="props">
                  <v-row>
                    <v-col v-for="item in props.items" :key="item.name" cols="12">
                      <v-card class="elevation-0 primary">
                        <v-card-title class="subheading font-weight-bold">{{ item.name }}</v-card-title>

                        <v-divider></v-divider>

                        <v-list dense class="primary">
                          <v-list-item>
                            <v-list-item-content>Start:</v-list-item-content>
                            <v-list-item-content class="align-end">{{ MOMENT(item.start) }}</v-list-item-content>
                          </v-list-item>

                          <v-list-item>
                            <v-list-item-content>End:</v-list-item-content>
                            <v-list-item-content class="align-end">{{ MOMENT(item.end) }}</v-list-item-content>
                          </v-list-item>
                        </v-list>
                        <v-card-actions>
                          <v-layout row justify-center>
                            <v-btn
                              color="error darken-1"
                              small
                              class="pa-3"
                              rounded
                              depressed
                              @click="NOTIF_PROTECT(item)"
                            >Batalkan</v-btn>
                          </v-layout>
                        </v-card-actions>
                      </v-card>
                    </v-col>
                  </v-row>
                </template>
              </v-data-iterator>
            </v-container>
          </div>
        </v-flex>
      </v-layout>
    </v-card>
  </v-item>
</template>
<script>
import moment from "moment";
import Swal from "sweetalert2/dist/sweetalert2.js";
export default {
  props: ["villa", "all_booking"],
  created() {},
  data() {
    return {
      alert: {
        status: false,
        type: null,
        text: null
      },
      USER_LOGIN: false,
      today: new Date().toISOString().substr(0, 10),

      date: { start: null, end: null }
    };
  },
  watch: {
    date_end(val) {
      if (val) {
        if (
          this.date.start > val ||
          val < moment(new Date()).format("YYYY-MM-DD") ||
          this.date.start === val ||
          val === moment(new Date()).format("YYYY-MM-DD")
        ) {
          this.SUMMON_ALERT(
            true,
            "error",
            "Tanggal yang Anda pilih tidak valid"
          );
          this.date.end = null;
          return;
        }
        this.UNSUMMON_ALERT();
        this.date.endDialog = false;
      }
    }
  },
  computed: {
    TITLE() {
      if (this.user && this.BOOKED.length > 0) {
        return "Data Booking";
      }
      return "Form Booking";
    },
    BOOKED() {
      return (
        this.user &&
        this.all_booking &&
        this.all_booking.filter(d => {
          return (
            d.uid === this.user.uid &&
            d.villa === parseInt(this.villa.split(" ")[1]) &&
            !d.status &&
            moment(d.end).format("LLLL") > moment(new Date()).format("LLLL")
          );
        })
      );
    },
    PROTECT_BOOKED() {
      return this.user && this.BOOKED && this.BOOKED.length > 0;
    },
    PROTECT_SUBMIT() {
      return (
        this.date.start > moment(new Date()).format("YYYY-MM-DD") &&
        this.date.end > moment(new Date()).format("YYYY-MM-DD") &&
        this.date.start < this.date.end &&
        this.date.start !== null &&
        this.date.end !== null
      );
    },
    MANAGE_ALL_BOOKING() {
      return this.all_booking.filter(d => {
        return d.villa === parseInt(this.villa.split(" ")[1]);
      });
    },

    user() {
      return this.$store.getters.user;
    }
  },

  methods: {
    NOTIF_PROTECT(DATA) {
      Swal.fire({
        title: "Anda Yakin?",
        type: "warning",
        text: `Booking Villa ${DATA.villa} Akan Di Batalkan!`,
        confirmButtonText: "Ya, Batalkan",
        cancelButtonColor: "red",
        showCancelButton: true
      }).then(res => {
        if (res.value) {
          this.$store.dispatch("BATALKAN_BOOKING", DATA[".key"]);
          this.RESET_FORM();
        }
      });
    },
    MOMENT(val) {
      return moment(val).format("LL");
    },
    ALLOW_DATES(val) {
      return this.ALL_BETWEEN_DATE_START_END().indexOf(val) === -1;
    },
    ALL_BETWEEN_DATE_START_END() {
      const data = [];
      this.MANAGE_ALL_BOOKING.forEach(d => {
        Array.prototype.push.apply(
          data,
          this.SINGLE_BETWEEN_DATE_START_END(d.start, d.end)
        );
      });
      return data;
    },
    SINGLE_BETWEEN_DATE_START_END(start, end) {
      let dateArray = [];
      let currentDate = moment(start);
      let stopDate = moment(end);
      while (currentDate <= stopDate) {
        dateArray.push(moment(currentDate).format("YYYY-MM-DD"));
        currentDate = moment(currentDate).add(1, "days");
      }

      return dateArray;
    },
    MANAGE_DIALOG(dialog) {
      this.$store.dispatch("MANAGE_DIALOG", dialog);
    },
    FROM_EMIT_DATE(data) {
      this.date[data.update] = data.value;
    },

    BOOKING() {
      let villa = parseInt(this.villa.split(" ")[1]);
      let newBooking = {
        uid: this.user.uid,
        start: this.date.start,
        end: this.date.end,
        name: this.user.name,
        phone: this.user.phone,
        villa: villa,
        created_at: new Date()
      };
      if (this.PROTECT_SUBMIT) {
        Swal.fire({
          title: "Ingin Booking Villa " + villa,
          text: "Anda Membooking Villa " + villa,
          type: "warning",
          showCancelButton: true,
          cancelButtonColor: "red",
          cancelButtonText: "Batal",
          confirmButtonText: "Ya, Booking Sekarang !"
        }).then(res => {
          if (res.value) {
            this.$store.dispatch("BOOKING", newBooking);
            this.RESET_FORM();
          }
        });
      }
    },
    RESET_FORM() {
      this.phone = null;
      this.date.start = null;
      this.date.end = null;
    },

    MANAGE_DATE(val) {
      return moment(val).format("LL");
    },

    SIGNIN_DIALOG() {
      this.$store.dispatch("MANAGE_DIALOG", "SIGNIN_DIALOG");
    }
  }
};
</script>