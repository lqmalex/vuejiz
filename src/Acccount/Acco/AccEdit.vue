<template>
  <div class="Set">
    <div class="toBack">
      <img src="../../assets/images/Back.png" @click="goToFrount" />
      <span class="toBack-text">修改资产账户</span>
    </div>
    <div class="Edit">
      <div class="flex">
        <input type="text" v-model="name" />
        <select v-model="num">
          <option v-for="(item,index) in type" :key="index" :value="index + 1">{{item}}</option>
        </select>
      </div>
      <textarea v-model="remark" placeholder="请输入备注..."></textarea>
      <button class="btn" @click="setEdit">保存</button>
    </div>
  </div>
</template>

<script>
import Qs from "qs";
export default {
  components: {},
  data() {
    return {
      Eid: "",
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
     * 获取编辑的账户对应的id
     */
    getId() {
      this.Eid = localStorage.getItem("Eid");
    },
    /**
     * 获取编辑的账户的数据
     */
    getInfo() {
      let id = this.Eid;
      let Token = localStorage.getItem("token");
      this.axios
        .get(`api/account/detail?id=${id}&token=${Token}`)
        .then(data => {
          this.num = data.data.data.type;
          this.name = data.data.data.name;
          this.remark = data.data.data.remark;
        });
    },
    /**
     * 执行编辑
     */
    setEdit() {
      let id = this.Eid;
      let Token = localStorage.getItem("token");

      let data = Qs.stringify({
        name: this.name,
        type: this.num,
        remark: this.remarkm
      });

      this.axios
        .post(`api/account/update?id=${id}&token=${Token}`, data)
        .then(data => {
          //   console.log(data);
          if (data.data.status == true) {
            this.$router.push("/Assets");
          }
        });
    }
  },
  created() {
    this.getId();
    this.getInfo();
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

.Edit {
  padding: 0 20px;
}

textarea {
  width: 100%;
  height: 60px;
  font-size: 16px;
  background: rgba(141, 126, 126, 0.2);
  margin-bottom: 15px;
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

.btn {
  width: 100%;
  height: 37px;
  color: #fff;
  background: #50af08;
}
</style>
