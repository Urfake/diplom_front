<template>
  <div class="container">
    <div class="super-admin">
      <h2>История брони объектов</h2>
      <table>
        <tr>
          <th>Id</th>
          <th>User Id</th>
          <th>Имя пользователя</th>
          <th>Номер телефона</th>
          <th>Тип объекта</th>
          <th>Название объекта</th>
          <th>Дата заезда</th>
          <th>Дата выезда</th>
          <th>Время начала</th>
          <th>Время конца</th>
          <th>Цена заказа</th>
          <th class="status">Статус</th>
        </tr>
        <tr v-for="(object_book, i) in object_books" :key="i">
          <td>{{ object_book.id }}</td>
          <td>{{ object_book.userId }}</td>
          <td>{{ object_book.fullName }}</td>
          <td>{{ object_book.userPhone }}</td>
          <td>{{ object_book.objectTypeName }}</td>
          <td>{{ object_book.objectName }}</td>
          <td>{{ converterDate(object_book.startDate) }}</td>
          <td>{{ converterDate(object_book.endDate) }}</td>
          <td>{{ object_book.startTime }}</td>
          <td>{{ object_book.endTime }}</td>
          <td>{{ object_book.totalPrice }}</td>
          <td v-if="object_book.orderStatus == 'CONFIRMED'" class="accept">
            Принято
          </td>
          <td v-else-if="object_book.orderStatus == 'PAID'" class="accept">
            Оплачено
          </td>
          <td v-else class="deny">Отклонено</td>
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
      object_books: [],
      pageCount: 6,
      currentPage: 1,
      more: false,
    };
  },
  mounted() {
    let page = this.currentPage - 1;
    axios
      .get(
        "http://localhost:8083/object/order/get-confirmed-or-declined/?page=" +
          page,
        {
          headers: {
            Authorization: this.$store.getters.getToken,
          },
        }
      )
      .then((response) => {
        this.object_books = response.data.value;
        console.log(response.data);
        this.pageCount = this.object_books.pop().totalPage;
      })
      .catch((error) => {
        console.log(error);
        this.errored = true;
      });
  },
  methods: {
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
    clickPage(page) {
      this.currentPage = page + 1;
      axios
        .get(
          "http://localhost:8083/object/order/get-confirmed-or-declined/?page=" +
            page,
          {
            headers: {
              Authorization: this.$store.getters.getToken,
            },
          }
        )
        .then((response) => {
          this.object_books = response.data.value;
          console.log(response.data);
          this.pageCount = this.object_books.pop().totalPage;
        })
        .catch((error) => {
          console.log(error);
          this.errored = true;
        });
    },
  },
};
</script>

<style src="../../assets/css/super.css" />
