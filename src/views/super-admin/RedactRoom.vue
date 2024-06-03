<template>
  <div class="super">
    <div class="form-fauna-flora">
      <h1 style="text-align: center">Редактирование комнаты</h1>

      <div class="formbox">
        <form>
          <label for="name">Введите номер комнаты:</label>
          <br />
          <input v-model="room.roomNumber" type="number" id="name" /><br />

          <br />

          <label for="numberOfSeats">Введите количество мест:</label>
          <br />
          <input
            v-model="room.bedNumber"
            style="width: 100%"
            type="number"
            id="numberOfSeats"
          /><br />
          <br />
        </form>
      </div>
      <br />
      <br />

      <div class="wrapper" style="margin: 0">
        <button id="wrapper" @click="update()">Редактировать</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      room: {
        id: null,
        roomNumber: null,
        bedNumber: null,
        roomTypeId: null,
      },
      roomTypes: [],
    };
  },
  mounted() {
    axios
      .get("http://localhost:8083/room/type/get-for-select", {
        headers: {
          Authorization: this.$store.getters.getToken,
        },
      })
      .then((response) => {
        this.roomTypes = response.data.value;
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
        this.errored = true;
      });

    axios
      .get("http://localhost:8083/room/get/" + this.$route.params.id, {
        headers: {
          Authorization: this.$store.getters.getToken,
        },
      })
      .then((response) => {
        this.room = response.data.value;
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
        this.errored = true;
      });
  },
  methods: {
    update() {
      axios
        .put("http://localhost:8083/room/update", this.room, {
          headers: {
            Authorization: this.$store.getters.getToken,
          },
        })
        .then((resp) => {
          if (resp.status == 200) {
            this.$router.push("/super-admin/show-rooms");
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
