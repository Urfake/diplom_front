<template>
  <div class="container">
    <div class="cart-row">
      <div class="trash">
        <h1>Корзина</h1>
        <div v-for="(item, index) in cartItems" :key="index">
          <hr />
          <div class="trash-row">
            <div class="left">
              <div class="trash-picture">
                <img :src="item.img" />
              </div>
              <div class="trash-text">
                <h4 v-if="item.roomType">{{ item.roomType }}</h4>
                <h4 v-if="item.objectType">{{ item.objectType }}</h4>
                <h4 v-if="item.hotelHallName">{{ item.hotelHallName }}</h4>
                <span>{{ item.price }} сом</span>

                <br />

                <p v-if="item.days">Количество суток:</p>
                <input
                  v-if="item.days"
                  type="number"
                  :value="item.days"
                  min="1"
                  max="90"
                  disabled
                />

                <p v-if="item.hours">Количество часов:</p>
                <input
                  v-if="item.hours"
                  type="number"
                  :value="item.hours"
                  min="1"
                  max="90"
                  disabled
                />

                <h3 v-if="item.roomNumber">
                  Номер комнаты: {{ item.roomNumber }}
                </h3>
                <h3 v-if="item.name">{{ item.name }}</h3>
              </div>
            </div>
            <div class="right">
              <div class="trash-status">
                <h5>{{ item.totalPrice }} сом</h5>
                <br /><br /><br /><br /><br />
                <span v-if="item.orderStatus == 'CONFIRMED'">Принято</span>
                <span
                  v-else-if="item.orderStatus == 'DECLINED'"
                  style="color: red"
                  >Отклонено</span
                >
                <span
                  v-else-if="item.orderStatus == 'IN_PROCESS'"
                  style="color: #ffbd00"
                  >Ожидает проверки</span
                >
                <span
                  v-else-if="item.orderStatus == 'CHECK_CHECK'"
                  style="color: #ffbd00"
                  >Проверка чека</span
                >
                <span v-else>Оплачено</span>
              </div>
              <div class="row">
                <div class="photo-upload">
                  <form v-if="item.orderStatus == 'CONFIRMED'">
                    <input
                      @change="handleImage"
                      type="file"
                      id="img"
                      name="img"
                      accept="image/*"
                      hidden
                    />
                    <label
                      for="img"
                      @click="
                        typeDepender(
                          item.id,
                          item.roomType,
                          item.objectType,
                          item.hotelHallName
                        )
                      "
                      >Оплатить</label
                    >
                  </form>
                </div>
                <!-- <div v-if="cart.img" class="getImage">
									<img class="uploaded-image" :src="cart.img" alt="aa">
								</div> -->
              </div>
            </div>
          </div>
        </div>
        <div
          v-if="pageCount > 1"
          class="pagination"
          :class="
            more
              ? 'pagination-more'
              : pageCount >= 7
              ? 'pagination-9'
              : 'pagination-' + pageCount
          "
        >
          <div
            v-if="!more && currentPage > 1"
            @click="clickPage(currentPage - 2)"
          >
            &lt;&lt;
          </div>
          <div v-if="currentPage >= 4 && !more" @click="clickPage(0)">1</div>
          <div v-if="currentPage >= 5 && !more" @click="more = true">...</div>
          <div
            v-for="pageNumber in pageCount"
            :key="pageNumber"
            v-show="
              currentPage == pageNumber ||
              currentPage + 1 == pageNumber ||
              currentPage + 2 == pageNumber ||
              currentPage - 1 == pageNumber ||
              currentPage - 2 == pageNumber ||
              more
            "
            @click="clickPage(pageNumber - 1)"
            :style="currentPage == pageNumber ? 'color: #62db72;' : ''"
          >
            {{ pageNumber }}
          </div>
          <div
            v-if="currentPage <= pageCount - 4 && !more"
            @click="more = true"
          >
            ...
          </div>
          <div
            v-if="currentPage <= pageCount - 3 && !more"
            @click="clickPage(pageCount - 1)"
          >
            {{ pageCount }}
          </div>
          <div
            v-if="!more && currentPage < pageCount"
            @click="clickPage(currentPage)"
          >
            >>
          </div>
        </div>
      </div>
      <div class="payment">
        <h1>Покупка онлайн</h1>
        <h4>Номер карты</h4>
        <span>Переведите средства на данную карту</span>
        <h3>{{ currentCard }}</h3>
        <div class="cards">
          <img
            src="../assets/img/icons/optimablue.png"
            @click="currentCard = cards.optima"
            alt=""
            class="card"
          />
          <img
            src="../assets/img/icons/rskbank.jpg"
            @click="currentCard = cards.rskBank"
            alt=""
            class="card"
          />
          <img
            src="../assets/img/icons/demirbank.jpg"
            @click="currentCard = cards.demirBank"
            alt=""
            class="card"
          />
        </div>
        <br />
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
      trash: [],
      cartItems: [],
      checkPhoto: "",
      pageCount: 1,
      currentPage: 1,
      more: false,
      room: {
        roomOrderId: null,
        img: "",
      },
      object: {
        objectOrderId: null,
        img: "",
      },
      hotelHall: {
        hotelHallOrderId: null,
        img: "",
      },
      type: "",
      cards: {
        optima: "4444-4444-4444-4444",
        oMoney: "5555-5555-5555-5555",
        rskBank: "6666-6666-6666-6666",
        demirBank: "7777-7777-7777-7777",
      },
      currentCard: "4444-4444-4444-4444",
    };
  },
  mounted() {
    let page = this.currentPage - 1;
    axios
      .get(
        "http://localhost:8083/user/get/my-orders/" + this.$store.getters.getId,
        {
          headers: {
            Authorization: this.$store.getters.getToken,
          },
        },
        {
          params: { page },
        }
      )
      .then((response) => {
        this.trash = response.data.value;
        console.log(response.data);
        this.pageCount = this.trash.totalPage;
        for (let i in this.trash) {
          this.cartItems = this.cartItems.concat(this.trash[i]);
        }
        this.cartItems = this.cartItems.splice(1);
        this.cartItems = this.cartItems.sort(
          (prev, curr) =>
            Date.parse(prev.createdDate) - Date.parse(curr.createdDate)
        );
        this.cartItems.pop();
        this.cartItems = this.cartItems.reverse();
      })
      .catch((error) => {
        console.log(error);
        this.errored = true;
      });
  },
  watch: {
    checkPhoto(img) {
      if (this.type == "roomType") {
        this.room.img = img;
        axios
          .post("http://localhost:8083/room/order/pay", this.room, {
            headers: {
              Authorization: this.$store.getters.getToken,
            },
          })
          .then((resp) => {
            if (resp.status == 200) {
              alert(
                "Проверка чека! После проверки чека к вам придет уведомление на электронную почту"
              );
              location.reload();
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
              this.signInErrorMessage = error.response.data.details;
              console.log(error.response.data);
            }
          });
      } else if (this.type == "objectType") {
        this.object.img = img;
        axios
          .post("http://localhost:8083/object/order/pay", this.object, {
            headers: {
              Authorization: this.$store.getters.getToken,
            },
          })
          .then((resp) => {
            if (resp.status == 200) {
              alert(
                "Проверка чека! После проверки чека к вам придет уведомление на электронную почту"
              );
              location.reload();
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
              this.signInErrorMessage = error.response.data.details;
              console.log(error.response.data);
            }
          });
      } else if (this.type == "hotelHall") {
        this.hotelHall.img = img;
        axios
          .post("http://localhost:8083/hotelHall/order/pay", this.hotelHall, {
            headers: {
              Authorization: this.$store.getters.getToken,
            },
          })
          .then((resp) => {
            if (resp.status == 200) {
              alert(
                "Проверка чека! После проверки чека к вам придет уведомление на электронную почту"
              );
              location.reload();
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
              this.signInErrorMessage = error.response.data.details;
              console.log(error.response.data);
            }
          });
      }
    },
  },
  methods: {
    handleImage(e) {
      const selectedImage = e.target.files[0];
      this.createBase64Image(selectedImage);
    },

    clickPage(page) {
      this.currentPage = page + 1;
      console.log(this.currentPage);
      axios
        .get(
          "http://localhost:8083/user/get/my-orders/" +
            this.$store.getters.getId +
            "/?page=" +
            page,
          {
            headers: {
              Authorization: this.$store.getters.getToken,
            },
          }
        )
        .then((response) => {
          this.trash = response.data.value;
          console.log(response.data);
          this.pageCount = this.trash.totalPage;
          this.cartItems = [];
          for (let i in this.trash) {
            this.cartItems = this.cartItems.concat(this.trash[i]);
          }
          this.cartItems = this.cartItems.splice(1);
          this.cartItems = this.cartItems.sort(
            (prev, curr) =>
              Date.parse(prev.createdDate) - Date.parse(curr.createdDate)
          );
          this.cartItems.pop();
          this.cartItems = this.cartItems.reverse();
        })
        .catch((error) => {
          console.log(error);
          this.errored = true;
        });
    },

    createBase64Image(fileObject) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.checkPhoto = e.target.result;
      };

      reader.readAsDataURL(fileObject);
    },
    typeDepender(id, roomType, objectType, hotelHall) {
      if (roomType != null) {
        this.room.roomOrderId = id;
        this.type = "roomType";
      } else if (objectType != null) {
        this.object.objectOrderId = id;
        this.type = "objectType";
      } else if (hotelHall != null) {
        this.hotelHall.hotelHallOrderId = id;
        this.type = "hotelHall";
      }
    },
  },
};
</script>

<style src="../assets/css/all.css" />
