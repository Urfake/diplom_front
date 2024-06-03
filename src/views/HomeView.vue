<template>
  <div class="pre-par">
    <img src="../assets/img/main/main.png" alt="" />
    <h1>Улуу-Тоо</h1>
  </div>

  <div class="container">
    <!-- <div class="locations">
      <h1>РЕКОМЕНДУЕМ ПОСМОТРЕТЬ</h1>
      <div class="row">
        <div class="photo">
          <img src="../assets/img/main/1.png" alt="" />
          <h4>Гостиницы Ала-Арчи</h4>
          <div class="btntext">
            <button @click="$router.push('/services')" id="moreBtn">
              Узнать подробнее
            </button>
          </div>
        </div>
        <div class="photo">
          <img src="../assets/img/fauna/bars.jpg" alt="" />
          <h4>Флора Ала-Арчи</h4>
          <div class="btntext">
            <button @click="$router.push('/flora')" id="moreBtn">
              Узнать подробнее
            </button>
          </div>
        </div>
        <div class="photo">
          <img src="../assets/img/main/3.png" alt="" />
          <h4>Фауна Ала-Арчи</h4>
          <div class="btntext">
            <button @click="$router.push('/fauna')" id="moreBtn">
              Узнать подробнее
            </button>
          </div>
        </div>
      </div>
    </div> -->
  </div>

  <div class="house1">
    <img src="../assets/img/main/4.png" />
    <!-- <h4 style="color: white">ПЕРЕЙТИ НА ПРОСМОТР УСЛУГ</h4> -->
  </div>

  <sign ref="sign" />

  <div class="container">
    <div class="authorization">
      <div class="row">
        <div class="col-6">
          <p>
            Хотите забранировать столик?<br />
            Авторизуйтесь
          </p>
        </div>
        <div class="col-6">
          <div class="button">
            <a @click="showModal()" class="green now-button font"
              >Авторизуйтесь сейчас</a
            >
          </div>
        </div>
      </div>
    </div>

    <div class="slider">
      <h2>Галерея</h2>
      <div class="row">
        <div class="gallery-slide">
          <img src="../assets/img/main/5.png" alt="" width="100%" />
        </div>
        <div class="gallery-slide">
          <img src="../assets/img/main/6.png" alt="" width="100%" />
        </div>
        <div class="gallery-slide">
          <img src="../assets/img/main/7.png" alt="" width="100%" />
        </div>
      </div>
    </div>

    <div class="parkMap" style="text-align: center">
      <h2>Карта ресторана Улуу-Тоо</h2>
      <iframe
        src="https://yandex.ru/map-widget/v1/?um=constructor%3A582984f8051202de0e860ac9f0824391a1849803f87aadca75fc04562db6fed3&amp;source=constructor"
        width="950"
        height="540"
        frameborder="0"
      ></iframe>
    </div>
  </div>

  <footer class="green">
    <div class="container">
      <div class="row">
        <div class="logo">
          <img src="../assets/img/icons/logo.png" alt="logo" />
          <h6>Ресторан Улуу-Тоо"</h6>
        </div>
        <div class="navigation">
          <h6>Навигация</h6>
          <ul>
            <li><a href="/">Главная</a></li>
            <li><a href="/about-us">История</a></li>
            <!-- <li><a href="/flora">Флора</a></li>
            <li><a href="/fauna">Фауна</a></li> -->
            <li><a href="/services">Услуги</a></li>
            <li><a href="/entry">Меню</a></li>
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
            <!-- <li>
              Кыргызская Республика, Чуйская обл, Аламудунский р-н, село
              Кашка-Суу
            </li> -->
          </ul>
          <h6>Электронный адрес</h6>
          <ul>
            <li>uluu-too@list.ru</li>
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
import Sign from "@/components/Sign.vue";
import Parallax from "@/components/Parallax.vue";

export default {
  components: {
    Sign,
  },
  methods: {
    signOut() {
      this.$router.push("/");
      this.$store.commit("setCredentials", {
        email: "please log in",
        token: "",
        signInFlag: false,
      });
      sessionStorage.clear();
      localStorage.removeItem("clickedMenu");
    },
    showModal: function () {
      this.$refs.sign.show = true;
    },
  },
  name: "HomeView",
};
</script>

<style :src="assets('/css/all.css')" />
