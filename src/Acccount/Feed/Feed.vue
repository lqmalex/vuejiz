<template>
  <div class="Set">
    <div class="toBack">
      <img src="../../assets/images/Back.png" @click="goToFrount" />
      <span class="toBack-text">意见反馈</span>
    </div>
    <div class="pad">
      <div class="text">问题和意见</div>
      <textarea placeholder="请简要描述您的问题和意见" v-model="message"></textarea>
      <div class="text">联系电话或邮箱</div>
      <input type="text" placeholder="选填，便于我们与您联系" v-model="info" />
    </div>

    <div class="but-box">
      <button class="but" @click="Sub">提交意见</button>
    </div>
  </div>
</template>

<script>
import Swipe from "../../components/BookSwipe";
import { Cell, CellGroup, Button, Dialog, Toast } from "vant";
import { resolve } from "url";
import { reject } from "q";
import Qs from "qs";
import Api from "../../Api";
export default {
  data() {
    return {
      message: "",
      info: "",
      Token: ""
    };
  },
  components: {
    Swipe,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Button.name]: Button,
    [Dialog.name]: Dialog,
    [Toast.name]: Toast
  },
  methods: {
    /**
     *返回上一页
     */
    goToFrount() {
      this.$router.go(-1);
    },
    /**
     * 获取Token
     */
    getInfo() {
      return new Promise((resolve, reject) => {
        resolve((this.Token = localStorage.getItem("token")));
      });
    },
    /**
     * 提交
     */
    Sub() {
      let data = Qs.stringify({
        content: this.message,
        contact: this.info
      });

      this.axios.post(Api.Feed + this.Token, data).then(data => {
        if (data.data.status == true) {
          Dialog.alert({
            title: "提示",
            message: `${data.data.data}`
          }).then(() => {});
        } else {
          Dialog.alert({
            title: "提示",
            message: `${data.data.data}`
          }).then(() => {});
        }
      });
    }
  },
  created() {
    this.getInfo().then(() => {});
    Toast.clear();
  }
};
</script>

<style scoped lang="less">
.Set {
  width: 100%;
  position: relative;

  .toBack {
    height: 35px;
    background: #50af08;
    text-align: left;
    padding: 10px;
    margin-bottom: 5px;
    position: relative;

    img {
      height: 100%;
    }
  }

  .toBack-text {
    position: absolute;
    left: 38%;
    color: #fff;
    top: 25%;
    font-size: 18px;
  }

  .but-box {
    padding: 0 10px;
    margin-top: 15px;

    .but {
      width: 100%;
      height: 37px;
      color: #fff;
      background: #50af08;
    }
  }

  .text {
    text-align: left;
    padding: 0 10px;
    color: #969696;
    font-size: 14px;
  }

  textarea {
    width: 99%;
    height: 60px;
    background: #f1f1f1;
    border: 0;
    border-bottom: 1px solid #ccc;
  }

  input {
    width: 99%;
    height: 35px;
    background: #f1f1f1;
    border: 0;
    border-bottom: 1px solid #ccc;
  }

  .pad {
    padding: 0 10px;
  }

  button {
    border: 0;
  }
}
</style>
