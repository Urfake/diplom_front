<template>
  <div @click.self="closeBooking" v-show="showModal" class="modal-shad">
    <div class="book-window">
      <h2>Бронирование</h2>
      <h3>Выберите даты</h3>
      <div class="date-picker">
        <Datepicker
          v-model="date"
          range
          inline
          autoApply
          :min-date="new Date()"
          :disabledDates="disabledDates"
          :enableTimePicker="false"
        >
        </Datepicker>
      </div>
      <select v-model="objectId" id="selector">
        <option v-for="(object, i) in objects" :key="i" :value="object.id">
          {{ object.name }} ({{ object.numberOfSeats }} чел)
        </option>
      </select>
      <span style="display: block; margin-bottom: 1vw" class="validation"
        ><span v-if="details">{{ details }}</span></span
      >
      <button
        class="datepicker-book"
        @click="booking(objectId, date[0], date[1])"
      >
        Забронировать
      </button>
    </div>
  </div>
</template>

<script>
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import axios from "axios";

export default {
  components: {
    Datepicker,
  },
  data() {
    return {
      date: "",
      showModal: false,
      objects: [],
      objectId: null,
      details: null,
    };
  },
  methods: {
    closeBooking() {
      this.showModal = false;
    },

    booking(objectId, startDate, endDate) {
      let userId = this.$store.getters.getId;
      if (this.$store.getters.getRole == "CLIENT") {
        axios
          .post(
            "http://localhost:8083/object/order",
            { objectId, startDate, endDate, userId },
            {
              headers: {
                Authorization: this.$store.getters.getToken,
              },
            }
          )
          .then((resp) => {
            if (resp.status == 200) {
              alert(
                "Ваш заказ принят подождите пока его обработают. После обработки заказа к вам на электронную почту придет уведомление."
              );
              this.showModal = false;
              this.details = null;
            }
            console.log(this.$store.state);
          })
          .catch((error) => {
            if (!error.response) {
              this.$router.push("/error");
              this.$store.commit("setError", error);
            } else if (error.response.data.details === undefined) {
              this.$router.push("/error");
              this.$store.commit("setError", error);
            } else {
              this.signInErrorFlag = true;
              this.details = error.response.data.details;
              console.log(error.response.data);
            }
          });
      } else if (this.$store.getters.getRole == "ADMIN") {
        axios
          .post(
            "http://localhost:8083/object/order/admin",
            { objectId, startDate, endDate, userId },
            {
              headers: {
                Authorization: this.$store.getters.getToken,
              },
            }
          )
          .then((resp) => {
            if (resp.status == 200) {
              alert(
                "Ваш заказ принят подождите пока его обработают. После обработки заказа к вам на электронную почту придет уведомление."
              );
              this.showModal = false;
              this.details = null;
            }
            console.log(this.$store.state);
          })
          .catch((error) => {
            if (!error.response) {
              this.$router.push("/error");
              this.$store.commit("setError", error);
            } else if (error.response.data.details === undefined) {
              this.$router.push("/error");
              this.$store.commit("setError", error);
            } else {
              this.signInErrorFlag = true;
              this.details = error.response.data.details;
              console.log(error.response.data);
            }
          });
      }
    },
  },
};
</script>

<style></style>
