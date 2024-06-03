<template>
  <div class="super">
    <div class="form-fauna-flora">
      <h1 style="text-align: center">Редактирование Меню</h1>
      <div class="formbox">
        <form>
          <label for="name">Введите название:</label>
          <br />
          <input v-model="menu.name" type="text" id="name" /><br />

          <br />

          <label for="desc">Введите описание:</label>
          <br />
          <textarea v-model="menu.description" type="text" id="desc" /><br />

          <br />
          <label for="price">Введите цену:</label>
          <br />
          <input
            style="width: 100%"
            v-model="menu.price"
            type="number"
            id="price"
          /><br />
        </form>
      </div>

      <label for="select">Выберите секцию:</label>
      <div class="type">
        <select v-model="menu.menuSectionId" id="select">
          <option v-for="(i, index) in menuSections" :key="index" :value="i.id">
            {{ i.name }}
          </option>
        </select>
      </div>

      <div class="wrapper" style="margin: 0">
        <button id="wrapper" @click="update()">Редактировать</button>
      </div>
      <br />
      <br />
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      menu: {
        id: null,
        name: "",
        price: "",
        description: "",
        menuSectionId: null,
      },
      menuSections: [],
    };
  },
  methods: {
    update() {
      axios
        .put("http://localhost:8083/menu/update", this.menu, {
          headers: {
            Authorization: this.$store.getters.getToken,
          },
        })
        .then((resp) => {
          if (resp.status == 200) {
            this.$router.push("/super-admin/show-menu");
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
      .get("http://localhost:8083/menu/section/get-for-select", {
        headers: {
          Authorization: this.$store.getters.getToken,
        },
      })
      .then((response) => {
        this.menuSections = response.data.value;
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
        this.errored = true;
      });

    axios
      .get("http://localhost:8083/menu/get/" + this.$route.params.id, {
        headers: {
          Authorization: this.$store.getters.getToken,
        },
      })
      .then((response) => {
        this.menu = response.data.value;
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
