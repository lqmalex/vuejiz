<template>
  <div class="Set">
    <div class="toBack">
      <img src="../../assets/images/Back.png" @click="goToFrount" />
      <span class="toBack-text">财务</span>
    </div>
    <div class="Func-main">
      <div class="Func-main-text" @click="goToAss">
        <img src="../../assets/images/Dollar.png" /> 资产账户
        <div class="Func-main-text-icon">
          <img src="../../assets/images/arrow.png" alt />
        </div>
      </div>
      <div class="Func-main-text" @click="goToCate(1)">
        <img src="../../assets/images/Gcategory.png" alt /> 收入类别
        <div class="Func-main-text-icon">
          <img src="../../assets/images/arrow.png" alt />
        </div>
      </div>
      <div class="Func-main-text" @click="goToCate(2)">
        <img src="../../assets/images/Rcategory.png" alt /> 支出类别
        <div class="Func-main-text-icon">
          <img src="../../assets/images/arrow.png" alt />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    /**
     *返回上一页
     */
    goToFrount() {
      this.$router.push("/acco");
    },
    /**
     * 跳转至账户页
     */
    goToAss() {
      this.$router.push("/Assets");
    },
    /**
     *
     */
    goToCate(Id) {
      // console.log(Id);
      localStorage.setItem("cate", Id);
      this.$router.push("/Cate");
    }
  }
};
</script>

<style scoped>
.Set {
  width: 100%;
}

.toBack {
  height: 35px;
  background: #50af08;
  text-align: left;
  padding: 10px;
  position: relative;
}

.toBack-text {
  position: absolute;
  left: 45%;
  color: #fff;
  top: 25%;
  font-size: 18px;
}

.toBack > img {
  height: 100%;
}

.Func-main {
  margin-top: 15px;
  background: #fff;
  overflow: hidden;
}

.Func-main-text {
  position: relative;
  border-bottom: 1px solid #ccc;
  color: #bfbfbf;
  text-align: left;
  padding: 10px;
  font-size: 20px;
}

.Func-main-text img {
  width: 20px;
}

.Func-main-text-icon {
  position: absolute;
  right: 10px;
  top: 10px;
}

.Func-main-text-icon img {
  width: 20px;
}
</style>
