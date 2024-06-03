<template>
  <div class="super">
    <div class="form-fauna-flora">
      <h1 style="text-align: center">Добавление объекта</h1>

      <div class="formbox">
        <form>
          <label for="name">Введите название:</label>
          <br />
          <input v-model="object.name" type="text" id="name" /><br />

          <br />

          <label for="numberOfSeats">Введите количество мест:</label>
          <br />
          <input
            v-model="object.numberOfSeats"
            style="width: 100%"
            type="number"
            min="0"
            id="numberOfSeats"
          /><br />

          <br />
          <label for="select">Выберите тип объекта:</label>
          <div class="type">
            <select id="select" v-model="object.objectTypeId">
              <option
                v-for="(i, index) in objectTypes"
                :key="index"
                :value="i.id"
              >
                {{ i.name }}
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
      object: {
        name: "",
        numberOfSeats: null,
        objectTypeId: null,
      },
      objectTypes: [],
    };
  },
  mounted() {
    axios
      .get("http://localhost:8083/object/type/get-for-select", {
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
    create() {
      axios
        .post("http://localhost:8083/object/create", this.object, {
          headers: {
            Authorization: this.$store.getters.getToken,
          },
        })
        .then((resp) => {
          if (resp.status == 200) {
            this.$router.push("/super-admin/show-objects");
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
