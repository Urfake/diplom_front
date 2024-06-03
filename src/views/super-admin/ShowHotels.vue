<template>
  <div class="container">
    <div class="super-admin">
      <h2>Список гостиниц</h2>
      <table>
        <tr>
          <th>ID</th>
          <th>Название</th>
          <th>Зона</th>
          <th class="edit">Редактирование</th>
          <th class="delete">Удаление</th>
        </tr>
        <tr v-for="(hotel, i) in hotels" :key="i">
          <td>{{ hotel.id }}</td>
          <td>{{ hotel.hotelName }}</td>
          <td>{{ hotel.areaName }}</td>
          <td class="edit" @click="edit(hotel.id)"><a>Редактировать</a></td>
          <td class="delete" @click="delet(hotel.id)"><a>Удалить</a></td>
        </tr>
      </table>
    </div>
  </div>

  <button
    @click="$router.push('/super-admin/create-hotel')"
    class="super-admin-add-button"
  >
    Добавить
  </button>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      hotels: [],
    };
  },
  mounted() {
    axios
      .get("http://localhost:8083/hotel/get-for-list", {
        headers: {
          Authorization: this.$store.getters.getToken,
        },
      })
      .then((response) => {
        this.hotels = response.data.value;
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
        this.errored = true;
      });
  },
  methods: {
    edit(id) {
      this.$router.push("/super-admin/redact-hotel/" + id);
    },
    delet(id) {
      axios
        .delete("http://localhost:8083/hotel/delete/" + id, {
          headers: {
            Authorization: this.$store.getters.getToken,
          },
        })
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
  },
};
</script>

<style src="../../assets/css/super.css" />
