<template>
  <div id="Req">
    <div class="Login-text">手机号注册</div>
    <input class="name" placeholder="请输入昵称" v-model="nickname" type="text" name="nickname" />
    <input type="password" placeholder="请输入密码" v-model="pass" name="password" />
    <input type="text" placeholder="请输入手机号" name="mobile" v-model="phoneNumber" />
    <input type="text" name="verify" v-model="phoneCode" placeholder="请输入手机验证码" />
    <div class="req-img">
      <img :src="imgUrl" alt />
      <input type="text" placeholder="请输入图片验证码" v-model="imgCode" />
    </div>
    <br />
    <button class="butImgCode" @click="getCode">获取手机验证码</button>
    <button class="butImgCode two" @click="ReqCode">注册</button>
  </div>
</template>

<script>
import Qs from "qs";
import { Cell, CellGroup, Button, Dialog, Toast } from "vant";
import Api from "../../Api";
export default {
  data() {
    return {
      phoneNumber: "",
      imgKey: "",
      imgUrl: "",
      imgCode: "",
      phoneCode: "",
      pass: "",
      nickname: "",
      Dis: false
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
    getCode() {
      if (this.phoneNumber == "") {
        Toast("手机号码不能为空");
        return;
      }
      if (this.imgCode == "") {
        Toast("图片验证码不能为空");
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
            //正则匹配获取验证码
            Dialog.alert({
              title: "提示",
              message: `${data.data.data}`
            });
          } else {
            this.getImg();
            Toast("请先输入完图片验证码后再重新获取验证码");
            this.Dis = true;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    getImg() {
      this.axios.get(Api.GetImg).then(data => {
        this.imgKey = data.data.data.key;
        this.imgUrl = data.data.data.url;
      });
    },
    ReqCode() {
      if (this.phoneNumber == "") {
        Toast("手机号码不能为空");
        return;
      }
      if (this.phoneCode == "") {
        Toast("请输入手机验证码");
        return;
      }
      if (this.pass == "") {
        Toast("密码不能为空");
        return;
      } else {
        if (this.pass.length < 6) {
          Toast("密码长度不为少于6位");
          return;
        }
      }
      if (this.nickname == "") {
        Toast("昵称不能为空");
        return;
      }
      let data = Qs.stringify({
        mobile: this.phoneNumber,
        verify: this.phoneCode,
        password: this.pass,
        nickname: this.nickname
      });
      this.axios
        .post(Api.Reg, data, {
          headers: { "Content-Type": "application/x-www-form-urlencoded" }
        })
        .then(data => {
          if (data.data.status) {
            let TimeNum = 3;

            const toast = Toast.loading({
              duration: 0,
              forbidClick: true,
              message: "登录成功 3 秒"
            });

            let timer = setInterval(() => {
              TimeNum--;
              if (TimeNum) {
                toast.message = `登录成功 ${TimeNum} 秒`;
              } else {
                clearInterval(timer);
                Toast.clear();
                //存储localStorage
                let token = data.data.data.token;
                localStorage.setItem("token", token);
                this.$router.push("/");
              }
            }, 1000);
          } else {
            Dialog.alert({
              title: "提示",
              message: `${data.data.data}`
            }).then(() => {
              //
            });
            // this.num += 1;
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {
    Toast.clear();
    this.getImg();
  }
};
</script>

<style scoped lang="less">
#Req {
  width: 300px;
  margin: 0 auto;

  input {
    width: 100%;
    height: 35px;
    margin-top: 20px;
    font-size: 18px;
    border-bottom: 1px solid #c7c1c1;
  }
}

.Login-text {
  font-size: 25px;
  text-align: left;
}

.req-img {
  overflow: hidden;
  display: flex;

  img {
    height: 37px;
    padding-top: 21px;
    margin-right: 15px;
  }

  input {
    flex: 1;
  }
}

.butImgCode {
  width: 100%;
  height: 40px;
  color: #ffffff;
  margin-top: 10px;
  background: #4ad619;
}

.two {
  margin-top: 15px;
}

input,
button {
  border: 0;
}

button {
  border-radius: 9px !important;
}
</style>
