<template>
  <div>
    <transition name="modal">
      <div v-if="show" class="modal-shadow" @click.self="closeModal">
        <div v-if="data == 'auth'" class="sign">
          <div class="inForm">
            <img class="flower1" src="../assets/img/icons/table1.png" alt="" />
            <img class="flower2" src="../assets/img/icons/table1.png" alt="" />
            <div class="logo">
              <img src="../assets/img/icons/logo1.png" alt="" />
            </div>
            <p class="center signFont title">Авторизация</p>
            <form>
              <div class="fields">
                <input v-model="email" type="email" placeholder="E-Mail" />
                <div v-show="v$.email.$error" class="validation">
                  Введите адрес почты!
                </div>
                <input
                  v-model="password"
                  type="password"
                  placeholder="Пароль"
                />
                <div v-show="v$.password.$error" class="validation">
                  Пароль содержит минимум 8 символов!
                </div>
                <div v-show="authProblem" class="validation">
                  Неверный адрес почты либо пароль!
                </div>
                <br />
              </div>
              <div class="buttons">
                <input
                  v-on:click.prevent="signin"
                  type="submit"
                  class="signInButton signFont"
                  value="Войти"
                />
                <br /><br />
                <button @click="data = 'reg'" class="signUpButton signFont">
                  Зарегистрироваться
                </button>
              </div>
            </form>
          </div>
        </div>
        <div v-if="data == 'reg'" class="sign">
          <div class="inForm">
            <img class="flower1" src="../assets/img/icons/table1.png" alt="" />
            <img class="flower2" src="../assets/img/icons/table1.png" alt="" />
            <div class="logo">
              <img src="../assets/img/icons/logo1.png" alt="" />
            </div>
            <p class="center signFont title">Регистрация</p>
            <form>
              <div class="fields">
                <input v-model="user.firstName" placeholder="Имя" />
                <input v-model="user.lastName" placeholder="Фамилию" />
                <input
                  v-model="user.email"
                  type="email"
                  placeholder="Электронную почту"
                />
                <input v-model="userPhone" type="tel" placeholder="Телефон" />
                <input
                  v-model="user.password"
                  type="password"
                  placeholder="Пароль"
                />
                <input
                  v-model="repeatPassword"
                  type="password"
                  placeholder="Повторите пароль"
                />
                <br /><br />
              </div>
              <div class="buttons">
                <button
                  v-on:click.prevent="signup"
                  class="signUpButton signFont"
                >
                  Зарегистрироваться
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import axios from "axios";
import useVuelidate from "@vuelidate/core";
import { required, email, minLength, numeric } from "@vuelidate/validators";

export default {
  name: "Sign",
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      show: false,
      data: "auth",
      email: "",
      password: "",
      signInErrorFlag: false,
      signInErrorMessage: "",
      user: {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: "",
      },
      userPhone: "+996 ",
      repeatPassword: "",
      authProblem: false,
    };
  },
  validations: {
    user: {
      firstName: {
        required,
      },
      lastName: {
        required,
      },
      email: {
        email,
        required,
      },
      phone: {
        required,
      },
      password: {
        required,
        minLength: minLength(8),
      },
    },
    email: {
      email,
      required,
    },
    password: {
      required,
      minLength: minLength(8),
    },
  },
  computed: {
    firstNameErrors() {
      const errors = [];
      if (!this.v$.form.name.required) {
        errors.push("Заполните имя");
        console.log("aaaa");
      }
      return errors;
    },
  },
  watch: {
    userPhone(newVal, oldVal) {
      let phone = newVal;
      if (!phone.startsWith("+996 ")) {
        this.userPhone = "+996 ";
      }
      if (phone.length > 14) {
        this.userPhone = oldVal;
      }
    },
  },
  methods: {
    closeModal: function () {
      this.show = false;
      this.data = "auth";
    },

    signin() {
      this.v$.email.$touch();
      this.v$.password.$touch();
      if (this.v$.email.$error || this.v$.password.$error) {
        console.log("Валидация не удалась");
      } else {
        console.log("inside sign in");
        let email = this.email;
        let password = this.password;
        axios
          .post("http://localhost:8083/user/sign-in", { email, password })
          .then((resp) => {
            if (resp.status == 200) {
              this.$store.commit("setCredentials", {
                email: resp.data.value.email,
                token: "Bearer " + resp.data.value.token,
                signInFlag: true,
                id: resp.data.value.userId,
                role: resp.data.value.role,
              });

              this.$router.push("/");

              sessionStorage.setItem("email", resp.data.value.email);
              sessionStorage.setItem(
                "token",
                "Bearer " + resp.data.value.token
              );
              sessionStorage.setItem("signInFlag", true);
              sessionStorage.setItem("id", resp.data.value.userId);
              sessionStorage.setItem("role", resp.data.value.role);
              this.show = false;
              this.authProblem = false;
            }

            console.log(this.$store.state);
          })
          .catch((error) => {
            if (!error.response) {
              this.$store.commit("setError", error);
            } else if (error.response.data.details === undefined) {
              this.$store.commit("setError", error);
            } else {
              this.signInErrorFlag = true;
              this.signInErrorMessage = error.response.data.details;
              console.log(error.response.data);
            }
            this.authProblem = true;
          });
      }
    },
    signup() {
      this.user.phone = this.userPhone;
      this.v$.user.$touch();
      if (this.v$.user.firstName.$error) {
        alert("Введите имя!");
      } else if (this.v$.user.lastName.$error) {
        alert("Введите фамилию!");
      } else if (this.v$.user.email.$error) {
        alert("Введите корректно электронную почту!");
      } else if (this.v$.user.phone.$error) {
        alert("Введите номер телефона!");
      } else if (this.v$.user.password.$error) {
        alert("Пароль должен содержать более 8 символов)!");
      } else if (this.repeatPassword != this.user.password) {
        alert("Повторите пароль!");
      } else {
        console.log("inside sign up");
        axios
          .post("http://localhost:8083/user/sign-up", this.user)
          .then((resp) => {
            if (resp.status == 200) {
              this.data = "auth";
            }
            console.log(this.$store.state);
          })
          .catch((error) => {
            if (!error.response) {
              this.$store.commit("setError", error);
            } else if (error.response.data.details === undefined) {
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

<style>
.modal-shadow {
  position: fixed;
  top: 0;
  left: 0;
  min-height: 100%;
  width: 100%;
  z-index: 3;
  background: rgba(0, 0, 0, 0.39);
}

.sign {
  z-index: 3;
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.modal-enter,
.modal-leave-active {
  opacity: 0;
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.5s ease;
}
</style>

<style src="../assets/css/all.css" />
