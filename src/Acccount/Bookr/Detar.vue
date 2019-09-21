<template>
  <div class="date">
    <div class="toBack">
      <div class="Back">
        <img src="../../assets/images/Back.png" @click="goToFrount" />
        <span class="toBack-text">账面收支明细</span>
      </div>
      <div class="to-flex">
        <router-link to="/Time/Month" @click.native="goTo">当月收支</router-link>
        <router-link to="/Time/Quarter" @click.native="goTo">季度收支</router-link>
        <router-link to="/Time/Year" @click.native="goTo">年度收支</router-link>
      </div>
    </div>
    <div class="Keep">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
  </div>
</template>

<script>
export default {
  inject: ["reload"],
  methods: {
    /**
     *返回上一页
     */
    goToFrount() {
      this.$router.push("/book");
    },
    goTo() {
      this.reload();
    }
  }
};
</script>

<style scoped>
.toBack {
  height: 80px;
  background: #50af08;
  text-align: left;
  padding: 10px;
  margin-bottom: 5px;
}

.Back {
  height: 35px;
  position: relative;
}

.toBack-text {
  position: absolute;
  left: 38%;
  color: #fff;
  top: 14%;
  font-size: 18px;
}

.Back > img {
  height: 100%;
}

.to-flex {
  display: flex;
  margin-top: 26px;
}

.to-flex a {
  flex: 1;
  text-align: center;
  color: #fff;
}

.router-link-exact-active {
  border-bottom: 2px solid #fff;
}
</style>
