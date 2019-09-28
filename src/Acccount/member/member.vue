<template>
  <div class="Set">
    <div class="toBack">
      <img src="../../assets/images/Back.png" @click="goToFrount" />
      <span class="toBack-text">记账成员管理</span>
    </div>
    <div v-show="Ashow" class="text">{{Tstr}}</div>
    <Swipe v-for="(item,index) in Assets" :did="item.id" :key="index">
      <van-cell slot="swipe" :border="false" :title="item.nickname" />
      <div slot="func">
        <van-button square @click="del(item.id)" type="danger" text="删除" />
      </div>
    </Swipe>
    <div class="but-box">
      <button class="but" @click="AddShow">添加记账成员</button>
    </div>
    <van-popup v-model="show" overlay-class="overlay-one">
      <div class="Show-text">添加记账成员</div>
      <div class="but-inp">
        <input type="text" placeholder="请输入记账成员手机" v-model="name" />
        <button class="showBut" @click="preser">保存</button>
      </div>
    </van-popup>
  </div>
</template>

<script>
import Swipe from "../../components/BookSwipe";
import { Cell, CellGroup, Button, Dialog, Toast, Popup } from "vant";
import { resolve } from "url";
import { reject } from "q";
import Qs from "qs";
import Api from "../../Api";
export default {
  inject: ["reload"],
  data() {
    return {
      Assets: [],
      Token: "",
      Id: "",
      Ashow: true,
      show: false,
      name: "",
      Tstr: "您暂时没有记账成员"
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
      this.$router.push("/me");
    },
    /**
     * 获取Token
     */
    getInfo() {
      return new Promise((resolve, reject) => {
        resolve((this.Token = localStorage.getItem("token")));
      });
    },
    /**
     * 获取账簿id
     */
    setBook(token) {
      return new Promise((resolve, reject) => {
        this.axios.get(Api.CurBook + token).then(data => {
          resolve((this.Id = data.data.data.id));
        });
      });
    },
    /**
     * 获取成员列表
     */
    getApi(id, token) {
      return new Promise((resolve, reject) => {
        this.axios
          .get(Api.MemberList + token, {
            params: {
              book_id: id
            }
          })
          .then(data => {
            if (!data.data.status) {
              resolve(
                (this.Assets = this.Assets),
                (this.Tstr = `${data.data.data}`)
              );
              return;
            }
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
          this.Loading("网络正在拼命中...", 0);

          let data = Qs.stringify({
            book_id: this.Id,
            user_id: id
          });
          this.axios
            .post(Api.MemberDel + this.Token, data)
            .then(data => {
              if (data.data.status) {
                this.Loading("网络正在拼命中...", 0.5);
                this.reload();
              } else {
                this.Loading("网络正在拼命中...", 0.1);
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
    Loading(mess, num) {
      Toast.loading({
        mask: true,
        message: mess,
        duration: num
        // closeOnClick: true
      });
    },
    /**
     * 添加
     */
    preser() {
      this.Loading("网络正在拼命奔跑中...", 0);
      let data = Qs.stringify({
        book_id: this.Id,
        mobile: this.name
      });
      let token = localStorage.getItem("token");
      this.axios
        .post(Api.MemberAdd + token, data)
        .then(data => {
          if (data.data.status) {
            this.Loading("网络正在拼命奔跑中...", 0.3);
            this.reload();
          } else {
            this.Loading("网络正在拼命奔跑中...", 0.1);
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
    },
    AddShow() {
      this.show = true;
    }
  },
  created() {
    this.Loading("加载中...", 0);
    this.getInfo().then(() => {
      this.setBook(this.Token).then(() => {
        this.getApi(this.Id, this.Token).then(() => {
          this.Loading("加载中...", 0.5);
          this.Ashow = this.Assets.length > 0 ? false : true;
        });
      });
    });
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

  .van-popup {
    width: 80%;
    padding: 28px 0;
    border-radius: 9px;
  }

  .text {
    text-align: left;
    padding: 0 10px;
    color: #969696;
    font-size: 14px;
  }

  .but-inp {
    padding: 0 20px;

    input {
      width: 100%;
      height: 35px;
      font-size: 16px;
      margin-bottom: 10px;
      border: 0;
      border-bottom: 1px solid #ccc;
    }
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
      background: rgba(141, 126, 126, 0.2);
      color: #848484;
    }
  }

  .showBut {
    width: 100%;
    height: 37px;
    color: #fff;
    background: #50af08;
  }

  button {
    border: 0;
  }
}
</style>
