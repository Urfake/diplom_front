<template>
  <div class="super">
    <div class="form-fauna-flora">
      <h1 style="text-align: center">Добавление Секции Меню</h1>
      <div class="formbox">
        <form>
          <label for="name">Введите название:</label>
          <br />
          <input
            v-model="menuSection.name"
            type="text"
            id="name"
            name="firstname"
          /><br />
        </form>
      </div>

      <label for="select">Выбрать объект:</label>
      <div class="type">
        <select v-model="menuSection.objectTypeId" id="select">
          <option v-for="(i, index) in objects" :key="index" :value="i.id">
            {{ i.name }}
          </option>
        </select>
      </div>

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
      menuSection: {
        name: "",
        objectTypeId: null,
      },
      objects: [],
    };
  },
  methods: {
    create() {
      axios
        .post("http://localhost:8083/menu/section/create", this.menuSection, {
          headers: {
            Authorization: this.$store.getters.getToken,
          },
        })
        .then((resp) => {
          if (resp.status == 200) {
            this.$router.push("/super-admin/show-menu-sections");
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
  mounted() {
    axios
      .get("http://localhost:8083/object/type/get-for-select", {
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
};
</script>

<style src="../../assets/css/super.css" />
