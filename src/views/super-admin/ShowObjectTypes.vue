<template>
  <div class="container">
    <div class="super-admin">
      <h2>Список типов объектов</h2>
      <table>
        <tr>
          <th>ID</th>
          <th>Название</th>
          <th>Цена</th>
          <th>Цена за последующие часы</th>
          <th>Зона</th>
          <th>Время или дата</th>
          <th>Мин. время</th>
          <th class="edit">Редактирование</th>
          <th class="delete">Удаление</th>
        </tr>
        <tr v-for="(objectType, i) in objectTypes" :key="i">
          <td>{{ objectType.id }}</td>
          <td>{{ objectType.name }}</td>
          <td>{{ objectType.price }}</td>
          <td>{{ objectType.pricePerHour }}</td>
          <td>{{ objectType.areaName }}</td>
          <td>
            {{ objectType.timeType == "DATE" ? "По дате" : "По времени" }}
          </td>
          <td>{{ objectType.minHours }}</td>
          <td class="edit" @click="edit(objectType.id)">
            <a>Редактировать</a>
          </td>
          <td class="delete" @click="delet(objectType.id)"><a>Удалить</a></td>
        </tr>
      </table>
    </div>
  </div>
  <button
    @click="$router.push('/super-admin/create-object-type')"
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
      objectTypes: [],
    };
  },
  mounted() {
    axios
      .get("http://localhost:8083/object/type/get-for-list", {
        headers: {
          Authorization: this.$store.getters.getToken,
        },
      })
      .then((response) => {
        this.objectTypes = response.data.value;
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
        this.errored = true;
      });
  },
  methods: {
    edit(id) {
      this.$router.push("/super-admin/redact-object-type/" + id);
    },
    delet(id) {
      axios
        .delete("http://localhost:8083/object/type/delete/" + id, {
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
