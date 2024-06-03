<template>
  <div class="prices">
    <h1>Цены на меню</h1>
    <p>
      Ресторан Улуу-Тоо предлагает широкий выбор блюд на любой вкус. В меню можно найти как традиционные, так и современные блюда, приготовленные из свежих и качественных ингредиентов.
       Это идеальное место для ужина с семьей или друзьями, а также для проведения романтического вечера. 
       Обязательно посетите этот ресторан и насладитесь его уникальной атмосферой и вкусной едой.
      <!-- Прейскурант цен Государственного учреждения «Кыргызский государственный
      природный парк «Ала-Арча» при Управлении делами Президента и Правительства
      Кыргызской Республики на посещение объектов особо охраняемых природных
      территорий -->
    </p>

    <div class="rows">
      <!--
----------->
      <div class="car-item">
        <img src="../assets/img/auto/menu1.png" alt="" />
        <h5 class="car-item-text">
          Салатик №1<br /><br /><span class="car-item-text">200 C</span>
        </h5>
      </div>
      <!--
----------->
      <div class="car-item">
        <img src="../assets/img/auto/menu2.png" alt="" />
        <h5 class="car-item-text">
          Салатик №2<br /><br /><span class="car-item-text">500 C</span>
        </h5>
      </div>
      <!--
----------->
      <div class="car-item">
        <img src="../assets/img/auto/menu3.png" alt="" />
        <h5 class="car-item-text">
          Плов по Ошский<br /><br /><span class="car-item-text">500 C</span>
        </h5>
      </div>
      <!--
----------->
      <div class="car-item">
        <img src="../assets/img/auto/menu4.png" alt="" />
        <h5 class="car-item-text">
          Картошка с мясом<br /><br /><span class="car-item-text">300 C</span>
        </h5>
      </div>
      <!--
----------->
      <div class="car-item">
        <img src="../assets/img/auto/menu5.png" alt="" />
        <h5 class="car-item-text">
          Грудки с соусом<br /><br /><span class="car-item-text">350 C</span>
        </h5>
      </div>
      <!--
----------->
      <div class="car-item">
        <img src="../assets/img/auto/menu6.png" alt="" />
        <h5 class="car-item-text">
          Тефтели<br /><br /><span class="car-item-text">500 C</span
          ><img
            src="../assets/img/icons/info-circle.svg"
            class="circle-info"
            :title="'До 6 тонн'"
          />
        </h5>
      </div>
      <!--
----------->
      <div class="car-item">
        <img src="../assets/img/auto/menu7.png" alt="" />
        <h5 class="car-item-text">
          Макароны с мясом<br /><br /><span class="car-item-text">300 C</span
          ><img
            src="../assets/img/icons/info-circle.svg"
            class="circle-info"
            :title="'От 6 до 10 тонн'"
          />
        </h5>
      </div>
      <!--
----------->
      <div class="car-item">
        <img src="../assets/img/auto/menu8.png" alt="" />
        <h5 class="car-item-text">
          Макароны<br /><br /><span class="car-item-text">200 C</span
          ><img
            src="../assets/img/icons/info-circle.svg"
            class="circle-info"
            :title="'От 10 до 20 тонн'"
          />
        </h5>
      </div>
      <!--
----------->
      <div class="car-item">
        <img src="../assets/img/auto/menu9.png" alt="" />
        <h5 class="car-item-text">
          Картошка<br /><br /><span class="car-item-text">300 C</span
          ><img
            src="../assets/img/icons/info-circle.svg"
            class="circle-info"
            :title="'Свыше 20 тонн'"
          />
        </h5>
      </div>
    </div>

    <div class="container">
      <hr />
    </div>
  </div>

  <div class="container">
    <div class="info">
      <div class="information-text inline">
        <h5 class="notes-title-text">Примечания:</h5>

        <h6 class="notes-subtitle-text">
          <!-- Вход посетителей без наличия автотранспортных средств бесплатный -->
        </h6>

        <div class="notes-item clear">
          <img src="../assets/img/icons/info-circle.svg" />
          <div class="notes-text">
            Оплата в ресторане взимается только за заказанные блюда и услуги, 
            вне зависимости от количества человек за столом. Это позволяет 
            гостям наслаждаться временем в ресторане, не беспокоясь о дополнительных сборах.
          </div>
        </div>

        <div class="notes-item clear">
          <img src="../assets/img/icons/info-circle.svg" />
          <div class="notes-text">
            Для постоянных клиентов и ветеранов предоставляются специальные условия.  А
             также ветераны Великой Отечественной и Афганской войны, зарегистрированные в базе данных по льготным спискам ресторана, 
             могут воспользоваться особыми привилегиями и скидками.
          </div>
        </div>

        <div class="notes-item clear">
          <img src="../assets/img/icons/info-circle.svg" />
          <div class="notes-text">
            Для обеспечения безопасности, соблюдения пожарных и санитарных норм, всех гостей ресторана просят пройти проверку на входе. 
            Персонал проверяет личные вещи на предмет наличия запрещенных предметов, 
            чтобы гарантировать комфортное и безопасное пребывание всех посетителей.
          </div>
        </div>
        <!-- <img src="../assets/img/icons/flower.png" width="30%" alt="" /> -->
      </div>
      <!--
------->
      <div class="formbox inline">
        <h5 class="notes-title-text">Обратная связь:</h5>
        <div class="mb-form">
          <label for="fname" class="notes-text-label">Имя</label>
          <input
            type="text"
            v-model="messageToSend.name"
            id="fname"
            name="firstname"
            class="input-text-auto"
            placeholder="Имя"
          />
          <label for="email" class="notes-text-label">Почта</label>
          <input
            type="text"
            v-model="messageToSend.email"
            id="email"
            name="email"
            class="input-text-auto"
            placeholder="Почта"
          />
          <label for="subject" class="notes-text-label"
            >Введите ваше сообщение</label
          >
          <textarea
            id="subject"
            v-model="messageToSend.message"
            name="subject"
            class="input-text-auto"
            placeholder="Напишите ваше сообщение.."
            style="height: calc(12vw + 10px)"
          ></textarea>
          <input
            type="submit"
            @click="sendMessage()"
            value="Отправить"
            class="input-text-auto"
          />
          <img src="../assets/img/icons/flower.png" width="30%" alt="" />
        </div>
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
import axios from "axios";
import useVuelidate from "@vuelidate/core";
import { required, email, minLength, numeric } from "@vuelidate/validators";

export default {
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      messageToSend: {
        email: "",
        name: "",
        message: "",
      },
    };
  },
  validations: {
    messageToSend: {
      email: {
        email,
        required,
      },
      name: {
        required,
      },
      message: {
        required,
      },
    },
  },
  methods: {
    sendMessage() {
      this.v$.messageToSend.$touch();
      if (this.v$.messageToSend.email.$error) {
        alert("Введите адрес электронной почты корректно!");
      } else if (this.v$.messageToSend.name.$error) {
        alert("Введите имя!");
      } else if (this.v$.messageToSend.message.$error) {
        alert("Введите ваше сообщение!");
      } else {
        axios
          .post("http://localhost:8083/feedback/create", this.messageToSend)
          .then((resp) => {
            if (resp.status == 200) {
              alert(
                "Сообщение отправлено, в скором времени вам ответят на электронную почту."
              );
              location.reload();
            }
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
              this.signInErrorMessage = error.response.data.details;
              console.log(error.response.data);
            }
          });
      }
    },
  },
};
</script>

<style src="../assets/css/all.css" />
