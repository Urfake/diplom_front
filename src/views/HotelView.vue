<template>
  <div class="hotel-block">
    <img class="hotel-img" :src="hotel.imgUrl" alt="" />
    <h1 class="hotel-name">{{ hotel.hotelName }}</h1>
  </div>

  <DateRangeBooking ref="dateRange"></DateRangeBooking>
  <TimeBooking ref="timeBooking"></TimeBooking>

  <!-- <div class="room-types">
		<h3 class="select-room-text">Выберите подходящий номер для себя:</h3>
		<div class="room-types-items">
			<div class="room-type-item">
				<img src="images/room-type-1.png" class="room-type-img" alt="">
				<h3 class="room-type-text">2500 с<br>Стандарт</h3>
			</div>
			<div class="room-type-item">
				<img src="images/room-type-2.png" class="room-type-img" alt="">
				<h3 class="room-type-text">3000 с<br>Полулюкс</h3>
			</div>
			<div class="room-type-item">
				<img src="images/room-type-3.png" class="room-type-img" alt="">
				<h3 class="room-type-text">4000 с<br>Семейный</h3>
			</div>
			<div class="room-type-item">
				<img src="images/room-type-4.png" class="room-type-img" alt="">
				<h3 class="room-type-text">7000 с<br>Люкс</h3>
			</div>
		</div>
	</div> -->

  <div class="hotels-title" style="margin: 7vw 0 0 7.5%">Комнаты</div>

  <div class="room" v-for="(roomType, i) in hotel.roomTypeModels" :key="i">
    <div class="topchan-body">
      <img
        class="topchan-body-img"
        :src="roomType.roomTypeImageModels[0].img"
        alt=""
      />
      <div class="topchan-body-content">
        <h3>{{ roomType.type }}</h3>
        <p class="topchan-body-content-text">Зона: {{ hotel.areaName }}</p>
        <p class="topchan-body-content-text">Цена: {{ roomType.price }} сом</p>
        <p class="topchan-body-content-text">
          Количество номеров: {{ roomType.roomModels.length }}
        </p>
        <!-- <p class="topchan-body-content-text">Вместимость: </p>
				<p class="topchan-body-content-text">Доп услуги: </p> -->
      </div>
    </div>

    <div class="room-slider">
      <img
        :src="roomType.roomTypeImageModels[1].img"
        class="room-slider-img"
        alt=""
      />
      <img
        :src="roomType.roomTypeImageModels[2].img"
        class="room-slider-img"
        alt=""
      />
      <img
        :src="roomType.roomTypeImageModels[3].img"
        class="room-slider-img"
        alt=""
      />
      <img
        :src="roomType.roomTypeImageModels[4].img"
        class="room-slider-img"
        style="margin-right: 0"
        alt=""
      />
    </div>
    <div class="topchan-slider">
      <img
        :src="roomType.roomTypeImageModels[1].img"
        class="topchan-slider-img"
        alt=""
      />
      <img
        :src="roomType.roomTypeImageModels[2].img"
        class="topchan-slider-img"
        alt=""
      />
      <img
        :src="roomType.roomTypeImageModels[3].img"
        class="topchan-slider-img"
        style="margin-right: 0"
        alt=""
      />
    </div>
    <div class="clear"></div>
    <button
      @click="openDateRangeBooking(roomType)"
      class="hotel-body-content-button"
    >
      ЗАБРОНИРОВАТЬ
    </button>
    <button @click="openDateRangeBooking(roomType)" class="topchan-button">
      Бронировать
    </button>
  </div>

  <div
    v-if="hotel.hotelHallModels && hotel.hotelHallModels.length != 0"
    class="hotels-title"
    style="margin: 7vw 0 0 7.5%; width: 40%"
  >
    Дополнительные комнаты
  </div>

  <div class="room" v-for="(hotelHall, i) in hotel.hotelHallModels" :key="i">
    <div class="topchan-body">
      <img
        class="topchan-body-img"
        :src="hotelHall.hotelHall_imgModels[0].img"
        alt=""
      />
      <div class="topchan-body-content">
        <h3>{{ hotelHall.name }}</h3>
        <p class="topchan-body-content-text">Зона: {{ hotel.areaName }}</p>
        <p class="topchan-body-content-text">Цена: {{ hotelHall.price }} сом</p>
        <p class="topchan-body-content-text">
          Цена за след час: {{ hotelHall.priceForNextHours }} сом
        </p>
        <p class="topchan-body-content-text">
          Вместимость: {{ hotelHall.numberOfSeats }}
        </p>
      </div>
    </div>

    <div class="room-slider">
      <img
        :src="hotelHall.hotelHall_imgModels[1].img"
        class="room-slider-img"
        alt=""
      />
      <img
        :src="hotelHall.hotelHall_imgModels[2].img"
        class="room-slider-img"
        alt=""
      />
      <img
        :src="hotelHall.hotelHall_imgModels[3].img"
        class="room-slider-img"
        alt=""
      />
      <img
        :src="hotelHall.hotelHall_imgModels[4].img"
        class="room-slider-img"
        style="margin-right: 0"
        alt=""
      />
    </div>
    <div class="topchan-slider">
      <img
        :src="hotelHall.hotelHall_imgModels[1].img"
        class="topchan-slider-img"
        alt=""
      />
      <img
        :src="hotelHall.hotelHall_imgModels[2].img"
        class="topchan-slider-img"
        alt=""
      />
      <img
        :src="hotelHall.hotelHall_imgModels[3].img"
        class="topchan-slider-img"
        style="margin-right: 0"
        alt=""
      />
    </div>
    <div class="clear"></div>
    <button
      @click="hotelHotelHallModal(hotelHall)"
      class="hotel-body-content-button"
    >
      ЗАБРОНИРОВАТЬ
    </button>
    <button @click="hotelHotelHallModal(hotelHall)" class="topchan-button">
      Бронировать
    </button>
  </div>

  <footer class="green">
    <div class="container">
      <div class="row">
        <div class="logo">
          <img src="../assets/img/icons/logo.png" alt="logo" />
          <h6>Природный парк "Ала-Арча"</h6>
        </div>
        <div class="navigation">
          <h6>Навигация</h6>
          <ul>
            <li><a href="/">Главная</a></li>
            <li><a href="/about-us">История</a></li>
            <li><a href="/flora">Флора</a></li>
            <li><a href="/fauna">Фауна</a></li>
            <li><a href="/services">Услуги</a></li>
            <li><a href="/entry">Въезд</a></li>
          </ul>
        </div>
        <div class="contacts">
          <h6>Контакты</h6>
          <ul>
            <li>
              Менеджер (PR-маркетинг) <br />
              +996 (700) 267 680
            </li>
            <br />
            <li>
              КПП (пункт пропуска) <br />
              +996 (312) 88 32 05
            </li>
            <br />
          </ul>
        </div>
        <div class="address">
          <h6>Адрес</h6>
          <ul>
            <li>
              Кыргызская Республика, Чуйская обл, Аламудунский р-н, село
              Кашка-Суу
            </li>
          </ul>
          <h6>Электронный адрес</h6>
          <ul>
            <li>ala-archa@list.ru</li>
          </ul>
        </div>
        <div class="social">
          <h6>Социальные сети</h6>
          <ul>
            <li><img src="../assets/img/icons/facebook.png" alt="" /></li>
            <li><img src="../assets/img/icons/instagram.png" alt="" /></li>
            <li><img src="../assets/img/icons/twitter.png" alt="" /></li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import DateRangeBooking from "../components/DateRangeBooking.vue";
