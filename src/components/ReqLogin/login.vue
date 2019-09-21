<template>
  <div id="Login">
    <input type="text" placeholder="请输入手机号" name="mobile" v-model="phoneNumber" />
    <input type="password" placeholder="请输入密码" v-model="pass" name="password" />
    <div class="req-img">
      <img :src="imgUrl" alt />
      <input type="text" placeholder="请输入图片验证码" v-model="imgCode" />
    </div>
    <br />
    <button class="butImgCode two" @click="LoginCode">登录</button>
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
      pass: "",
      imgKey: "",
      imgCode: "",
      imgUrl: ""
    };
  },
  components: {
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Button.name]: Button,
    [Dialog.name]: Dialog
  },
  methods: {
    getImg() {
      this.axios.get(Api.GetImg).then(data => {
        this.imgKey = data.data.data.key;
        this.imgUrl = data.data.data.url;
      });
    },
    LoginCode() {
      let data = Qs.stringify({
        mobile: this.phoneNumber,
        password: this.pass,
        captcha_code: this.imgCode,
        captcha_key: this.imgKey
      });
      this.axios
        .post(Api.Login, data, {
          headers: { "Content-Type": "application/x-www-form-urlencoded" }
        })
        .then(data => {
          if (data.data.status == true) {
            this.$router.push("/me");
            //存储localStorage
            let token = data.data.data.token;
            localStorage.setItem("token", token);
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
          // console.log(err);
        });
    }
  },
  created() {
    this.getImg();
  }
};
</script>

<style scoped>
#Login {
  width: 300px;
  margin: 0 auto;
}

#Login input {
  width: 100%;
  height: 35px;
  margin-top: 20px;
  background: rgba(141, 126, 126, 0.4);
  color: #fff;
  font-size: 18px;
}

#Login input::-webkit-input-placeholder {
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
