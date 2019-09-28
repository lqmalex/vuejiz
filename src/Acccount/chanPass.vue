<template>
  <div class="Set">
    <div class="toBack">
      <img src="../assets/images/Back.png" @click="goToFrount" />
      <span class="toBack-text">修改手机号</span>
    </div>
    <div class="changeMain">
      <div class="change">
        <input type="text" placeholder="请输入新手机号码" v-model="phoneNumber" />
        <input type="password" placeholder="请输入密码" v-model="Password" />
        <div class="flex">
          <img :src="imgUrl" alt />
          <input type="text" v-model="imgCode" placeholder="请输入图片验证码" />
        </div>
        <div class="flex">
          <input class="rig" type="text" placeholder="请输入验证码" v-model="Code" />
          <button @click="getCode">获取验证码</button>
        </div>

        <button class="but" @click="changePass">修改手机号</button>
      </div>
    </div>
  </div>
</template>

<script>
import Qs from "qs";
import { Cell, CellGroup, Button, Dialog, Toast } from "vant";
import Api from "../Api";
import { reject } from "q";
export default {
  data() {
    return {
      phoneNumber: "",
      Password: "",
      Code: "",
      imgCode: "",
      imgUrl: "",
      imgKey: "",
      Type: false
    };
  },
  components: {
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
     * 获取验证码
     */
    getCode() {
      if (this.phoneNumber == "") {
        Toast("手机号码不能为空");
        return;
      }

      let data = Qs.stringify({
        mobile: this.phoneNumber,
        captcha_code: this.imgCode,
        captcha_key: this.imgKey
      });
      this.axios
        .post(Api.Verify, data, {
          headers: { "Content-Type": "application/x-www-form-urlencoded" }
        })
        .then(data => {
          if (data.data.status) {
            Dialog.alert({
              title: "提示",
              message: `${data.data.data}`
            });
          } else {
            if (data.data.data == "INVALID_CAPTCHA") {
              this.getImg();
              Toast("请输入图片验证码");
            } else {
              Toast(`${data.data.data}`);
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    /**
     * 获取图片验证码
     */
    getImg() {
      return new Promise((resolve, reject) => {
        this.axios.get(Api.GetImg).then(data => {
          resolve(
            (this.imgKey = data.data.data.key),
            (this.imgUrl = data.data.data.url)
          );
        });
      });
    },
    /**
     * 修改手机号
     */
    changePass() {
      if (this.phoneNumber == "") {
        Toast("手机号码不能为空");
        return;
      }

      if (this.Password == "" || this.Password.length < 6) {
        Toast("密码格式不正确");
        return;
      }

      if (this.Code == "") {
        Toast("验证码不能为空");
        return;
      }

      let Token = localStorage.getItem("token");
      let data = Qs.stringify({
        mobile: this.phoneNumber,
        password: this.Password,
        verify: this.Code
      });
      this.axios
        .post(Api.UpdateMobile + Token, data, {
          headers: { "Content-Type": "application/x-www-form-urlencoded" }
        })
        .then(data => {
          if (data.data.status) {
            this.$router.push("/login");
          } else {
            Dialog.alert({
              title: "提示",
              message: `${data.data.data}`
            }).then(() => {});
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    Loading(mess, num) {
      Toast.loading({
        mask: true,
        message: mess,
        duration: num
        // closeOnClick: true
      });
    }
  },
  created() {
    this.getImg();
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
    position: relative;

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

  .changeMain {
    margin-top: 15px;
    padding: 0 50px;

    .change {
      input {
        width: 100%;
        height: 35px;
        margin-top: 20px;
        background: #f1f1f1;
        font-size: 18px;
        border: 0;
        border-bottom: 1px solid #ccc;
      }
    }
  }

  .flex {
    display: flex;

    input {
      flex: 1;
    }

    img {
      height: 37px;
      margin-top: 20px;
      margin-right: 5px;
    }

    button {
      flex: 1;
      height: 37px;
      margin-top: 20px;
      background: #50af08;
    }
  }

  .rig {
    margin-right: 5px;
  }

  .but {
    width: 100%;
    height: 37px;
    background: #50af08;
    margin-top: 20px;
  }

  button {
    border: 0;
    color: #fff;
  }
}
</style>
