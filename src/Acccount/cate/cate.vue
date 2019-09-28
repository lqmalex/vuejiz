<template>
  <div class="Set">
    <div class="toBack">
      <img src="../../assets/images/Back.png" @click="goToFrount" />
      <span class="toBack-text">{{Yname}}类别管理</span>
    </div>
    <Swipe v-for="(item,index) in Assets" :did="item.id" :key="index">
      <van-cell slot="swipe" :border="false" :title="item.name" :value="item.balance" />
      <div slot="func">
        <van-button style="width:60px" square @click="goToEdit(item.id)" type="primary" text="编辑" />
        <van-button style="width:60px" square @click="del(item.id)" type="danger" text="删除" />
      </div>
    </Swipe>
    <div class="but-box">
      <button class="but" @click="goToAdd">添加{{Yname}}类别</button>
    </div>
    <van-popup v-model="show" overlay-class="overlay-one">
      <div class="Show-text">添加{{Yname}}类别</div>
      <div class="but-inp">
        <input type="text" placeholder="请输入类别名称" v-model="name" />
        <button class="popup-btn" @click="preser">保存</button>
      </div>
    </van-popup>
    <van-popup v-model="show2" overlay-class="overlay-one">
      <div class="Show-text">修改{{Yname}}类别</div>
      <div class="Edit">
        <input type="text" placeholder="请输入名称" v-model="name2" />
        <button class="popup-btn" @click="setEdit">保存</button>
      </div>
    </van-popup>
  </div>
</template>

<script>
import Swipe from "../../components/BookSwipe";
import { Cell, CellGroup, Button, Dialog, Toast, Popup } from "vant";
import Api from "../../Api";
import { resolve } from "url";
import { reject } from "q";
import Qs from "qs";
export default {
  inject: ["reload"],
  data() {
    return {
      Assets: [],
      Type: "",
      Yname: "",
      show: false,
      show2: false,
      name: "",
      name2: "",
      Eid: ""
    };
  },
  components: {
    Swipe,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Button.name]: Button,
    [Dialog.name]: Dialog,
    [Toast.name]: Toast,
    [Popup.name]: Popup
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
      return new Promise((resolve, reject) => {
        let token = localStorage.getItem("token");
        this.axios
          .get(Api.Cate + token, {
            params: {
              type: this.Type
            }
          })
          .then(data => {
            resolve((this.Assets = data.data.data));
          });
      });
    },
    /**
     * 删除
     */
    del(id) {
      Dialog.confirm({
        title: "提示",
        message: "您确定要删除吗?"
      })
        .then(() => {
          this.Loading("网络正在拼命中", 0);
          let token = localStorage.getItem("token");
          this.axios
            .post(Api.CateDel.Url1 + id + Api.CateDel.Url2 + token)
            .then(data => {
              if (data.data.status == true) {
                this.Loading("网络正在拼命中", 0.3);
                this.reload();
              } else {
                this.Loading("网络正在拼命中", 0.1);
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
    preser() {
      this.Loading("正在保存...", 0);
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
            this.Loading("正在保存...", 0.1);
            this.reload();
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    setEdit() {
      this.Loading("网络正在拼命中...", 0);
      let id = this.Eid;
      let Token = localStorage.getItem("token");

      let data = Qs.stringify({
        name: this.name2
      });

      this.axios
        .post(Api.CateEdit.Url1 + id + Api.CateEdit.Url2 + Token, data)
        .then(data => {
          if (data.data.status == true) {
            this.Loading("网络正在拼命中...", 0.1);
            this.reload();
          }
        });
    },
    /**
     * 跳转到添加页面
     */
    goToAdd() {
      this.show = true;
    },
    /**
     * 跳转到编辑页
     */
    goToEdit(id) {
      this.Eid = id;
      this.Assets.forEach((item, index) => {
        if (item.id == id) {
          this.name2 = item.name;
        }
      });
      this.show2 = true;
    },
    Loading(mess, num) {
      Toast.loading({
        mask: true,
        message: mess,
        duration: num
      });
    }
  },
  created() {
    this.Loading("加载中...", 0);
    this.getInfo();
    this.getApi().then(() => {
      this.Loading("加载中...", 0.5);
    });
    this.setName();
  }
};
</script>

<style scoped lang="less">
.Set {
  width: 100%;
  position: relative;

  .Show-text {
    font-size: 14px;
    color: #969696;
    margin-bottom: 5px;
  }

  .toBack {
    height: 35px;
    background: #50af08;
    text-align: left;
    padding: 10px;
    margin-bottom: 5px;
    position: relative;

    .toBack-text {
      position: absolute;
      left: 38%;
      color: #fff;
      top: 25%;
      font-size: 18px;
    }

    img {
      height: 100%;
    }
  }

  .but-box {
    padding: 0 10px;
    margin-top: 15px;

    .but {
      width: 100%;
      height: 37px;
      color: #fff;
      background: #50af08;
    }
  }

  input {
    width: 100%;
    height: 35px;
    font-size: 16px;
    margin-bottom: 10px;
    border: 0;
    color: #323233;
    border-bottom: 1px solid #ccc;
  }

  .flex {
    display: flex;
    margin-bottom: 10px;

    input {
      flex: 1;
      margin-right: 5px;
      height: 35px;
      font-size: 16px;
      background: rgba(117, 117, 117, 0.3);
      border: 0;
    }

    select {
      flex: 1;
      height: 37px;
      font-size: 16px;
      background: rgba(117, 117, 117, 0.3);
      color: #848484;
      border: 0;
    }
  }

  .but-inp {
    padding: 0 20px;
  }

  .popup-btn {
    width: 100%;
    height: 37px;
    color: #fff;
    background: #50af08;
  }

  .van-popup {
    width: 80%;
    padding: 25px 20px;
    border-radius: 9px;
  }

  .van-cell__title {
    text-align: left;
    padding-left: 25px;
    padding: 0 !important;
  }

  .van-swipe-cell__right > div {
    height: 100%;
  }

  button {
    border: 0;
  }
}
</style>
