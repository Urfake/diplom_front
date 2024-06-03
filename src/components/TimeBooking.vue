<template>
  <div @click.self="closeBooking" v-show="showModal" class="modal-shad">
    <div class="book-window-time">
      <h2>Бронирование</h2>
      <h3>Выберите даты</h3>
      <div class="datePickerTime">
        <div class="date-picker">
          <Datepicker
            v-model="date"
            inline
            autoApply
            :min-date="new Date()"
            :disabledDates="disabledDates"
            :enableTimePicker="false"
          >
          </Datepicker>
        </div>
        <div class="time-picker">
          <label for="first">Выберите время начала:</label>
          <div></div>
          <select id="first" v-model="firstSelectedIndex">
            <option
              v-for="(val, i) in freeTimes"
              :key="i"
              :value="i"
              :class="{ isBooked: !val.isBook }"
              :disabled="!val.isBook"
            >
              {{ val.time }}
            </option>
          </select>
          <label for="second">Выберите время окончания:</label>
          <div></div>
          <select id="second" v-model="secondSelected">
            <option v-for="(val, i) in secTimes" :key="i" :value="val.time">
              {{ val.time }}
            </option>
          </select>
        </div>
      </div>
      <span
        style="display: block; margin-bottom: 1vw; margin-top: 20px"
        class="validation"
        ><span v-if="error"
          >Вы не можете забронировать на это время пожалуйста обновите
          страницу!</span
        ></span
      >
      <button
        class="datepicker-book"
        @click="booking(firstSelected + ':00', secondSelected + ':00', date)"
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
      freeTimes: [
        { time: "00:00", isBook: true },
        { time: "01:00", isBook: true },
        { time: "02:00", isBook: true },
        { time: "03:00", isBook: true },
        { time: "04:00", isBook: true },
        { time: "05:00", isBook: true },
        { time: "06:00", isBook: true },
        { time: "07:00", isBook: true },
        { time: "08:00", isBook: true },
        { time: "09:00", isBook: true },
        { time: "10:00", isBook: true },
        { time: "11:00", isBook: true },
        { time: "12:00", isBook: true },
        { time: "13:00", isBook: true },
        { time: "14:00", isBook: true },
        { time: "15:00", isBook: true },
        { time: "16:00", isBook: true },
        { time: "17:00", isBook: true },
        { time: "18:00", isBook: true },
        { time: "19:00", isBook: true },
        { time: "20:00", isBook: true },
        { time: "21:00", isBook: true },
        { time: "22:00", isBook: true },
        { time: "23:00", isBook: true },
      ],
      firstSelectedIndex: 0,
      firstSelected: "",
      secondSelected: "",
      secTimes: [
        { time: "00:00", isBook: true },
        { time: "01:00", isBook: true },
        { time: "02:00", isBook: true },
        { time: "03:00", isBook: true },
        { time: "04:00", isBook: true },
        { time: "05:00", isBook: true },
        { time: "06:00", isBook: true },
        { time: "07:00", isBook: true },
        { time: "08:00", isBook: true },
        { time: "09:00", isBook: true },
        { time: "10:00", isBook: true },
        { time: "11:00", isBook: true },
        { time: "12:00", isBook: true },
        { time: "13:00", isBook: true },
        { time: "14:00", isBook: true },
        { time: "15:00", isBook: true },
        { time: "16:00", isBook: true },
        { time: "17:00", isBook: true },
        { time: "18:00", isBook: true },
        { time: "19:00", isBook: true },
        { time: "20:00", isBook: true },
        { time: "21:00", isBook: true },
        { time: "22:00", isBook: true },
        { time: "23:00", isBook: true },
      ],
      hotelHall: null,
      bookedTimes: [],
      error: false,
    };
  },
  methods: {
    closeBooking() {
      this.showModal = false;
      this.error = false;
    },

    booking(startTime, endTime, startDate) {
      let hotelHallId = this.hotelHall.id;
      let userId = this.$store.getters.getId;

      if (this.$store.getters.getRole == "CLIENT") {
        axios
          .post(
            "http://localhost:8083/hotelHall/order",
            { hotelHallId, startDate, startTime, endTime, userId },
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
            }
            console.log(this.$store.state);
          })
          .catch((error) => {
            this.error = true;
            if (!error.response) {
              this.$store.commit("setError", error);
            } else if (error.response.data.details === undefined) {
              this.$store.commit("setError", error);
            } else {
              this.signInErrorFlag = true;
              this.signInErrorMessage = error.response.data.details;
              console.log(error.response.data);
            }
          });
      } else if (this.$store.getters.getRole == "ADMIN") {
        axios
          .post(
            "http://localhost:8083/hotelHall/order/admin",
            { hotelHallId, startDate, startTime, endTime, userId },
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
            }
            console.log(this.$store.state);
          })
          .catch((error) => {
            this.error = true;
            if (!error.response) {
              this.$store.commit("setError", error);
            } else if (error.response.data.details === undefined) {
              this.$store.commit("setError", error);
            } else {
              this.signInErrorFlag = true;
              this.signInErrorMessage = error.response.data.details;
              console.log(error.response.data);
            }
          });
      }
    },
  },
  watch: {
    firstSelectedIndex(newVal) {
      this.secTimes = [];
      for (let i = 0; i < this.freeTimes.length; i++) {
        if (i > newVal) {
          if (!this.freeTimes[i].isBook) {
            break;
          }
          this.secTimes.push(this.freeTimes[i]);
        }
      }
    },
    date(newVal) {
      this.freeTimes = [
        { time: "00:00", isBook: true },
        { time: "01:00", isBook: true },
        { time: "02:00", isBook: true },
        { time: "03:00", isBook: true },
        { time: "04:00", isBook: true },
        { time: "05:00", isBook: true },
        { time: "06:00", isBook: true },
        { time: "07:00", isBook: true },
        { time: "08:00", isBook: true },
        { time: "09:00", isBook: true },
        { time: "10:00", isBook: true },
        { time: "11:00", isBook: true },
        { time: "12:00", isBook: true },
        { time: "13:00", isBook: true },
        { time: "14:00", isBook: true },
        { time: "15:00", isBook: true },
        { time: "16:00", isBook: true },
        { time: "17:00", isBook: true },
        { time: "18:00", isBook: true },
        { time: "19:00", isBook: true },
        { time: "20:00", isBook: true },
        { time: "21:00", isBook: true },
        { time: "22:00", isBook: true },
        { time: "23:00", isBook: true },
      ];
      if (newVal != null) {
        for (let i in this.hotelHall.hotelHallOrders) {
          let startDate = new Date(
            this.hotelHall.hotelHallOrders[i].startDate.split("T")[0]
          );
          if (
            startDate.getFullYear() == newVal.getFullYear() &&
            startDate.getMonth() == newVal.getMonth() &&
            startDate.getDate() == newVal.getDate()
          ) {
            let checkpoint = false;
            for (let j in this.freeTimes) {
              if (
                this.freeTimes[j].time + ":00" ==
                this.hotelHall.hotelHallOrders[i].startTime
              ) {
                checkpoint = true;
              }
              if (checkpoint) {
                this.freeTimes[j].isBook = false;
              }
              if (
                this.freeTimes[j].time + ":00" ==
                this.hotelHall.hotelHallOrders[i].endTime
              ) {
                checkpoint = false;
              }
            }

            this.hotelHall.hotelHallOrders[i].endTime;
          }
        }
      }
    },
  },
  computed: {
    firstSelected() {
      return this.freeTimes[this.firstSelectedIndex].time;
    },
  },
};
</script>

<style></style>
