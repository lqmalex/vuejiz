<template>
  <div id="Login">
    <div class="Login-text">手机号登录</div>
    <input type="text" placeholder="请输入手机号" name="mobile" v-model="phoneNumber" />
    <input type="password" placeholder="请输入密码" v-model="pass" name="password" />
    <div class="req-img" v-show="Dis">
      <img :src="imgUrl" alt />
      <input type="text" placeholder="请输入图片验证码" v-model="imgCode" />
    </div>
    <br />
    <button class="butImgCode two" @click="LoginCode">登录</button>
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
      pass: "",
      imgKey: "",
      imgCode: "",
      imgUrl: "",
      Dis: false,
      num: 0
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
    getImg() {
      this.axios.get(Api.GetImg).then(data => {
        this.imgKey = data.data.data.key;
        this.imgUrl = data.data.data.url;
      });
    },
    LoginCode() {
      if (this.num >= 5) {
        this.getImg();
        this.Dis = true;
        if (this.imgCode == "") {
          Toast("请输入图片验证码重试");
          return;
        }
      }

      if (this.phoneNumber == "") {
        Toast("手机号码不能为空");
        return;
      }
      if (this.pass == "") {
        Toast("密码不能为空");
        return;
      } else {
        if (this.pass.length < 6) {
          Toast("密码长度不能少于6位");
          return;
        }
      }

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
            Toast(`${data.data.data}`);
            this.num += 1;
          }
        })
        .catch(err => {
          // console.log(err);
        });
    }
  },
  created() {
    // this.getImg();
    Toast.clear();
  }
};
</script>

<style scoped lang="less">
#Login {
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

.Login-text {
  font-size: 25px;
  text-align: left;
}

.butImgCode {
  width: 100%;
  height: 40px;
  background: #4ad619;
  color: #ffffff;
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
