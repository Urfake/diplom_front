<template>
  <div class="fauna">
    <div class="container">
      <div class="fauna_frame">
        <div class="text">
          <h1>Фауна Ала-Арчи</h1>
          <p>
            Еще одной достопримечательностью заповедника является многообразный
            мир фауны. Здесь обитают дикобразы и лисы, волки и косули. Можно
            увидеть зайца и горностая, куницу, кабана и сурков.
          </p>
        </div>
        <div class="img">
          <img src="../assets/img/fauna/fauna.jpg" alt="" />
        </div>
      </div>
    </div>
  </div>

  <div class="container">
    <div class="fauna_text">
      <p>
        Многие виды зверей и птиц, встречающиеся тут, занесены в Красную книгу.
        Те, кому сильно повезет, могут повстречать снежного барса и
        туркестанскую рысь. Охота здесь строго запрещена!
      </p>
    </div>

    <div class="content">
      <div class="grid">
        <div
          class="card effect blue"
          v-for="(nature, i) in natures.natureModels"
          :key="i"
        >
          <img :src="nature.img" alt="img12" />
          <div class="card_caption">
            <div>
              <h3>{{ nature.name }}</h3>
              <p>
                {{ nature.description }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
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
import axios from "axios";

export default {
  data() {
    return {
      natures: [],
    };
  },
  mounted() {
    axios
      .get("http://localhost:8083/nature/type/get/2")
      .then((response) => {
        this.natures = response.data.value;
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
        this.errored = true;
      });
  },
};
</script>

<style src="../assets/css/all.css" />
