<template>
  <div class="Set">
    <div class="toBack">
      <img src="../assets/images/Back.png" @click="goToFrount" />
      <span class="toBack-text">修改密码</span>
    </div>
    <div class="changeMain">
      <div class="change">
        <input type="password" placeholder="请输入旧密码" v-model="phoneNumber" />
        <input type="password" placeholder="请输入新密码" v-model="Password" />
        <button class="but" @click="changePass">修改密码</button>
      </div>
    </div>
  </div>
</template>

<script>
import Qs from "qs";
import { Cell, CellGroup, Button, Dialog, Toast } from "vant";
import Api from "../Api";
export default {
  data() {
    return {
      phoneNumber: "",
      Password: ""
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
    changePass() {
      if (this.phoneNumber == "" || this.phoneNumber.length < 6) {
        Toast("旧密码格式不正确");
        return;
      }

      if (this.new_password == "" || this.new_password.length < 6) {
        Toast("新密码格式不正确");
        return;
      }

      let Token = localStorage.getItem("token");
      let data = Qs.stringify({
        password: this.phoneNumber,
        new_password: this.Password
      });

      this.axios
        .post(Api.UpdatePass + Token, data, {
          headers: { "Content-Type": "application/x-www-form-urlencoded" }
        })
        .then(data => {
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
        border: 0;
        background: #f1f1f1;
        font-size: 18px;
        border-bottom: 1px solid #ccc;
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
      color: #fff;
      border: 0;
    }
  }
}
</style>
