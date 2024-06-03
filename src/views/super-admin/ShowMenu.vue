<template>
  <div class="container">
    <div class="super-admin">
      <h2>Список меню</h2>
      <table>
        <tr>
          <th>ID</th>
          <th>Название</th>
          <th>Описание</th>
          <th>Цена</th>
          <th class="edit">Редактирование</th>
          <th class="delete">Удаление</th>
        </tr>
        <tr v-for="(menuItem, i) in menuItems" :key="i">
          <td>{{ menuItem.id }}</td>
          <td>{{ menuItem.name }}</td>
          <td>{{ menuItem.description }}</td>
          <td>{{ menuItem.price }}</td>
          <td class="edit" @click="edit(menuItem.id)"><a>Редактировать</a></td>
          <td class="delete" @click="delet(menuItem.id)"><a>Удалить</a></td>
        </tr>
      </table>
    </div>
  </div>
  <button
    @click="$router.push('/super-admin/create-menu')"
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
      menuItems: [],
    };
  },
  mounted() {
    axios
      .get("http://localhost:8083/menu/get-all", {
        headers: {
          Authorization: this.$store.getters.getToken,
        },
      })
      .then((response) => {
        this.menuItems = response.data.value;
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
        this.errored = true;
      });
  },
  methods: {
    edit(id) {
      this.$router.push("/super-admin/redact-menu/" + id);
    },
    delet(id) {
      axios
        .delete("http://localhost:8083/menu/delete/" + id, {
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
