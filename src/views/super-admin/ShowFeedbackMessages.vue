<template>
  <div class="container">
    <div class="super-admin">
      <h2>Список сообщений</h2>
      <table>
        <tr>
          <th>ID</th>
          <th>Имя пользователя</th>
          <th>Email</th>
          <th>Сообщение</th>
          <th class="edit">Ответить</th>
        </tr>
        <tr v-for="(objectType, i) in objectTypes" :key="i">
          <td>{{ objectType.id }}</td>
          <td>{{ objectType.name }}</td>
          <td>{{ objectType.email }}</td>
          <td>{{ objectType.message }}</td>
          <td class="edit" @click="reply(objectType.id)"><a>Ответить</a></td>
        </tr>
      </table>
    </div>
  </div>
  <div class="super">
    <div class="form-fauna-flora">
      <h1 style="text-align: center">Обратная связь</h1>

      <div class="formbox">
        <form>
          <label for="id">Введите идентификационный номер:</label>
          <br />
          <input
            v-model="message.userFeedBackId"
            style="width: 100%"
            type="number"
            id="id"
          /><br />

          <br />

          <label for="name">Введите оглавление:</label>
          <br />
          <input v-model="message.subject" type="text" id="name" /><br />

          <br />

          <label for="mess">Введите сообщение:</label>
          <br />
          <textarea
            v-model="message.body"
            id="mess"
            cols="30"
            rows="10"
          ></textarea
          ><br />
        </form>
      </div>
      <br />
      <br />

      <div class="wrapper" style="margin: 0">
        <button id="wrapper" @click="send()">Отправить</button>
      </div>
      <br />
      <br />
      <br />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import useVuelidate from "@vuelidate/core";
import { required, numeric } from "@vuelidate/validators";

export default {
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      objectTypes: [],
      message: {
        userFeedBackId: null,
        subject: "",
        body: "",
      },
    };
  },
  mounted() {
    axios
      .get("http://localhost:8083/feedback/get-all", {
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
  validations: {
    message: {
      userFeedBackId: {
        numeric,
        required,
      },
      subject: {
        required,
      },
      body: {
        required,
      },
    },
  },
  methods: {
    reply(id) {
      this.message.userFeedBackId = id;
    },
    send() {
      this.v$.message.$touch();
      if (this.v$.message.userFeedBackId.$error) {
        alert("Введите id сообщения для обратной связи!");
      } else if (this.v$.message.subject.$error) {
        alert("Введите оглавление!");
      } else if (this.v$.message.body.$error) {
        alert("Введите тело сообщения!");
      } else {
        axios
          .post("http://localhost:8083/feedback/reply", this.message, {
            headers: {
              Authorization: this.$store.getters.getToken,
            },
          })
          .then((resp) => {
            if (resp.status == 200) {
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
      }
    },
  },
};
</script>

<style src="../../assets/css/super.css" />
