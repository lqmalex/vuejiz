<template>
  <div class="Set">
    <div class="toBack">
      <img src="../../assets/images/Back.png" @click="goToFrount" />
      <span class="toBack-text">添加记账成员</span>
    </div>
    <div class="but-inp">
      <input type="text" placeholder="请输入记账成员手机" v-model="name" />
      <button @click="preser">保存</button>
    </div>
  </div>
</template>

<script>
import Qs from "qs";
import { Cell, CellGroup, Button, Dialog } from "vant";
import Api from "../../Api";
export default {
  data() {
    return {
      name: "",
      Id: ""
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
      this.$router.push("/Member");
    },
    /**
     * 获取账簿ID
     */
    getId() {
      this.Id = localStorage.getItem("Mid");
    },
    /**
     * 保存
     */
    preser() {
      let data = Qs.stringify({
        book_id: this.Id,
        mobile: this.name
      });
      let token = localStorage.getItem("token");
      this.axios
        .post(Api.MemberAdd + token, data)
        .then(data => {
          //   console.log(data);
          if (data.data.status == true) {
            this.$router.push("/Member");
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
    this.getId();
  }
};
</script>

<style scoped>
.Set {
  width: 100%;
  position: relative;
}

.toBack {
  height: 35px;
  background: #50af08;
  text-align: left;
  padding: 10px;
  margin-bottom: 5px;
  position: relative;
}

.toBack-text {
  position: absolute;
  left: 37%;
  color: #fff;
  top: 25%;
  font-size: 18px;
}

.toBack > img {
  height: 100%;
}

.text {
  text-align: left;
  padding: 0 10px;
  color: #9c9c9c;
  font-size: 14px;
  margin-bottom: 10px;
}

textarea {
  width: 100%;
  height: 60px;
  font-size: 16px;
  background: rgba(141, 126, 126, 0.2);
  margin-bottom: 15px;
}

.but-inp > input {
  width: 100%;
  height: 35px;
  font-size: 16px;
  background: rgba(141, 126, 126, 0.2);
  margin-bottom: 10px;
}

.flex {
  display: flex;
  margin-bottom: 10px;
}

.flex > input {
  flex: 1;
  margin-right: 5px;
  height: 35px;
  font-size: 16px;
  background: rgba(141, 126, 126, 0.2);
}

.flex > select {
  flex: 1;
  height: 37px;
  font-size: 16px;
  background: rgba(141, 126, 126, 0.2);
  color: #848484;
}

.but-inp {
  padding: 0 20px;
}

button {
  width: 100%;
  height: 37px;
  color: #fff;
  background: #50af08;
}
</style>
