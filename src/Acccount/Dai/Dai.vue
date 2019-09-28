<template>
  <div class="Dai">
    <div class="toBack">
      <div class="Back">
        <img src="../../assets/images/Back.png" @click="goToFrount" />
        <span class="toBack-text">待收、付款</span>
      </div>
      <div class="to-flex">
        <router-link to="/Daix/1" @click.native="GoTo">待收款</router-link>
        <router-link to="/Daix/2" @click.native="GoTo">待付款</router-link>
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
import {
  Popup,
  Button,
  Cell,
  CellGroup,
  RadioGroup,
  Radio,
  DatetimePicker,
  Uploader,
  Toast,
  Dialog
} from "vant";
import { resolve } from "url";
import { reject } from "q";
import Qs from "qs";
export default {
  inject: ["reload"],
  data() {
    return {
      Token: ""
    };
  },
  components: {
    [Popup.name]: Popup,
    [Button.name]: Button,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [RadioGroup.name]: RadioGroup,
    [Radio.name]: Radio,
    [DatetimePicker.name]: DatetimePicker,
    [Uploader.name]: Uploader,
    [Toast.name]: Toast,
    [Dialog.name]: Dialog
  },
  methods: {
    /**
     *返回上一页
     */
    goToFrount() {
      this.$router.push("/book");
    },
    /**
     * 获取Token
     */
    getToken() {
      return new Promise((resolve, reject) => {
        resolve((this.Token = localStorage.getItem("token")));
      });
    },
    GoTo() {
      this.reload();
    }
    /**
     *
     */
  },
  created() {
    Toast.clear();
  }
};
</script>

<style scoped lang="less">
.Dai {
  width: 100%;

  .toBack {
    height: 80px;
    background: #50af08;
    text-align: left;
    padding: 10px;
    margin-bottom: 5px;

    img {
      height: 100%;
    }
  }

  .Back {
    height: 35px;
    position: relative;
  }

  .to-flex {
    display: flex;
    margin-top: 26px;

    a {
      flex: 1;
      text-align: center;
      color: #fff;
    }
  }

  .vant-but {
    background: #fff !important;
    border: 0;
    color: #969696 !important;
    flex: 1;
    text-align: right;
    position: relative;
    padding: 0 24px;
  }

  .toBack-text {
    position: absolute;
    left: 40%;
    color: #fff;
    top: 25%;
    font-size: 18px;
  }

  .router-link-exact-active {
    border-bottom: 2px solid #fff;
  }
}
</style>
