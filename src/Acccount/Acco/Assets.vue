<template>
  <div class="Set">
    <div class="toBack">
      <img src="../../assets/images/Back.png" @click="goToFrount" />
      <span class="toBack-text">资产账户管理</span>
    </div>
    <Swipe v-for="(item,index) in Assets" :did="item.id" :key="index">
      <van-cell slot="swipe" :border="false" :title="item.name" :value="item.balance" />
      <div slot="func">
        <van-button style="width:60px" square @click="gotoEdit(item.id)" type="primary" text="编辑" />
        <van-button style="width:60px" square @click="del(item.id)" type="danger" text="删除" />
      </div>
    </Swipe>
    <div class="but-box">
      <button class="but" @click="goToAdd">添加资产账户</button>
    </div>
    <van-popup v-model="show" overlay-class="overlay-one">
      <!-- <div class="text">账户信息保存后仅备注可修改</div> -->
      <div class="Show-text">添加资产账户</div>
      <div class="but-inp">
        <input type="text" placeholder="请输入账户名称" v-model="name" />
        <div class="flex">
          <input type="text" placeholder="账户余额:0.00" v-model="initial" />
          <select v-model="num">
            <option v-for="(item,index) in type" :key="index" :value="index + 1">{{item}}</option>
          </select>
        </div>
        <textarea v-model="remark" placeholder="请输入备注..."></textarea>
        <button class="AddBut" @click="preser">保存</button>
      </div>
    </van-popup>
    <van-popup v-model="show2" overlay-class="overlay-one">
      <div class="Show-text">编辑账户</div>
      <div class="Edit">
        <div class="flex">
          <input type="text" v-model="name2" />
          <select v-model="num2">
            <option v-for="(item,index) in type" :key="index" :value="index + 1">{{item}}</option>
          </select>
        </div>
        <textarea v-model="remark2" placeholder="请输入备注..."></textarea>
        <button class="AddBut" @click="setEdit">保存</button>
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
      show: false,
      show2: false,
      name: "",
      name2: "",
      initial: "",
      remark: "",
      remark2: "",
      type: ["现金", "银行", "支付平台", "其他"],
      num: 1,
      num2: 1,
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
     * API接口
     */
    getApi() {
      return new Promise((resolve, reject) => {
        let Token = localStorage.getItem("token");
        this.axios.get(Api.Account + Token).then(data => {
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
          let token = localStorage.getItem("token");

          this.axios
            .post(Api.DelAcc.Url1 + id + Api.DelAcc.Url2 + token)
            .then(data => {
              if (data.data.status) {
                this.Loading("网络正在拼命中...", 0.5);
                this.reload();
                // _this.path[5].style.display = "none";
              } else {
                this.Loading("网络正在拼命中...", 0.1);
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
    preser() {
      this.Loading("网络正在拼命奔跑中...", 0);
      let data = Qs.stringify({
        name: this.name,
        type: this.num,
        initial_balance: this.initial,
        remark: this.remark
      });
      let token = localStorage.getItem("token");
      this.axios
        .post(Api.AccAdd + token, data)
        .then(data => {
          if (data.data.status) {
            this.Loading("网络正在拼命奔跑中...", 0.5);
            this.reload();
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    setEdit() {
      this.Loading("网络正在拼命奔跑中...", 0);
      let id = this.Eid;
      let Token = localStorage.getItem("token");

      let data = Qs.stringify({
        name: this.name2,
        type: this.num2,
        remark: this.remark2
      });

      this.axios
        .post(Api.AccEdit.Url1 + id + Api.AccEdit.Url2 + Token, data)
        .then(data => {
          if (data.data.status) {
            this.Loading("网络正在拼命奔跑中...", 0.5);
            this.reload();
          }
        });
    },
    /**
     * 跳转至添加账户
     */
    goToAdd() {
      this.show = true;
      // this.$router.push("/AccAdd");
    },
    /**
     * 跳转至编辑页
     */
    gotoEdit(id) {
      this.Eid = id;
      this.Assets.forEach((item, index) => {
        if (item.id == id) {
          this.name2 = item.name;
          this.remark2 = item.remark;
          this.num2 = item.type;
        }
      });
      this.show2 = true;
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
    this.getApi().then(() => {
      this.Loading("加载中...", 0.5);
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
    margin-bottom: 15px;
    border: 0;
    border-bottom: 1px solid #ccc;
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
      width: 100%;
      font-size: 16px;
      border: 0;
      border-bottom: 1px solid #ccc;
    }

    select {
      flex: 1;
      height: 35px;
      width: 100%;
      color: #848484;
      border: 0;
    }
  }

  .AddBut {
    width: 100%;
    height: 37px;
    color: #fff;
    background: #50af08;
  }

  .van-popup {
    width: 80%;
    padding: 30px 20px;
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
