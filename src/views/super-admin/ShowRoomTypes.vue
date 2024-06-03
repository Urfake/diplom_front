<template>
  <div class="container">
    <div class="super-admin">
      <h2>Список типов комнат</h2>
      <table>
        <tr>
          <th>ID</th>
          <th>Тип</th>
          <th>Цена</th>
          <th>Отель</th>
          <th class="edit">Редактирование</th>
          <th class="delete">Удаление</th>
        </tr>
        <tr v-for="(roomType, i) in roomTypes" :key="i">
          <td>{{ roomType.id }}</td>
          <td>{{ roomType.type }}</td>
          <td>{{ roomType.price }}</td>
          <td>{{ roomType.hotelName }}</td>
          <td class="edit" @click="edit(roomType.id)"><a>Редактировать</a></td>
          <td class="delete" @click="delet(roomType.id)"><a>Удалить</a></td>
        </tr>
      </table>
    </div>
  </div>
  <button
    @click="$router.push('/super-admin/create-room-type')"
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
      roomTypes: [],
    };
  },
  mounted() {
    axios
      .get("http://localhost:8083/room/type/get-for-list", {
        headers: {
          Authorization: this.$store.getters.getToken,
        },
      })
      .then((response) => {
        this.roomTypes = response.data.value;
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
        this.errored = true;
      });
  },
  methods: {
    edit(id) {
      this.$router.push("/super-admin/redact-room-type/" + id);
    },
    delet(id) {
      axios
        .delete("http://localhost:8083/room/type/delete/" + id, {
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
