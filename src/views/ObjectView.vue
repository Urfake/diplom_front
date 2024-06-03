<template>
  <br />
  <div class="container">
    <div class="topchan-head">
      <h2 class="topchan-head-title" style="width: 30%">
        {{ objectType.name }}
      </h2>
      <div class="clear"></div>
      <img
        :src="objectType.objectTypeImgModels[1].img"
        class="topchan-head-img1"
        alt=""
      />
      <img
        :src="objectType.objectTypeImgModels[0].img"
        class="topchan-head-img2"
        alt=""
      />
    </div>

    <h1 class="mobile-obj-title">Топчаны</h1>

    <DateRangeBookingObject ref="objectModal"></DateRangeBookingObject>
    <TimeBookingObject ref="objectModalTime"></TimeBookingObject>

    <div class="topchan-body">
      <img
        class="topchan-body-img"
        :src="objectType.objectTypeImgModels[0].img"
        alt=""
      />
      <div class="topchan-body-content">
        <p class="topchan-body-content-text">Зона: {{ objectType.areaName }}</p>
        <p class="topchan-body-content-text">
          Цена: {{ objectType.price }} сом
        </p>
        <p class="topchan-body-content-text">
          Цена за след час: {{ objectType.pricePerHour }} сом
        </p>
        <!-- <p class="topchan-body-content-text">Вместимость: {{ objectType.numberOfSeats }}</p> -->
        <button
          @click="
            openModalBooking(objectType.timeType, objectType.objectModels)
          "
          class="topchan-body-content-button"
        >
          ЗАБРОНИРОВАТЬ
        </button>
      </div>
    </div>

    <div class="topchan-slider">
      <img
        :src="objectType.objectTypeImgModels[2].img"
        class="topchan-slider-img"
        alt=""
      />
      <img
        :src="objectType.objectTypeImgModels[3].img"
        class="topchan-slider-img"
        alt=""
      />
      <img
        :src="objectType.objectTypeImgModels[4].img"
        class="topchan-slider-img"
        style="margin-right: 0"
        alt=""
      />
    </div>
    <div class="clear"></div>
    <button
      @click="openModalBooking(objectType.timeType, objectType.objectModels)"
      class="topchan-button"
    >
      Бронировать
    </button>
  </div>

  <h3
    class="object-menu-head"
    v-show="
      objectType.menuSectionModels && objectType.menuSectionModels.length != 0
    "
  >
    Меню услуг
  </h3>

  <div
    class="object-menu"
    v-show="
      objectType.menuSectionModels && objectType.menuSectionModels.length != 0
    "
  >
    <div v-for="(menuSection, i) in objectType.menuSectionModels" :key="i">
      <h5>{{ menuSection.name }}</h5>
      <div v-for="(menu, i) in menuSection.menuModels" :key="i">
        <h6>{{ menu.name }}</h6>
        <span>{{ menu.price }}c</span>
        <div class="clear"></div>
        <p>{{ menu.description }}</p>
        <div class="clear"></div>
      </div>
    </div>
  </div>

  <footer class="green">
    <div class="container">
      <div class="row">
        <div class="logo">
          <img src="../assets/img/icons/logo1.png" alt="logo" />
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
import DateRangeBookingObject from "../components/DateRangeBookingObject.vue";
import axios from "axios";
import TimeBookingObject from "../components/TimeBookingObject.vue";

export default {
  data() {
    return {
      objectId: null,
      objectType: null,
    };
  },
  components: {
    DateRangeBookingObject,
    TimeBookingObject,
  },
  created() {
    this.objectId = this.$route.params.id;
    axios
      .get("http://localhost:8083/object/type/get/" + this.$route.params.id)
      .then((response) => {
        this.objectType = response.data.value;
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
        this.errored = true;
      });
  },
  methods: {
    openModalBooking(timeType, objects) {
      if (
        this.$store.state.credentials.role == "CLIENT" ||
        this.$store.state.credentials.role == "ADMIN" ||
        this.$store.state.credentials.role == "SUPER_ADMIN"
      ) {
        if (timeType == "TIME") {
          this.$refs.objectModalTime.showModal = true;
          this.$refs.objectModalTime.objects = objects;
        } else if (timeType == "DATE") {
          this.$refs.objectModal.showModal = true;
          this.$refs.objectModal.objects = objects;
        }
      } else {
        alert("Для бронирования нужно для начала авторизоваться!");
      }
    },
  },
  
};
</script>

<style src="../assets/css/all.css" />
