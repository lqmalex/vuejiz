<template>
  <div class="func">
    <div class="text-hea">
      <div class="text">记一笔</div>
      <div class="func-flex">
        <router-link to="/income">收入</router-link>
        <router-link to="/expen">支出</router-link>
      </div>
    </div>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
import { Toast } from "vant";
export default {
  components: {
    [Toast.name]: Toast
  },
  data() {
    return {};
  },
  created() {
    Toast.clear();
  }
};
</script>

<style scoped lang="less">
.func {
  margin-bottom: 80px;

  .text-hea {
    padding: 10px 0 0 0;
    height: 80px;
    background: #50af08;
    position: relative;

    .text {
      color: #fff;
      font-size: 24px;
    }
  }

  .func-flex {
    display: flex;
    position: relative;
    bottom: -14px;

    a {
      flex: 1;
      color: #fff;
      font-size: 18px;
    }
  }

  .router-link-exact-active {
    border-bottom: 2px solid #fff;
  }

  .van-uploader__upload {
    margin: 0 !important;
  }
}
</style>
