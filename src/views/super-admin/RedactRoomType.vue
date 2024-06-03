<template>
  <div class="super">
    <div class="form-fauna-flora">
      <h1 style="text-align: center">Редактирование типа комнат</h1>

      <div class="formbox">
        <form>
          <label for="name">Введите название типа комнаты:</label>
          <br />
          <input
            v-model="roomType.type"
            type="text"
            id="name"
            name="name"
          /><br />

          <br />

          <label for="price">Введите цену:</label>
          <br />
          <input
            v-model="roomType.price"
            style="width: 100%"
            type="number"
            id="price"
            name="type"
          /><br />

          <label for="select">Выберите отель:</label>
          <div class="type">
            <select id="select" v-model="roomType.hotelId">
              <option v-for="(i, index) in hotels" :key="index" :value="i.id">
                {{ i.hotelName }}
              </option>
            </select>
          </div>
          <br />
        </form>
      </div>

      <br />
      <br />
      <div class="getImagesGrid">
        <img
          v-for="(i, index) in roomType.roomTypeImageModels"
          :key="index"
          :src="i.img"
          alt="aa"
        />
      </div>
      <br />

      <div class="photo-upload">
        <form>
          <input
            @change="handleImage"
            type="file"
            id="img"
            name="img"
            accept="image/*"
            hidden
          />
          <label for="img">Прикрепить фотографию:</label>
        </form>
      </div>

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
      roomType: {
        id: null,
        type: "",
        price: 0,
        hotelId: null,
        roomTypeImageModels: [],
      },
      hotels: [],
    };
  },

  methods: {
    handleImage(e) {
      const selectedImage = e.target.files[0];
      this.createBase64Image(selectedImage);
    },

    createBase64Image(fileObject) {
      const reader = new FileReader();

      reader.onload = (e) => {
        this.roomType.roomTypeImageModels.push({
          img: e.target.result,
        });
      };

      reader.readAsDataURL(fileObject);
    },
    update() {
      axios
        .put("http://localhost:8083/room/type/update", this.roomType, {
          headers: {
            Authorization: this.$store.getters.getToken,
          },
        })
        .then((resp) => {
          if (resp.status == 200) {
            this.$router.push("/super-admin/show-room-types");
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
      .get("http://localhost:8083/hotel/get-for-select", {
        headers: {
          Authorization: this.$store.getters.getToken,
        },
      })
      .then((response) => {
        this.hotels = response.data.value;
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
        this.errored = true;
      });

    axios
      .get("http://localhost:8083/room/type/get/" + this.$route.params.id, {
        headers: {
          Authorization: this.$store.getters.getToken,
        },
      })
      .then((response) => {
        this.roomType = response.data.value;
        console.log(response.data);
        this.roomType.roomTypeImageModels = [];
      })
      .catch((error) => {
        console.log(error);
        this.errored = true;
      });
  },
};
</script>

<style src="../../assets/css/super.css" />
