<template>
  <div id="app">
    <router-view v-if="isRouterAlive" />
    <footerr v-show="show">
      <footerItem slot="footerItem" path="/book">
        <img src="./assets/images/Deta.png" slot="footer-img" alt />
        <img src="./assets/images/Detad.png" slot="footer-imgs" alt />
        <div slot="footer-name">明细</div>
      </footerItem>
      <footerItem slot="footerItem" path="/func">
        <img src="./assets/images/cross.png" slot="footer-img" alt />
        <img src="./assets/images/cross.png" slot="footer-imgs" alt />
        <div slot="footer-name" :style="{'color':'#5bff00'}">记账</div>
      </footerItem>
      <footerItem slot="footerItem" path="/me">
        <img src="./assets/images/me.png" slot="footer-img" alt />
        <img src="./assets/images/mes.png" slot="footer-imgs" alt />
        <div slot="footer-name">我的</div>
      </footerItem>
    </footerr>
  </div>
</template>
 
<script>
import footerr from "./components/footer";
import footerItem from "./components/footer-item";
import { param } from "../../Vue/webpack3/douban/src/assets/jsonp";
import { reject } from "q";
import { resolve } from "url";
export default {
  components: {
    footerr,
    footerItem
  },
  data() {
    return {
      show: true,
      isRouterAlive: true,
      Token: "",
      Book_id: "",
      type: true
    };
  },
  methods: {
    /**
     * 判断是否是相关页面，是则隐藏下方tabbar
     */
    setShow() {
      this.show =
        this.$route.name == "/login" ||
        this.$route.name == "/req" ||
        this.$route.name == "/Assets" ||
        this.$route.name.substr(0, 4) == "/vue"
          ? false
          : true;
    },
    /**
     * 判断是否登录，如果无登录则默认跳转到登录页
     */
    ReqLogin() {
      let token = localStorage.getItem("token");
      // console.log(token);
      //防止用户使用游览器消除token而无法判断
      if (token == null || token == "null" || token == "") {
        this.$router.push("/login");
      }
    },
    /**
     * 刷新页面
     */
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(function() {
        this.isRouterAlive = true;
      });
    }
  },
  /**
   * 将reload抛出
   */
  provide() {
    return {
      reload: this.reload
    };
  },
  created() {
    this.ReqLogin();
    this.setShow();
  },
  updated() {
    this.setShow();
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

body {
  background: #f1f1f1;
}

* {
  margin: 0;
  padding: 0;
  /* color: #969696; */
}

a {
  text-decoration: none;
}

.mar {
  margin-bottom: 80px;
}
</style>
