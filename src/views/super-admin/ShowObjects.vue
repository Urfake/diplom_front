<template>
  <div class="container">
    <div class="super-admin">
      <h2>Список объектов</h2>
      <table>
        <tr>
          <th>ID</th>
          <th>Название</th>
          <th>Количество мест</th>
          <th>Тип объекта</th>
          <th class="edit">Редактирование</th>
          <th class="delete">Удаление</th>
        </tr>
        <tr v-for="(object, i) in objects" :key="i">
          <td>{{ object.id }}</td>
          <td>{{ object.name }}</td>
          <td>{{ object.numberOfSeats }}</td>
          <td>{{ object.objectTypeName }}</td>
          <td class="edit" @click="edit(object.id)"><a>Редактировать</a></td>
          <td class="delete" @click="delet(object.id)"><a>Удалить</a></td>
        </tr>
      </table>
    </div>
  </div>
  <button
    @click="$router.push('/super-admin/create-object')"
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
      objects: [],
    };
  },
  mounted() {
    axios
      .get("http://localhost:8083/object/get-for-list", {
        headers: {
          Authorization: this.$store.getters.getToken,
        },
      })
      .then((response) => {
        this.objects = response.data.value;
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
        this.errored = true;
      });
  },
  methods: {
    edit(id) {
      this.$router.push("/super-admin/redact-object/" + id);
    },
    delet(id) {
      axios
        .delete("http://localhost:8083/object/delete/" + id, {
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
