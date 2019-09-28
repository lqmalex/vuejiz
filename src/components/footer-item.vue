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

<style lang="less">
.footer-item {
  flex: 1;

  .footer-botton {
    height: 100%;
    margin-bottom: 2px;

    img {
      width: 30px;
    }

    & > a {
      display: block;

      & > div {
        font-size: 14px;
        line-height: 6px;
      }
    }
  }
}
</style>
