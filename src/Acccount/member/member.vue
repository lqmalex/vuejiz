<template>
  <div class="Set">
    <div class="toBack">
      <img src="../../assets/images/Back.png" @click="goToFrount" />
      <span class="toBack-text">记账成员管理</span>
    </div>
    <div v-show="Ashow" class="text">您暂时没有记账成员</div>
    <Swipe v-for="(item,index) in Assets" :did="item.id" :key="index">
      <van-cell slot="swipe" :border="false" :title="item.nickname" />
      <div slot="func">
        <van-button square @click="del" type="danger" text="删除" />
      </div>
    </Swipe>
    <div class="but-box">
      <button class="but" @click="goToAdd">添加记账成员</button>
    </div>
  </div>
</template>

<script>
import Swipe from "../../components/BookSwipe";
import { Cell, CellGroup, Button, Dialog } from "vant";
import { resolve } from "url";
import { reject } from "q";
import Qs from "qs";
export default {
  inject: ["reload"],
  data() {
    return {
      Assets: [],
      Token: "",
      Id: "",
      Ashow: true
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
      // this.$router.go(-1);
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
        this.axios.get(`/api/book/get-default?token=${token}`).then(data => {
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
          .get(`api/member?token=${token}`, {
            params: {
              book_id: id
            }
          })
          .then(data => {
            // console.log(data.data.data);
            resolve((this.Assets = data.data.data));
          });
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

          let data = Qs.stringify({
            book_id: this.Id,
            user_id: id
          });
          this.axios
            .post(`api/member/delete?token=${this.Token}`, data)
            .then(data => {
              if (data.data.status == true) {
                _this.path[5].style.display = "none";
                this.reload();
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
      localStorage.setItem("Mid", this.Id);
      this.$router.push("/MemberAdd");
    }
  },
  created() {
    this.getInfo().then(() => {
      this.setBook(this.Token).then(() => {
        this.getApi(this.Id, this.Token).then(() => {
          this.Ashow = this.Assets.length > 0 ? false : true;
        });
      });
    });
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
.text {
  text-align: left;
  padding: 0 10px;
  color: #969696;
  font-size: 14px;
}
</style>
