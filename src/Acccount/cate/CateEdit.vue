<template>
  <div class="Set">
    <div class="toBack">
      <img src="../../assets/images/Back.png" @click="goToFrount" />
      <span class="toBack-text">修改{{Yname}}类别</span>
    </div>
    <div class="text">请输入新的{{Yname}}类别名称</div>
    <div class="Edit">
      <input type="text" placeholder="请输入名称" v-model="name" />
      <button class="btn" @click="setEdit">保存</button>
    </div>
  </div>
</template>

<script>
import Qs from "qs";
import Api from "../../Api";
export default {
  components: {},
  data() {
    return {
      Assets: [],
      Eid: "",
      Type: "",
      Yname: "",
      name: "",
      Cate: []
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
    /**
     * 获取编辑的账户对应的id与对应的类别
     */
    getId() {
      this.Eid = localStorage.getItem("CateEdit");
      this.Type = localStorage.getItem("cate");
    },
    /**
     * 获取所有的类别
     */
    getApi() {
      let token = localStorage.getItem("token");
      this.axios
        .get(Api.Cate + token, {
          params: {
            type: this.Type
          }
        })
        .then(data => {
          this.Assets = data.data.data;
          //出现异步了，所以才在这里调用
          this.getAssName();
        });
    },
    /**
     * 得到对应的名称
     */
    getAssName() {
      this.Assets.forEach((item, index) => {
        this.Cate.push({
          id: item.id,
          name: item.name
        });
      });
      this.Cate.forEach((item, index) => {
        if (item.id == this.Eid) {
          this.name = item.name;
        }
      });
    },
    setName() {
      this.Yname = this.Type == "1" ? "收入" : "支出";
    },
    /**
     * 执行编辑
     */
    setEdit() {
      let id = this.Eid;
      let Token = localStorage.getItem("token");

      let data = Qs.stringify({
        name: this.name
      });

      this.axios
        .post(Api.CateEdit.Url1 + id + Api.CateEdit.Url2 + Token, data)
        .then(data => {
          if (data.data.status == true) {
            this.$router.push("/Cate");
          }
        });
    }
  },
  created() {
    this.getId();
    this.setName();
    this.getApi();
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

.text {
  text-align: left;
  padding: 0 10px;
  color: #9c9c9c;
  font-size: 14px;
  margin-bottom: 10px;
}

input {
  width: 100%;
  height: 35px;
  margin-bottom: 10px;
  background: rgba(141, 126, 126, 0.2);
}

.btn {
  width: 100%;
  height: 37px;
  color: #fff;
  background: #50af08;
}
</style>
