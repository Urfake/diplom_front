<template>
  <div class="super">
    <div class="form-fauna-flora">
      <h1 style="text-align: center">Добавление Гостиницы</h1>

      <div class="formbox">
        <form>
          <label for="select">Выберите зону</label>
          <div class="type">
            <select id="select" v-model="hotel.areaId">
              <option v-for="(i, index) in areas" :key="index" :value="i.id">
                {{ i.areaName }}
              </option>
            </select>
          </div>
          <br />
          <br />
          <br />
          <label for="name">Введите название Гостиницы:</label>
          <br />
          <input
            v-model="hotel.hotelName"
            type="text"
            id="name"
            name="hotel"
          /><br />
        </form>
      </div>

      <br />
      <div class="getImagesGrid">
        <img
          v-for="(i, index) in hotel.hotelImgModels"
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
      <br />

      <div class="wrapper">
        <button id="wrapper" @click="createHotel">Добавить</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      hotel: {
        hotelName: "",
        areaId: "",
        hotelImgModels: [],
      },
      areas: [],
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
        this.hotel.hotelImgModels.push({ img: e.target.result });
      };

      reader.readAsDataURL(fileObject);
    },

    createHotel() {
      axios
        .post("http://localhost:8083/hotel/create", this.hotel, {
          headers: {
            Authorization: this.$store.getters.getToken,
          },
        })
        .then((resp) => {
          if (resp.status == 200) {
            this.$router.push("/super-admin/show-hotels");
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
      .get("http://localhost:8083/area/get-for-select", {
        headers: {
          Authorization: this.$store.getters.getToken,
        },
      })
      .then((response) => {
        this.areas = response.data.value;
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
