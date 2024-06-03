<template>
  <div class="super">
    <div class="form-fauna-flora">
      <h1 style="text-align: center">Редактирование Растения/Животного</h1>

      <div class="formbox">
        <form>
          <label for="name">Введите название:</label>
          <br />
          <input v-model="florauna.name" type="text" id="name" /><br />

          <br />

          <label for="desc">Введите описание:</label>
          <br />
          <textarea v-model="florauna.description" id="desc"></textarea>
        </form>
      </div>

      <label for="select">Выберите тип:</label>
      <div class="type">
        <select id="select" v-model="florauna.natureTypeId">
          <option
            v-for="(natureType, index) in natureTypes"
            :key="index"
            :value="natureType.id"
          >
            {{ natureType.type }}
          </option>
        </select>
      </div>
      <br />

      <br />
      <br />

      <div class="photo-upload">
        <form>
          <input
            type="file"
            @change="handleImage"
            id="img"
            name="img"
            accept="image/*"
            hidden
          />
          <label for="img">Прикрепить фотографию:</label>
        </form>
      </div>
      <br />
      <div v-if="florauna.img" class="getImage">
        <img class="uploaded-image" :src="florauna.img" alt="aa" />
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
      florauna: {
        id: null,
        name: "",
        description: "",
        img: "",
        natureTypeId: "",
      },
      natureTypes: [],
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
        this.florauna.img = e.target.result;
      };

      reader.readAsDataURL(fileObject);
    },
    update() {
      axios
        .put("http://localhost:8083/nature/update", this.florauna, {
          headers: {
            Authorization: this.$store.getters.getToken,
          },
        })
        .then((resp) => {
          if (resp.status == 200) {
            this.$router.push("/super-admin/show-flora-fauna");
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
      .get("http://localhost:8083/nature/type/get-for-select", {
        headers: {
          Authorization: this.$store.getters.getToken,
        },
      })
      .then((response) => {
        this.natureTypes = response.data.value;
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
        this.errored = true;
      });

    axios
      .get("http://localhost:8083/nature/get/" + this.$route.params.id, {
        headers: {
          Authorization: this.$store.getters.getToken,
        },
      })
      .then((response) => {
        this.florauna = response.data.value;
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
