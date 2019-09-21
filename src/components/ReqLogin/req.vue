<template>
  <div id="Req">
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
import { Cell, CellGroup, Button, Dialog } from "vant";
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
      nickname: ""
    };
  },
  components: {
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Button.name]: Button,
    [Dialog.name]: Dialog
  },
  methods: {
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
          //正则匹配获取验证码
          let str = data.data.data.match(/\d{4}/)[0];
          this.phoneCode = str;
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
          if (data.data.status == true) {
            this.$router.push("/login");
          } else {
            Dialog.alert({
              title: "提示",
              message: `${data.data.data}`
            }).then(() => {
              //
            });
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
#Req {
  width: 300px;
  margin: 0 auto;
}

#Req input {
  width: 100%;
  height: 35px;
  margin-top: 20px;
  background: rgba(141, 126, 126, 0.4);
  color: #fff;
  font-size: 18px;
}

#Req input::-webkit-input-placeholder {
  color: #fff;
}

.req-img {
  overflow: hidden;
  display: flex;
}

.req-img img {
  height: 37px;
  padding-top: 21px;
  margin-right: 15px;
}

.req-img input {
  flex: 1;
}

.butImgCode {
  width: 100%;
  height: 40px;
  background: rgba(25, 255, 234, 0.4);
  color: #ffffff;
}

.two {
  margin-top: 15px;
}
</style>
