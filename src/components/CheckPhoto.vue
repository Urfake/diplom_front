<template>
  <div
    v-if="showModal"
    @click.self="showModal = false"
    class="check_photo_shadow"
  >
    <img :src="photo" class="check_photo" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      showModal: false,
      photo: "",
    };
  },
  methods: {},
};
</script>

<style></style>
