<template>
  <div class="Set">
    <div class="toBack">
      <img src="../../assets/images/Back.png" @click="goToFrount" />
      <span class="toBack-text">资产账户管理</span>
    </div>
    <Swipe v-for="(item,index) in Assets" :did="item.id" :key="index">
      <van-cell slot="swipe" :border="false" :title="item.name" :value="item.balance" />
      <div slot="func">
        <van-button square @click="gotoEdit(item.id)" type="primary" text="编辑" />
        <van-button square @click="del" type="danger" text="删除" />
      </div>
    </Swipe>
    <div class="but-box">
      <button class="but" @click="goToAdd()">添加资产账户</button>
    </div>
  </div>
</template>

<script>
import Swipe from "../../components/BookSwipe";
import { Cell, CellGroup, Button, Dialog } from "vant";
import Api from "../../Api";
export default {
  data() {
    return {
      Assets: []
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
     * API接口
     */
    getApi() {
      let Token = localStorage.getItem("token");
      this.axios.get(Api.Account + Token).then(data => {
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
            .post(Api.DelAcc.Url1 + id + Api.DelAcc.Url2 + token)
            .then(data => {
              if (data.data.status == true) {
                _this.path[5].style.display = "none";
              } else {
                Dialog.alert({
                  message: "删除失败"
                }).then(() => {
                  // on close
                });
              }
            });
        })
        .catch(() => {
          // on cancel
        });
    },
    /**
     * 跳转至添加账户
     */
    goToAdd() {
      this.$router.push("/AccAdd");
    },
    /**
     * 跳转至编辑页
     */
    gotoEdit(id) {
      localStorage.setItem("Eid", id);
      this.$router.push("/AccEdit");
    }
  },
  created() {
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
