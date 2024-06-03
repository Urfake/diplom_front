<template>
  <div class="parallax">
    <img
      @click="console.log('Casas')"
      class="sky"
      src="../assets/img/parallax/sky_1.png"
      alt=""
    />
    <img
      :class="parallax ? 'sun-no-active' : 'sun'"
      src="../assets/img/parallax/sun.png"
      alt=""
    />
    <img
      :class="parallax ? 'clouds-no-active' : 'clouds'"
      src="../assets/img/parallax/clouds.png"
      alt=""
    />
    <img
      :class="parallax ? 'back_mount-no-active' : 'back_mount'"
      src="../assets/img/parallax/back_mount1.png"
      alt=""
    />
    <img
      :class="parallax ? 'mid_mount-no-active' : 'mid_mount'"
      src="../assets/img/parallax/mid_mount.png"
      alt=""
    />
    <h1 :class="parallax ? 'parralax-title-no-active' : 'parralax-title'">
      Ала-Арча
    </h1>
    <img
      :class="parallax ? 'front_mount-no-active' : 'front_mount'"
      src="../assets/img/parallax/front_mount.png"
      alt=""
    />
    <img
      :class="parallax ? 'trees-no-active' : 'trees'"
      src="../assets/img/parallax/trees.png"
      alt=""
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      parallax: true,
    };
  },
  mounted() {
    setTimeout(() => (this.parallax = false), 500);
  },
};
</script>

<style src="../assets/css/all.css"></style>
