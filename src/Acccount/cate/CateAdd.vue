<template>
  <div class="Set">
    <div class="toBack">
      <img src="../../assets/images/Back.png" @click="goToFrount" />
      <span class="toBack-text">添加{{Yname}}类别</span>
    </div>
    <div class="text">{{Yname}}类别名称</div>
    <div class="but-inp">
      <input type="text" placeholder="请输入类别名称" v-model="name" />
      <button @click="preser">保存</button>
    </div>
  </div>
</template>

<script>
import Qs from "qs";
import Api from "../../Api";
export default {
  data() {
    return {
      Type: "",
      Yname: "",
      name: ""
    };
  },
  methods: {
    /**
     *返回上一页
     */
    goToFrount() {
      // this.$router.go(-1);
      this.$router.push("/Cate");
    },
    getInfo() {
      this.Type = localStorage.getItem("cate");
    },
    getName() {
      this.Yname = this.Type == "1" ? "收入" : "支出";
    },
    /**
     * 保存
     */
    preser() {
      let data = Qs.stringify({
        parent_id: 0,
        type: this.Type,
        name: this.name,
        sort: 10
      });
      let token = localStorage.getItem("token");
      this.axios
        .post(Api.CateAdd + token, data)
        .then(data => {
          if (data.data.status == true) {
            this.$router.push("/Cate");
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {
    this.getInfo();
    this.getName();
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
