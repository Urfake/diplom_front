<template>
  <div class="container">
    <div class="super-admin">
      <h2>Список животных/растений</h2>
      <table>
        <tr>
          <th>ID</th>
          <th>Название</th>
          <th>Тип</th>
          <th class="edit">Редактирование</th>
          <th class="delete">Удаление</th>
        </tr>
        <tr v-for="(nature, index) in nature" :key="index">
          <td>{{ nature.id }}</td>
          <td>{{ nature.name }}</td>
          <td>{{ nature.type }}</td>
          <td class="edit" @click="edit(nature.id)"><a>Редактировать</a></td>
          <td class="delete" @click="delet(nature.id)"><a>Удалить</a></td>
        </tr>
      </table>
    </div>
  </div>

  <button
    @click="$router.push('/super-admin/create-flora-fauna')"
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
      nature: [],
    };
  },
  mounted() {
    axios
      .get("http://localhost:8083/nature/get-for-list", {
        headers: {
          Authorization: this.$store.getters.getToken,
        },
      })
      .then((response) => {
        this.nature = response.data.value;
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
        this.errored = true;
      });
  },
  methods: {
    edit(id) {
      this.$router.push("/super-admin/redact-flora-fauna/" + id);
    },
    delet(id) {
      console.log("deliting");
      axios
        .delete("http://localhost:8083/nature/delete/" + id, {
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
