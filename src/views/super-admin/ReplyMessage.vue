<template>
  <div class="super">
    <div class="form-fauna-flora">
      <h1 style="text-align: center">Обратная связь</h1>

      <div class="formbox">
        <form>
          <label for="name">Введите оглавление:</label>
          <br />
          <input v-model="area.areaName" type="text" id="name" /><br />

          <br />

          <label for="mess">Введите сообщение:</label>
          <br />
          <input v-model="area.areaName" type="text" id="mess" /><br />
        </form>
      </div>
      <br />
      <br />

      <div class="wrapper" style="margin: 0">
        <button id="wrapper" @click="reply">Отправить</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      message: {
        userFeedBackId: null,
        subject: "",
        body: "",
      },
    };
  },
  methods: {
    reply() {
      axios
        .post("http://localhost:8083/feedback/reply", this.message, {
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
