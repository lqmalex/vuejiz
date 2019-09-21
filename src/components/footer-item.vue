<template>
  <div class="footer-item" @click="goBack">
    <div class="footer-botton">
      <a v-show="!isDis">
        <slot name="footer-img"></slot>
        <slot name="footer-name"></slot>
      </a>
      <a v-show="isDis" :style="{'display':'block','color':'rgb(91, 255, 0)'}">
        <slot name="footer-imgs"></slot>
        <slot name="footer-name"></slot>
      </a>
    </div>
  </div>
</template>

<script scoped>
export default {
  data() {
    return {
      paths: ""
    };
  },
  props: {
    path: {
      type: String
    }
  },
  computed: {
    isDis() {
      return this.path == this.$route.name ? true : false;
    }
  },
  methods: {
    goBack() {
      this.$router.push(this.path);
    }
  }
};
</script>

<style>
.footer-item {
  flex: 1;
}

/* .footer-item:nth-child(2) {
  position: relative;
  top: -30px;
}

.footer-item:nth-child(2) .footer-botton img {
  width: 60px;
} */

.footer-botton img {
  width: 35px;
}
</style>
