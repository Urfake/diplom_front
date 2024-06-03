<template>
  <div class="container">
    <div class="super-admin">
      <h2>Список зон</h2>
      <table>
        <tr>
          <th>ID</th>
          <th>Название</th>
          <th>Админ зоны</th>
          <th class="edit">Редактирование</th>
          <th class="delete">Удаление</th>
        </tr>
        <tr v-for="(area, i) in areas" :key="i">
          <td>{{ area.id }}</td>
          <td>{{ area.areaName }}</td>
          <td>{{ area.email }}</td>
          <td class="edit" @click="edit(area.id)"><a>Редактировать</a></td>
          <td class="delete" @click="delet(area.id)"><a>Удалить</a></td>
        </tr>
      </table>
    </div>
  </div>
  <button
    @click="$router.push('/super-admin/create-area')"
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
      areas: [],
    };
  },
  mounted() {
    axios
      .get("http://localhost:8083/area/get-all", {
        headers: {
          Authorization: this.$store.getters.getToken,
        },
      })
      .then((response) => {
        this.areas = response.data.value;
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
        this.errored = true;
      });
  },
  methods: {
    edit(id) {
      this.$router.push("/super-admin/redact-area/" + id);
    },
    delet(id) {
      axios
        .delete("http://localhost:8083/area/delete/" + id, {
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
