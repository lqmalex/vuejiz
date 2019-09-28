<template>
  <div id="ReqLogin">
    <div class="ReqLogin_main">
      <div class="page">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </div>
      <div class="paging">
        <router-link v-show="!type" to="/login">登录</router-link>
        <router-link v-show="type" to="/req">注册</router-link>
      </div>
    </div>
  </div>
</template>
 
<script>
import { Toast } from "vant";
export default {
  data() {
    return {
      type: true
    };
  },
  methods: {
    setType() {
      let route = this.$route.name;
      this.type = route == "/login" ? true : false;
    }
  },
  created() {
    this.setType();
    Toast.clear();
  },
  updated() {
    this.setType();
  }
};
</script>

<style scoped lang="less">
#ReqLogin {
  width: 100%;
  position: absolute;
  height: 100%;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  .paging {
    margin-top: 15px;

    a {
      color: #969696;
      display: block;
      font-size: 15px;
      text-align: left;
    }
  }
}
</style>
