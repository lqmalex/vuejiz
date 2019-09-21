<template>
  <div class="Set">
    <div class="toBack">
      <img src="../../assets/images/Back.png" @click="goToFrount" />
      <span class="toBack-text">添加资产账户</span>
    </div>
    <div class="text">账户信息保存后仅备注可修改</div>
    <div class="but-inp">
      <input type="text" placeholder="请输入账户名称" v-model="name" />
      <div class="flex">
        <input type="text" placeholder="账户余额:0.00" v-model="initial" />
        <select v-model="num">
          <option v-for="(item,index) in type" :key="index" :value="index + 1">{{item}}</option>
        </select>
      </div>
      <textarea v-model="remark" placeholder="请输入备注..."></textarea>
      <button @click="preser">保存</button>
    </div>
  </div>
</template>

<script>
import Qs from "qs";
export default {
  data() {
    return {
      name: "",
      initial: "",
      remark: "",
      type: ["现金", "银行", "支付平台", "其他"],
      num: 1
    };
  },
  methods: {
    /**
     *返回上一页
     */
    goToFrount() {
      this.$router.push("/Assets");
    },
    /**
     * 保存
     */
    preser() {
      let data = Qs.stringify({
        name: this.name,
        type: this.num,
        initial_balance: this.initial,
        remark: this.remark
      });
      let token = localStorage.getItem("token");
      this.axios
        .post(`api/account/create?token=${token}`, data)
        .then(data => {
          if (data.data.status == true) {
            this.$router.push("/Assets");
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {}
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
