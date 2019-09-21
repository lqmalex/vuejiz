<template>
  <div class="Set">
    <div class="toBack">
      <img src="../../assets/images/Back.png" @click="goToFrount" />
      <span class="toBack-text">{{Yname}}类别管理</span>
    </div>
    <Swipe v-for="(item,index) in Assets" :did="item.id" :key="index">
      <van-cell slot="swipe" :border="false" :title="item.name" :value="item.balance" />
      <div slot="func">
        <van-button square @click="goToEdit" type="primary" text="编辑" />
        <van-button square @click="del" type="danger" text="删除" />
      </div>
    </Swipe>
    <div class="but-box">
      <button class="but" @click="goToAdd">添加{{Yname}}类别</button>
    </div>
  </div>
</template>

<script>
import Swipe from "../../components/BookSwipe";
import { Cell, CellGroup, Button, Dialog } from "vant";
export default {
  data() {
    return {
      Assets: [],
      Type: "",
      Yname: ""
    };
  },
  components: {
    Swipe,
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
      this.$router.push("/Acc");
    },
    /**
     *
     */
    getInfo() {
      this.Type = localStorage.getItem("cate");
    },
    /**
     *
     */
    setName() {
      this.Yname = this.Type == "1" ? "收入" : "支出";
    },
    /**
     * API接口
     */
    getApi() {
      let token = localStorage.getItem("token");
      this.axios
        .get(`/api/category?token=${token}`, {
          params: {
            type: this.Type
          }
        })
        .then(data => {
          this.Assets = data.data.data;
        });
    },
    /**
     * 删除
     */
    del(_this) {
      Dialog.confirm({
        title: "提示",
        message: "您确定要删除吗?"
      })
        .then(() => {
          let id = _this.path[5].attributes[2].nodeValue;
          let token = localStorage.getItem("token");
          this.axios
            .post(`api/category/delete?id=${id}&token=${token}`)
            .then(data => {
              if (data.data.status == true) {
                _this.path[5].style.display = "none";
              } else {
                Dialog.alert({
                  title: "标题",
                  message: "删除失败"
                }).then(() => {
                  // on close
                });
              }
            })
            .catch(err => {
              Dialog.alert({
                title: "标题",
                message: "删除失败"
              }).then(() => {
                // on close
              });
            });
        })
        .catch(() => {
          //取消删除
        });
    },
    /**
     * 跳转到添加页面
     */
    goToAdd() {
      this.$router.push("/CateAdd");
    },
    /**
     * 跳转到编辑页
     */
    goToEdit(_this) {
      let id = _this.path[5].attributes[2].nodeValue;
      localStorage.setItem("CateEdit", id);
      this.$router.push("/CateEdit");
    }
  },
  created() {
    this.getInfo();
    this.getApi();
    this.setName();
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
  left: 38%;
  color: #fff;
  top: 25%;
  font-size: 18px;
}

.toBack > img {
  height: 100%;
}

.but-box {
  padding: 0 10px;
  margin-top: 15px;
}

.but-box > .but {
  width: 100%;
  height: 37px;
  color: #fff;
  background: #50af08;
}
</style>
