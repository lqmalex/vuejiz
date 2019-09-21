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
import { Cell, CellGroup, Button, Dialog } from "vant";
import Api from "../Api";
export default {
  data() {
    return {
      phoneNumber: "",
      Password: "",
      Code: "",
      imgCode: "",
      imgUrl: "",
      imgKey: ""
    };
  },
  components: {
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Button.name]: Button,
    [Dialog.name]: Dialog
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
          if (data.data.status == true) {
            this.Code = data.data.data.match(/\d{4}/)[0];
          } else {
            Dialog.alert({
              title: "提示",
              message: `${data.data.data}`
            }).then(() => {});
          }
          // console.log(data);
        })
        .catch(err => {
          console.log(err);
        });
    },
    /**
     * 获取图片验证码
     */
    getImg() {
      this.axios.get(Api.GetImg).then(data => {
        this.imgKey = data.data.data.key;
        this.imgUrl = data.data.data.url;
      });
    },
    /**
     * 修改手机号
     */
    changePass() {
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
          // console.log(data);
          if (data.data.status == true) {
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
    }
  },
  created() {
    this.getImg();
  }
};
</script>

<style scoped>
.toBack {
  height: 35px;
  background: #50af08;
  text-align: left;
  padding: 10px;
  position: relative;
}

.toBack-text {
  position: absolute;
  left: 40%;
  color: #fff;
  top: 25%;
  font-size: 18px;
}

.toBack > img {
  height: 100%;
}

.changeMain {
  margin-top: 15px;
  padding: 0 50px;
}

button {
  color: #fff;
}

.change > input {
  width: 100%;
}

.change input {
  width: 100%;
  height: 35px;
  margin-top: 20px;
  background: rgba(141, 126, 126, 0.4);
  color: #fff;
  font-size: 18px;
}

input::-webkit-input-placeholder {
  color: #fff;
}

.flex {
  display: flex;
}

.flex > input {
  flex: 1;
}

.rig {
  margin-right: 5px;
}

.flex > img {
  height: 37px;
  margin-top: 20px;
  margin-right: 5px;
}

.flex > button {
  flex: 1;
  height: 37px;
  margin-top: 20px;
  background: #50af08;
}

.but {
  width: 100%;
  height: 37px;
  background: #50af08;
  margin-top: 20px;
}
</style>
