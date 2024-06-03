<template>
  <nav>
    <div :class="burger ? 'burger-menu-active' : 'burger-menu'">
      <div class="burger-menu-items">
        <router-link @click="burger = !burger" to="/">Главная</router-link>
        <br />
        <a @click="dropdown = !dropdown" class="mini-about-us"
          >О нас
          <img
            :class="dropdown ? 'mini-arrow-active' : 'mini-arrow'"
            src="./assets/img/icons/arrow-up.png"
            alt=""
        /></a>
        <br />
        <router-link
          class="sub-about-mob"
          v-show="dropdown"
          @click="burger = !burger"
          to="/flora"
          >Флора</router-link
        >
        <br />
        <router-link
          class="sub-about-mob"
          v-show="dropdown"
          @click="burger = !burger"
          to="/fauna"
          >Фауна</router-link
        >
        <br />
        <router-link
          class="sub-about-mob"
          v-show="dropdown"
          @click="burger = !burger"
          to="/about-us"
          >История</router-link
        >
        <br />
        <router-link @click="burger = !burger" to="/services"
          >Услуги</router-link
        >
        <br />
        <router-link @click="burger = !burger" to="/entry">Въезд</router-link>
        <br v-if="$store.state.credentials.role == 'CLIENT'" />
        <router-link
          v-if="$store.state.credentials.role == 'CLIENT'"
          @click="burger = !burger"
          to="/cart"
          >Корзина</router-link
        >
        <br v-if="$store.state.credentials.role == 'ADMIN'" />
        <router-link
          v-if="$store.state.credentials.role == 'ADMIN'"
          @click="burger = !burger"
          to="/admin/show-admin-menu"
          >Интерфейс админа</router-link
        >
        <br v-if="$store.state.credentials.role == 'SUPER_ADMIN'" />
        <router-link
          v-if="$store.state.credentials.role == 'SUPER_ADMIN'"
          @click="burger = !burger"
          to="/super-admin/show-superadmin-menu"
          >Интерфейс супер админа</router-link
        >
        <br class="ultra-br" />
        <a
          v-if="!this.$store.getters.getSignInFlag"
          class="auth-mob"
          @click="
            showModal();
            burger = !burger;
          "
          >Авторизация</a
        >
        <a
          v-if="this.$store.getters.getSignInFlag"
          class="auth-mob"
          @click="
            signOut();
            burger = !burger;
          "
          >Выйти</a
        >
      </div>
    </div>

    <div
      @click.self="dropdown = !dropdown"
      v-if="dropdown"
      style="position: fixed; top: 0; left: 0; min-height: 100%; width: 100%"
    />
    <div class="navbar">
      <div class="menu">
        <div class="burger" @click="burger = !burger">
          <div
            class="burger-line"
            :class="burger ? 'f-burg-line-active' : 'f-burg-line'"
          />
          <div
            class="burger-line"
            :class="burger ? 's-burg-line-active' : 's-burg-line'"
          />
          <div
            class="burger-line"
            :class="burger ? 't-burg-line-active' : 't-burg-line'"
          />
        </div>
      </div>
      <div class="logo">
        <img
          style="z-index: 2; position: relative"
          :src="require('./assets/img/icons/logo.png')"
          @click="$router.push('/')"
          alt="logo"
        />
      </div>
      <ul class="green font">
        <li><router-link to="/">Главная</router-link></li>
        <li>
          <a @click="dropdown = !dropdown" style="position: relative"
            >О нас<img
              :class="dropdown ? 'arrow-active' : 'arrow-not-active'"
              class="arrow"
              src="./assets/img/icons/arrow-down.svg"
              alt=""
            />
            <div class="dropdown-about-us" v-show="dropdown">
              <router-link to="/about-us" style="padding: 1vw 25px 0.7vw 25px"
                >История</router-link
              >
              <hr />
              <router-link to="/flora" style="padding: 0.7vw 25px"
                >Флора</router-link
              >
              <hr />
              <router-link to="/fauna" style="padding: 0.7vw 25px 1vw 25px"
                >Фауна</router-link
              >
            </div></a
          >
        </li>
        <li><router-link to="/services">Услуги</router-link></li>
        <li><router-link to="/entry">Въезд</router-link></li>
        <li v-if="$store.state.credentials.role == 'CLIENT'">
          <router-link to="/cart">Корзина</router-link>
        </li>
        <li v-if="$store.state.credentials.role == 'ADMIN'">
          <router-link to="/admin/show-admin-menu"
            >Интерфейс админа</router-link
          >
        </li>
        <li v-if="$store.state.credentials.role == 'SUPER_ADMIN'">
          <router-link to="/super-admin/show-superadmin-menu"
            >Интерфейс супер админа</router-link
          >
        </li>
      </ul>
      <a
        v-if="!this.$store.getters.getSignInFlag"
        class="green authorize font"
        @click="showModal"
        >Авторизация</a
      >
      <a
        v-if="this.$store.getters.getSignInFlag"
        class="green authorize font"
        @click="signOut()"
        >Выйти</a
      >
    </div>
  </nav>
  <router-view v-if="!burger" />
  <sign ref="sign" />
</template>

<script>
import Sign from "@/components/Sign.vue";

export default {
  components: {
    Sign,
  },
  methods: {
    signOut() {
      this.$router.push("/");
      this.$store.commit("setCredentials", {
        email: "please log in",
        token: "",
        signInFlag: false,
      });
      sessionStorage.clear();
      localStorage.removeItem("clickedMenu");
    },
    showModal: function () {
      this.$refs.sign.show = true;
    },
  },
  data() {
    return {
      dropdown: false,
      burger: false,
    };
  },
  watch: {
    // $route() {
    //   if (
    //     this.$route.path != "/" &&
    //     this.$route.path != "/sign-in" &&
    //     !this.$store.getters.getSignInFlag &&
    //     !Object.values(this.$store.getters.getError).length
    //   ) {
    //     this.$router.push("/sign-in");
    //   }
    // },
  },
};
</script>

<style lang="css" src="@/assets/css/header_footer.css" />
