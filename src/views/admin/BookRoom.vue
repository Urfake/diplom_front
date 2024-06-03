<template>
  <div class="container">
    <div class="super-admin">
      <h2>Бронь комнаты</h2>
      <table>
        <tr>
          <th>Id</th>
          <th>User Id</th>
          <th>Имя пользователя</th>
          <th>Название отеля</th>
          <th>Тип комнаты</th>
          <th>Номер комнаты</th>
          <th>Дата приезда</th>
          <th>Дата отъезда</th>
          <th class="accept">Принять</th>
          <th class="deny">Отклонить</th>
        </tr>
        <tr v-for="(room_book, i) in room_books" :key="i">
          <td>{{ room_book.id }}</td>
          <td>{{ room_book.userId }}</td>
          <td>{{ room_book.userFullName }}</td>
          <td>{{ room_book.hotelName }}</td>
          <td>{{ room_book.roomType }}</td>
          <td>{{ room_book.roomNumber }}</td>
          <td>{{ converterDate(room_book.startDate) }}</td>
          <td>{{ converterDate(room_book.endDate) }}</td>
          <td class="accept"><a @click="accept(room_book.id)">Принять</a></td>
          <td class="deny"><a @click="decline(room_book.id)">Отклонить</a></td>
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
import axios from "axios";
export default {
  data() {
    return {
      room_books: [],
      pageCount: 1,
      currentPage: 1,
      more: false,
    };
  },
  mounted() {
    let page = this.currentPage - 1;
    axios
      .get("http://localhost:8083/room/order/get-in-process/?page=" + page, {
        headers: {
          Authorization: this.$store.getters.getToken,
        },
      })
      .then((response) => {
        this.room_books = response.data.value;
        console.log(response.data);
        this.pageCount = this.room_books.pop().totalPage;
      })
      .catch((error) => {
        console.log(error);
        this.errored = true;
      });
  },
  methods: {
    clickPage(page) {
      this.currentPage = page + 1;
      axios
        .get("http://localhost:8083/room/order/get-in-process/?page=" + page, {
          headers: {
            Authorization: this.$store.getters.getToken,
          },
        })
        .then((response) => {
          this.room_books = response.data.value;
          console.log(response.data);
          this.pageCount = this.room_books.pop().totalPage;
        })
        .catch((error) => {
          console.log(error);
          this.errored = true;
        });
    },
    delete(id) {
      axios
        .delete("http://localhost:8083/hotel/delete/" + id, {
          headers: {
            Authorization: this.$store.getters.getToken,
          },
        })
        .then((resp) => {
          if (resp.status == 200) {
            // this.$router.push("/");
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
    },

    accept(roomOrderId) {
      console.log(roomOrderId);
      axios
        .post(
          "http://localhost:8083/room/order/accept",
          { id: roomOrderId },
          {
            headers: {
              Authorization: this.$store.getters.getToken,
            },
          }
        )
        .then((resp) => {
          if (resp.status == 200) {
            // this.$router.push("/");
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
    },

    decline(roomOrderId) {
      console.log(roomOrderId);
      axios
        .post(
          "http://localhost:8083/room/order/decline",
          { id: roomOrderId },
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

    converterDate(dateString) {
      let date = new Date(dateString.split("T")[0]);
      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();
      if (day <= 9) {
        day = "0" + day;
      }
      if (month <= 9) {
        month = "0" + month;
      }
      return day + "." + month + "." + year;
    },
  },
};
</script>

<style src="../../assets/css/super.css" />
