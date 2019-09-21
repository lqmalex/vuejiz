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
        <van-button square @click="Switchr" v-if="!item.current" type="primary" text="切换" />
        <van-button square @click="goToEdit" type="warning" text="编辑" />
        <van-button square @click="del" type="danger" text="删除" />
      </div>
    </Swipe>
    <div class="but-box">
      <button @click="goToAdd" class="but">创建新账簿</button>
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
      Token: "",
      Fin: [],
      Fins: [],
      Did: ""
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
        this.axios.get(`api/book?token=${Token}`).then(data => {
          resolve((this.Fin = data.data.data));
        });
      });
    },
    /**
     * 传入Token获取当期账簿
     */
    current(Token) {
      return new Promise((resolve, reject) => {
        this.axios.get(`api/book/get-default?token=${Token}`).then(data => {
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
    del(_this) {
      Dialog.confirm({
        title: "提示",
        message: "您确定要删除吗?"
      })
        .then(() => {
          let id = _this.path[5].attributes[2].nodeValue;

          let data = Qs.stringify({
            book_id: id
          });
          this.axios
            .post(`api/book/delete?token=${this.Token}`, data)
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
     * 切换当前账簿
     */
    Switchr(_this) {
      let id = _this.path[5].attributes[2].nodeValue;
      let data = Qs.stringify({
        book_id: id
      });
      this.axios
        .post(`api/book/set-default?token=${this.Token}`, data)
        .then(data => {
          if (data.data.status == true) {
            //再次调用Promise对应方法实现无刷新切换当前账簿
            // this.getApi(this.Token).then(() => {
            //   this.current(this.Token).then(() => {
            //     this.getCurrent(id).then(() => {});
            //   });
            // });
            //使用以上方法更改插件容易出错
            this.reload();
          }
        });
    },
    /**
     * 跳转到添加页
     */
    goToAdd() {
      this.$router.push("/FinAdd");
    },
    /**
     * 跳转到编辑页
     */
    goToEdit(_this) {
      let id = _this.path[5].attributes[2].nodeValue;
      localStorage.setItem("FinEid", id);
      this.$router.push("/FinEdit");
    }
  },
  created() {
    //使用Promise防止异步
    this.setToken().then(() => {
      this.getApi(this.Token).then(() => {
        this.current(this.Token).then(() => {
          this.getCurrent(this.Did).then(() => {});
        });
      });
    });
  }
};
</script>

<style scoped>
.Set {
  width: 100%;
}

.toBack {
  height: 35px;
  background: #50af08;
  text-align: left;
  padding: 10px;
  position: relative;
}

.toBack-text {
  position: absolute;
  left: 40%;
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
