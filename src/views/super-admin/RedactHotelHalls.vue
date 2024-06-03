<template>
  <div class="super">
    <div class="form-fauna-flora">
      <h1 style="text-align: center">Редактирование дополнительных комнат</h1>

      <div class="formbox">
        <form>
          <label for="name">Введите название:</label>
          <br />
          <input
            v-model="hotelHall.name"
            type="text"
            id="name"
            name="name"
          /><br />

          <br />

          <label for="price">Введите цену:</label>
          <br />
          <input
            v-model="hotelHall.price"
            style="width: 100%"
            type="number"
            id="price"
            name="type"
          /><br />

          <label for="priceper">Введите цену за последующие часы:</label>
          <br />
          <input
            v-model="hotelHall.priceForNextHours"
            style="width: 100%"
            type="text"
            id="priceper"
            name="number"
          /><br />

          <label for="seats">Введите количество мест:</label>
          <br />
          <input
            v-model="hotelHall.numberOfSeats"
            style="width: 100%"
            type="text"
            id="seats"
            name="number"
          /><br />

          <label for="select">Выберите отель:</label>
          <div class="type">
            <select id="select" v-model="hotelHall.hotelId">
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
          v-for="(i, index) in hotelHall.hotelHall_imgModels"
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
      hotelHall: {
        id: null,
        name: "",
        price: null,
        priceForNextHours: null,
        numberOfSeats: null,
        hotelId: null,
        hotelHall_imgModels: [],
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
        this.hotelHall.hotelHall_imgModels.push({ img: e.target.result });
      };

      reader.readAsDataURL(fileObject);
    },

    update() {
      axios
        .put("http://localhost:8083/hotelHall/update", this.hotelHall, {
          headers: {
            Authorization: this.$store.getters.getToken,
          },
        })
        .then((resp) => {
          if (resp.status == 200) {
            this.$router.push("/super-admin/show-hotel-halls");
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
      .get("http://localhost:8083/hotelHall/get/" + this.$route.params.id, {
        headers: {
          Authorization: this.$store.getters.getToken,
        },
      })
      .then((response) => {
        this.hotelHall = response.data.value;
        console.log(response.data);
        this.hotelHall.hotelHall_imgModels = [];
      })
      .catch((error) => {
        console.log(error);
        this.errored = true;
      });
  },
};
</script>

<style src="../../assets/css/super.css" />
