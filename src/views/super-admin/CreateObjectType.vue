<template>
  <div class="super">
    <div class="form-fauna-flora">
      <h1 style="text-align: center">Добавление Типа объекта</h1>

      <div class="formbox">
        <form>
          <label for="select">Выберите зону</label>
          <div class="type">
            <select id="select" v-model="objectType.areaId">
              <option v-for="(i, index) in areas" :key="index" :value="i.id">
                {{ i.areaName }}
              </option>
            </select>
          </div>
          <br />
          <label for="name">Введите название Типа объекта:</label>
          <br />
          <input v-model="objectType.name" type="text" id="name" /><br />

          <label for="price">Введите основную цену:</label>
          <br />
          <input
            v-model="objectType.price"
            type="number"
            step="any"
            min="0"
            style="width: 100%"
            id="price"
          /><br />

          <label for="priceper">Введите цену за последующие часы:</label>
          <br />
          <input
            v-model="objectType.pricePerHour"
            type="number"
            step="any"
            min="0"
            style="width: 100%"
            id="priceper"
          /><br />

          <label for="priceper">Введите минимальное время:</label>
          <br />
          <input
            v-model="objectType.minHours"
            type="number"
            step="any"
            min="0"
            style="width: 100%"
            id="priceper"
          /><br />

          <label for="selecttype">Выберите тип времени:</label>
          <div class="type">
            <select v-model="objectType.timeType" id="selecttype">
              <option value="DATE">По дням</option>
              <option value="TIME">По часам</option>
            </select>
          </div>
        </form>
      </div>

      <br />
      <div class="getImagesGrid">
        <img
          v-for="(i, index) in objectType.objectTypeImgModels"
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
      objectType: {
        name: "",
        price: null,
        pricePerHour: null,
        objectTypeImgModels: [],
        areaId: "",
        timeType: "",
        minHours: null,
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
        this.objectType.objectTypeImgModels.push({ img: e.target.result });
      };

      reader.readAsDataURL(fileObject);
    },

    create() {
      axios
        .post("http://localhost:8083/object/type/create", this.objectType, {
          headers: {
            Authorization: this.$store.getters.getToken,
          },
        })
        .then((resp) => {
          if (resp.status == 200) {
            this.$router.push("/super-admin/show-object-types");
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