import TimeBookingObject from "../components/TimeBookingObject.vue";
import axios from "axios";
import TimeBooking from "@/components/TimeBooking.vue";

export default {
  data() {
    return {
      hotelId: null,
      hotel: null,
    };
  },
  components: {
    DateRangeBooking,
    // eslint-disable-next-line vue/no-unused-components
    TimeBookingObject,
    TimeBooking,
  },
  created() {
    this.hotelId = this.$route.params.id;
    axios
      .get("http://localhost:8083/hotel/get/" + this.hotelId)
      .then((response) => {
        this.hotel = response.data.value;
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
        this.errored = true;
      });
  },
  methods: {
    openDateRangeBooking(roomType) {
      if (
        this.$store.state.credentials.role == "CLIENT" ||
        this.$store.state.credentials.role == "ADMIN" ||
        this.$store.state.credentials.role == "SUPER_ADMIN"
      ) {
        this.$refs.dateRange.showModal = true;
        this.$refs.dateRange.roomType = roomType;
      } else {
        alert("Для бронирования нужно для начала авторизоваться!");
      }
    },

    hotelHotelHallModal(hotelHall) {
      if (
        this.$store.state.credentials.role == "CLIENT" ||
        this.$store.state.credentials.role == "ADMIN" ||
        this.$store.state.credentials.role == "SUPER_ADMIN"
      ) {
        this.$refs.timeBooking.showModal = true;
        this.$refs.timeBooking.hotelHall = hotelHall;
      } else {
        alert("Для бронирования нужно для начала авторизоваться!");
      }
    },
  },
};
</script>

<style src="../assets/css/all.css" />
