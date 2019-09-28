<template>
  <div class="Set">
    <div class="toBack">
      <img src="../../assets/images/Back.png" @click="goToFrount" />
      <span class="toBack-text">账簿管理</span>
    </div>
    <Swipe v-for="(item,index) in Fins" :did="item.id" :key="index">
      <van-cell
        slot="swipe"
        :border="false"
        :title="item.name+' (创建者'+item.user_name+')'"
        :value="item.current"
      />
      <div slot="func">
        <van-button
          style="width:60px"
          square
          @click="Switchr(item.id)"
          v-if="!item.current"
          type="primary"
          text="切换"
        />
        <van-button
          style="width:60px;height: 100%;"
          square
          @click="goToEdit(item.id)"
          type="warning"
          text="编辑"
        />
        <van-button
          style="width:60px;height: 100%;"
          square
          @click="del(item.id)"
          type="danger"
          text="删除"
        />
      </div>
    </Swipe>
    <div class="but-box">
      <button @click="goToAdd" class="but">创建新账簿</button>
    </div>
    <van-popup v-model="show" overlay-class="overlay-one">
      <div class="Show-text">添加账簿</div>
      <div class="but-inp">
        <input type="text" placeholder="请输入账簿名称" v-model="name" />
        <button class="popup-btn" @click="preser">保存</button>
      </div>
    </van-popup>
    <van-popup v-model="show2" overlay-class="overlay-one">
      <div class="Show-text">修改账簿</div>
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
import { resolve } from "url";
import { reject } from "q";
import Qs from "qs";
import Api from "../../Api";
export default {
  inject: ["reload"],
  data() {
    return {
      Token: "",
      Fin: [],
      Fins: [],
      Did: "",
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
      this.$router.push("/acco");
    },
    /**
     * 使用promise获取Token防止异步
     */
    setToken() {
      return new Promise((resolve, reject) => {
        resolve((this.Token = localStorage.getItem("token")));
      });
    },
    /**
     * 将setToken获取到的Token传入获取全部账簿
     */
    getApi(Token) {
      return new Promise((resolve, reject) => {
        this.axios.get(Api.Book + Token).then(data => {
          resolve((this.Fin = data.data.data));
        });
      });
    },
    /**
     * 传入Token获取当期账簿
     */
    current(Token) {
      return new Promise((resolve, reject) => {
        this.axios.get(Api.CurBook + Token).then(data => {
          resolve((this.Did = data.data.data.id));
        });
      });
    },
    /**
     * 当前账簿标记
     */
    getCurrent(Did) {
      return new Promise((resolve, reject) => {
        this.Fin.forEach((item, index) => {
          if (item.id == Did) {
            item.current = "(当前账簿)";
          }
          resolve((this.Fins = this.Fin));
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
            book_id: id
          });
          this.axios
            .post(Api.BookDel + this.Token, data)
            .then(data => {
              if (data.data.status == true) {
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
    /**
     * 切换当前账簿
     */
    Switchr(id) {
      this.Loading("网络正在拼命中...", 0);
      let data = Qs.stringify({
        book_id: id
      });
      this.axios.post(Api.BookSet + this.Token, data).then(data => {
        if (data.data.status) {
          this.reload();
        }
      });
    },
    preser() {
      this.Loading("网络正在拼命奔跑中...", 0);
      let data = Qs.stringify({
        name: this.name
      });
      let token = localStorage.getItem("token");
      this.axios
        .post(Api.BookAdd + token, data)
        .then(data => {
          if (data.data.status) {
            this.Loading("网络正在拼命奔跑中...", 0.5);
            this.reload();
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
    },
    setEdit() {
      this.Loading("网络正在拼命中...", 0);
      let id = this.Eid;
      let data = Qs.stringify({
        book_id: id,
        book_name: this.name2
      });
      this.axios.post(Api.BookEdit + this.Token, data).then(data => {
        if (data.data.status) {
          this.Loading("网络正在拼命中...", 0.3);
          this.reload();
        }
      });
    },
    /**
     * 跳转到添加页
     */
    goToAdd() {
      this.show = true;
      // this.$router.push("/FinAdd");
    },
    /**
     * 跳转到编辑页
     */
    goToEdit(id) {
      this.Eid = id;
      this.Fin.forEach((item, index) => {
        if (item.id == id) {
          this.name2 = item.name;
        }
      });
      this.show2 = true;
      // localStorage.setItem("FinEid", id);
      // this.$router.push("/FinEdit");
    },
    Loading(mess, num) {
      Toast.loading({
        mask: true,
        message: mess,
        duration: num
        // closeOnClick: true
      });
    }
  },
  created() {
    this.Loading("加载中...", 0);
    //使用Promise防止异步
    this.setToken().then(() => {
      this.getApi(this.Token).then(() => {
        this.current(this.Token).then(() => {
          this.getCurrent(this.Did).then(() => {
            this.Loading("加载中...", 0.5);
          });
        });
      });
    });
  }
};
</script>

<style scoped lang="less">
.Set {
  width: 100%;

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
    position: relative;

    .toBack-text {
      position: absolute;
      left: 40%;
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
      border: 0;
      border-bottom: 1px solid #ccc;
    }

    select {
      flex: 1;
      height: 37px;
      font-size: 16px;
      color: #848484;
      border: 0;
    }
  }

  input {
    width: 100%;
    height: 35px;
    margin-bottom: 10px;
    border: 0;
    color: #323233;
    border-bottom: 1px solid #ccc;
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
    color: black;
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
