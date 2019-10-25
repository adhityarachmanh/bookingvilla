<template>
  <v-item>
    <v-card dark class="d-flex align-center">
      <v-layout>
        <v-flex>
          <v-sheet height="64">
            <v-toolbar flat color="primary lighten-1">
              <v-btn fab text small @click="prev">
                <v-icon small>arrow_back_ios</v-icon>
              </v-btn>
              <v-btn fab text small @click="next">
                <v-icon small>arrow_forward_ios</v-icon>
              </v-btn>
              <v-toolbar-title>{{ judul }}</v-toolbar-title>
              <v-spacer></v-spacer>
              <h3>Info Booking {{villa}}</h3>
            </v-toolbar>
          </v-sheet>
          <v-sheet height="400">
            <v-calendar
              ref="calendar"
              v-model="focus"
              event-color="primary"
              color="primary"
              :now="today"
              :type="type"
              :events="events"
              @click:event="showEvent"
              @change="updateRange"
            ></v-calendar>
            <v-menu
              v-model="selectedOpen"
              :close-on-content-click="false"
              :activator="selectedElement"
              full-width
              offset-x
            >
              <v-card dark min-width="350px" flat>
                <v-toolbar color="primary lighten-1">
                  <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
                  <v-spacer></v-spacer>
                </v-toolbar>
                <v-card-text>
                  <span>Booking {{PRETTY_DATE(selectedEvent.start)}} sampai {{PRETTY_DATE(selectedEvent.end)}}</span>
                </v-card-text>
                <v-card-actions>
                  <v-btn text color="secondary" @click="selectedOpen = false">Cancel</v-btn>
                </v-card-actions>
              </v-card>
            </v-menu>
          </v-sheet>
        </v-flex>
      </v-layout>
    </v-card>
  </v-item>
</template>

<script>
import moment from "moment";
export default {
  props: ["villa", "all_booking"],
  data: () => ({
    focus: "",
    start: "",
    end: "",
    type: "month",
    selectedEvent: {},
    selectedElement: null,
    selectedOpen: false,
    today: new Date().toISOString().substr(0, 10)
  }),
  computed: {
    events() {
      return this.all_booking.filter(d => {
        return (
          d.villa === parseInt(this.villa.split(" ")[1]) &&
          d.status &&
          moment(d.end).format("LLLL") > moment(new Date()).format("LLLL")
        );
      });
    },
    judul() {
      const { start, end } = this;
      if (!start || !end) {
        return `${moment(new Date()).format("MMMM")} ${moment(
          new Date()
        ).format("YYYY")}`;
      }

      const startMonth = this.monthFormatter(start);
      const endMonth = this.monthFormatter(end);
      const suffixMonth = startMonth === endMonth ? "" : endMonth;

      const startYear = start.year;
      const endYear = end.year;
      const suffixYear = startYear === endYear ? "" : endYear;

      const startDay = start.day + this.nth(start.day);
      const endDay = end.day + this.nth(end.day);

      switch (this.type) {
        case "month":
          return `${startMonth} ${startYear}`;
      }
      return "";
    },
    monthFormatter() {
      return this.$refs.calendar.getFormatter({
        timeZone: "UTC",
        month: "long"
      });
    }
  },
  methods: {
    PRETTY_DATE(val) {
      return moment(val).format("LL");
    },
    prev() {
      this.$refs.calendar.prev();
    },
    next() {
      this.$refs.calendar.next();
    },

    showEvent({ nativeEvent, event }) {
      const open = () => {
        this.selectedEvent = event;
        this.selectedElement = nativeEvent.target;
        setTimeout(() => (this.selectedOpen = true), 10);
      };

      if (this.selectedOpen) {
        this.selectedOpen = false;
        setTimeout(open, 10);
      } else {
        open();
      }

      nativeEvent.stopPropagation();
    },
    updateRange({ start, end }) {
      // You could load events from an outside source (like database) now that we have the start and end dates on the calendar
      this.start = start;
      this.end = end;
    },
    nth(d) {
      return d > 3 && d < 21
        ? "th"
        : ["th", "st", "nd", "rd", "th", "th", "th", "th", "th", "th"][d % 10];
    }
  }
};
</script>
<style scoped>
.my-event {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  border-radius: 2px;
  background-color: #1867c0;
  color: #ffffff;
  border: 1px solid #1867c0;
  width: 100%;
  font-size: 12px;
  padding: 3px;
  cursor: pointer;
  margin-bottom: 1px;
}
</style>

