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
import { Cell, CellGroup, Button, Dialog } from "vant";
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
    [Dialog.name]: Dialog
  },
  methods: {
    /**
     *返回上一页
     */
    goToFrount() {
      this.$router.go(-1);
    },
    changePass() {
      let Token = localStorage.getItem("token");
      let data = Qs.stringify({
        password: this.phoneNumber,
        new_password: this.Password
      });

      this.axios
        .post(`/api/user/password?token=${Token}`, data, {
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
