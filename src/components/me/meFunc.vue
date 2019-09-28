<template>
  <div class="Func">
    <div class="Func-main">
      <div class="Func-main-text" @click="goToMe">
        <img src="../../assets/images/GInv.png" alt /> 记账成员
        <div class="Func-main-text-icon">
          <img src="../../assets/images/arrow.png" alt />
        </div>
      </div>
      <div class="Func-main-text" @click="goToBack">
        <img src="../../assets/images/set.png" alt /> 设置
        <div class="Func-main-text-icon">
          <img src="../../assets/images/arrow.png" alt />
        </div>
      </div>
      <div class="Func-main-text" @click="goToAcc">
        <img src="../../assets/images/Gbook.png" alt /> 财务、账簿设置
        <div class="Func-main-text-icon">
          <img src="../../assets/images/arrow.png" alt />
        </div>
      </div>
    </div>
    <div class="Func-main">
      <div class="Func-main-text" @click="goToFeed">
        <img src="../../assets/images/Gopinion.png" alt /> 意见反馈
        <div class="Func-main-text-icon">
          <img src="../../assets/images/arrow.png" alt />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Cell, CellGroup, Button, Dialog, Toast } from "vant";
export default {
  components: {
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Button.name]: Button,
    [Dialog.name]: Dialog,
    [Toast.name]: Toast
  },
  methods: {
    goToBack() {
      this.$router.push("/set");
    },
    goToAcc() {
      this.$router.push("/acco");
    },
    /**
     * 跳转到记账成员
     */
    goToMe() {
      this.$router.push("/Member");
    },
    goToFeed() {
      this.$router.push("/Feed");
    }
  },
  created() {
    Toast.clear();
  }
};
</script>

<style scoped lang="less">
.Func-main {
  margin-top: 15px;
  background: #fff;
  overflow: hidden;

  .Func-main-text {
    position: relative;
    border-bottom: 1px solid #ccc;
    color: #bfbfbf;
    text-align: left;
    padding: 10px;
    font-size: 20px;

    img {
      width: 20px;
    }

    .Func-main-text-icon {
      position: absolute;
      right: 10px;
      top: 10px;

      img {
        width: 20px;
      }
    }
  }
}
</style>
