<template>
  <div class="Set">
    <div class="toBack" style="position: relative;">
      <img src="../assets/images/Back.png" @click="goToFrount" />
      <span class="toBack-text">财务、账簿</span>
    </div>
    <Mainr>
      <div slot="mani">
        <div class="Func-main">
          <div class="Func-main-text" @click="goToAcc">
            <img src="../assets/images/Finance.png" /> 财务
            <div class="Func-main-text-icon">
              <img src="../assets/images/arrow.png" alt />
            </div>
          </div>
          <div class="Func-main-text" @click="gotoFin">
            <img src="../assets/images/Accobook.png" alt /> 账簿
            <div class="Func-main-text-icon">
              <img src="../assets/images/arrow.png" alt />
            </div>
          </div>
        </div>
      </div>
    </Mainr>
  </div>
</template>

<script>
import Qs from "qs";
import Mainr from "../components/Main";
import { Toast } from "vant";
export default {
  components: {
    Mainr
  },
  data() {
    return {};
  },
  methods: {
    /**
     *返回上一页
     */
    goToFrount() {
      this.$router.push("/Me");
    },
    goToAcc() {
      this.$router.push("/Acc");
    },
    gotoFin() {
      this.$router.push("/Fin");
    }
  },
  created() {
    Toast.clear();
  }
};
</script>

<style scoped lang="less">
.Set {
  .toBack {
    height: 35px;
    background: #50af08;
    text-align: left;
    padding: 10px;

    .toBack-text {
      position: absolute;
      left: 40%;
      color: #fff;
      top: 25%;
      font-size: 18px;
    }

    img {
      height: 100%;
    }
  }

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
}
</style>
