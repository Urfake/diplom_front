<template>
  <div class="super">
    <div class="form-fauna-flora">
      <h1 style="text-align: center">Добавление зоны</h1>

      <div class="formbox">
        <form>
          <label for="name">Введите название зоны:</label>
          <br />
          <input v-model="area.areaName" type="text" id="name" /><br />

          <br />

          <label for="select">Выберите админа:</label>
          <div class="type">
            <select id="select" v-model="area.email">
              <option v-for="(i, index) in users" :key="index" :value="i.email">
                {{ i.lastName + " " + i.firstName }}
              </option>
            </select>
          </div>
          <br />
        </form>
      </div>
      <br />
      <br />

      <div class="wrapper" style="margin: 0">
        <button id="wrapper" @click="create">Добавить</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      area: {
        areaName: "",
        email: "",
      },
      users: [],
    };
  },
  mounted() {
    axios
      .get("http://localhost:8083/user/get-admins", {
        headers: {
          Authorization: this.$store.getters.getToken,
        },
      })
      .then((response) => {
        this.users = response.data.value;
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
        this.errored = true;
      });
  },
  methods: {
    create() {
      axios
        .post("http://localhost:8083/area/create", this.area, {
          headers: {
            Authorization: this.$store.getters.getToken,
          },
        })
        .then((resp) => {
          if (resp.status == 200) {
            this.$router.push("/super-admin/show-zones");
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
