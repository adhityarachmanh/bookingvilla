<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout justify-center wrap>
      <v-flex>
        <material-card color="green" title="Booking (Success)" :text="DATE_NOW">
          <v-text-field style="width:30%" v-model="pencarian" placeholder="Cari Nama User..."></v-text-field>
          <v-data-table :headers="headers" :items="BOOKING" hide-actions>
            <template slot="headerCell" slot-scope="{ header }">
              <span
                class="subheading font-weight-light text-success text--darken-3"
                v-text="header.text"
              />
            </template>
            <template slot="items" slot-scope="{ index,item }">
              <td>{{ index+1 }}</td>
              <td>{{ item.name }}</td>
              <td>{{ item.villa }}</td>
              <td>{{ item.phone.replace("628","08") }}</td>
              <td>{{ MOMENT(item.start)+" - "+MOMENT(item.end) }}</td>
              <td>
                SUCCESS
              </td>
            </template>
          </v-data-table>
        </material-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import moment from "moment";
import FB from "@/config/fbConfig";

export default {
  firestore() {
    const fs = tbl => FB.firestore().collection(tbl);
    return {
      DATA_BOOKING: fs("booking")
    };
  },
  computed: {
    DATE_NOW() {
      return moment(new Date()).format("LL");
    },
    BOOKING_SUCCESS() {
      return this.DATA_BOOKING.filter(d => {
        return d.status;
      });
    },
    BOOKING() {
      if (this.PENCARIAN()) {
        return this.BOOKING_SUCCESS.filter(d => {
          return (
            d.name.toLowerCase().indexOf(this.pencarian.toLowerCase()) > -1
          );
        });
      }
      return this.BOOKING_SUCCESS;
    }
  },

  data: () => ({
    pencarian: "",
    headers: [
      {
        sortable: false,
        text: "No."
      },
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
        text: "Booking"
      },
      {
        sortable: false,
        text: "Status"
      }
    ]
  }),
  methods: {
    MOMENT(val) {
      return moment(val).format("LL");
    },
    PENCARIAN() {
      return this.pencarian !== "";
    }
  }
};
</script>
