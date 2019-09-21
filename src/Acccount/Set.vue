<template>
  <div class="Set">
    <div class="toBack">
      <img src="../assets/images/Back.png" @click="goToFrount" />
      <span class="toBack-text">设置</span>
    </div>
    <Mainr>
      <div slot="mani">
        <div class="Func-main">
          <div class="Func-main-text" @click="goToPass">
            <img src="../assets/images/chanPass.png" /> 修改密码
            <div class="Func-main-text-icon">
              <img src="../assets/images/arrow.png" alt />
            </div>
          </div>
          <div class="Func-main-text" @click="goToPhone">
            <img src="../assets/images/Mobile.png" alt /> 更换手机号
            <div class="Func-main-text-icon">
              <img src="../assets/images/arrow.png" alt />
            </div>
          </div>
          <div class="Func-main-text" @click="goToSetMe">
            <img src="../assets/images/mes.png" alt /> 修改个人信息
            <div class="Func-main-text-icon">
              <img src="../assets/images/arrow.png" alt />
            </div>
          </div>
        </div>
        <div class="SetBut">
          <button @click="SignOut">退出登录</button>
        </div>
      </div>
    </Mainr>
  </div>
</template>

<script>
import Mainr from "../components/Main";
import { Cell, CellGroup, Button, Dialog } from "vant";
export default {
  components: {
    Mainr,
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
     * 退出登录
     */
    SignOut() {
      Dialog.confirm({
        title: "提示",
        message: "您确定要退出吗?"
      })
        .then(() => {
          let Token = localStorage.getItem("token");
          this.axios
            .get("/api/user/logout?token=" + Token + "")
            .then(data => {
              //   console.log(data);
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
        })
        .catch(() => {
          //取消
        });
    },
    goToPass() {
      this.$router.push("/pass");
    },
    goToPhone() {
      this.$router.push("/chan");
    },
    goToSetMe() {
      this.$router.push("/SetMer");
    }
  }
};
</script>

<style scoped>
.Set {
  width: 100%;
}

.toBack {
  height: 35px;
  background: #50af08;
  text-align: left;
  padding: 10px;
  position: relative;
}

.toBack-text {
  position: absolute;
  left: 45%;
  color: #fff;
  top: 25%;
  font-size: 18px;
}

.toBack > img {
  height: 100%;
}

.Func-main {
  margin-top: 15px;
  background: #fff;
  overflow: hidden;
}

.Func-main-text {
  position: relative;
  border-bottom: 1px solid #ccc;
  color: #bfbfbf;
  text-align: left;
  padding: 10px;
  font-size: 20px;
}

.Func-main-text img {
  width: 20px;
}

.Func-main-text-icon {
  position: absolute;
  right: 10px;
  top: 10px;
}

.Func-main-text-icon img {
  width: 20px;
}

.SetBut {
  margin-top: 15px;
  padding: 0 10px;
}

.SetBut button {
  width: 100%;
  color: #fff;
  height: 45px;
  background: #50af08;
}
</style>
