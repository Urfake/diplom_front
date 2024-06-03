<template>
  <check-photo ref="checkPhoto"></check-photo>
  <div class="container">
    <div class="super-admin">
      <h2>Проверка оплаты залов</h2>
      <table>
        <tr>
          <th>User Id</th>
          <th>Имя пользователя</th>
          <th>Фото чека</th>
          <th>Цена заказа</th>
          <th class="accept">Принять</th>
          <th class="deny">Отклонить</th>
        </tr>
        <tr v-for="(item, index) in roomOrders" :key="index">
          <td>{{ item.userId }}</td>
          <td>{{ item.userFullName }}</td>
          <td><span @click="openModal(item.img)">Фото</span></td>
          <td>{{ item.totalPrice }}</td>
          <td class="accept"><a @click="accept(item.id)">Принять</a></td>
          <td class="deny"><a @click="decline(item.id)">Отклонить</a></td>
        </tr>
      </table>
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
        <div v-if="currentPage <= pageCount - 4 && !more" @click="more = true">
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
      <a href="/admin/show-admin-menu"
        ><div class="back">
          <p>Назад</p>
        </div></a
      >
    </div>
  </div>
</template>

<script>
import CheckPhoto from "../../components/CheckPhoto.vue";
import axios from "axios";

export default {
  components: {
    CheckPhoto,
  },
  data() {
    return {
      showModal: false,
      roomOrders: [],
      pageCount: 6,
      currentPage: 1,
      more: false,
    };
  },
  methods: {
    openModal(photo) {
      this.$refs.checkPhoto.photo = photo;
      this.$refs.checkPhoto.showModal = true;
    },
    accept(hotelHallOrderId) {
      axios
        .post(
          "http://localhost:8083/hotelHall/order/accept-pay",
          { id: hotelHallOrderId },
          {
            headers: {
              Authorization: this.$store.getters.getToken,
            },
          }
        )
        .then((resp) => {
          if (resp.status == 200) {
            // this.$router.push("/");
          }
          console.log(this.$store.state);
          location.reload();
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
    },

    decline(hotelHallOrderId) {
      console.log(hotelHallOrderId);
      axios
        .post(
          "http://localhost:8083/hotelHall/order/decline",
          { id: hotelHallOrderId },
          {
            headers: {
              Authorization: this.$store.getters.getToken,
            },
          }
        )
        .then((resp) => {
          if (resp.status == 200) {
            // this.$router.push("/");
          }
          console.log(this.$store.state);
          location.reload();
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
    },
    clickPage(page) {
      this.currentPage = page + 1;
      axios
        .get(
          "http://localhost:8083/hotelHall/order/get-in-pay-check/?page=" +
            page,
          {
            headers: {
              Authorization: this.$store.getters.getToken,
            },
          }
        )
        .then((response) => {
          this.roomOrders = response.data.value;
          console.log(response.data);
          this.pageCount = this.roomOrders.pop().totalPage;
        })
        .catch((error) => {
          console.log(error);
          this.errored = true;
        });
    },
  },
  mounted() {
    let page = this.currentPage - 1;
    axios
      .get(
        "http://localhost:8083/hotelHall/order/get-in-pay-check/?page=" + page,
        {
          headers: {
            Authorization: this.$store.getters.getToken,
          },
        }
      )
      .then((response) => {
        this.roomOrders = response.data.value;
        console.log(response.data);
        this.pageCount = this.roomOrders.pop().totalPage;
      })
      .catch((error) => {
        console.log(error);
        this.errored = true;
      });
  },
};
</script>

<style src="../../assets/css/super.css" />
