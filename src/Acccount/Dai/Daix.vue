<template>
  <div class="Set">
    <div class="text" style="color:#969696" v-show="show">暂无信息</div>
    <div class="swpieTop" style="margin-top:10px">
      <Swpier v-for="(item,index) in typer" :did="item.id" :key="index">
        <div class="SwipeCell" slot="swipe" @click="goToDeta(item.id)">
          <van-cell :border="false" v-if="!item.company_name" title="无" :value="item.paid_money" />
          <van-cell :border="false" v-else :title="item.company_name" :value="item.paid_money" />
          <div class="swipe-img" v-if="item.type == 1">
            <img src="../../assets/images/income.png" alt />
            <div
              style="width: 100px;position: absolute;top: 32px;left: 20px;border: 1px solid #5a8435;border-radius: 21px;"
            >{{item.date}}</div>
          </div>
          <div class="swipe-img" v-else>
            <img src="../../assets/images/expen.png" alt />
            <div
              style="width: 100px;position: absolute;top: 32px;left: 20px;border: 1px solid red;border-radius: 21px;"
            >{{item.date}}</div>
          </div>
        </div>
        <van-button @click="del" style="height:58px" square type="danger" text="删除" slot="func" />
      </Swpier>
    </div>
  </div>
</template>

<script>
import {
  Popup,
  Button,
  Cell,
  CellGroup,
  RadioGroup,
  Radio,
  DatetimePicker,
  Uploader,
  Toast,
  Dialog
} from "vant";
import Swpier from "../../components/BookSwipe";
import { resolve } from "url";
import { reject } from "q";
import Qs from "qs";
import Api from "../../Api";
export default {
  inject: ["reload"],
  data() {
    return {
      Type: "",
      Token: "",
      typer: [],
      show: false
    };
  },
  components: {
    Swpier,
    [Popup.name]: Popup,
    [Button.name]: Button,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [RadioGroup.name]: RadioGroup,
    [Radio.name]: Radio,
    [DatetimePicker.name]: DatetimePicker,
    [Uploader.name]: Uploader,
    [Toast.name]: Toast,
    [Dialog.name]: Dialog
  },
  methods: {
    /**
     * 设置待收款 待付款
     */
    setType() {
      return new Promise((resolve, reject) => {
        resolve((this.Type = this.$route.params.id == 1 ? 1 : 2));
      });
    },
    /**
     * 获取Token
     */
    getToken() {
      return new Promise((resolve, reject) => {
        resolve((this.Token = localStorage.getItem("token")));
      });
    },
    /**
     * 删除
     */
    del(_this) {
      //获取id值
      let id = _this.path[4].attributes[2].nodeValue;
      let Token = localStorage.getItem("token");
      Dialog.confirm({
        title: "提示",
        message: "您确定要删除吗?"
      })
        .then(() => {
          this.axios
            .post(Api.Del.Url1 + id + Api.Del.Url2 + Token)
            .then(data => {
              if (data.data.status == true) {
                _this.path[4].style.display = "none";
                //调用刷新方法
                this.reload();
              }
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(() => {
          //取消
        });
    },
    /**
     * 获取待付款或待收款数据
     */
    getData(Typer, token) {
      return new Promise((resolve, reject) => {
        this.axios
          .get(Api.RecWai + token, {
            params: {
              type: Typer
            }
          })
          .then(data => {
            resolve((this.typer = data.data.data.list));
          });
      });
    },
    /**
     * 遍历填写数据
     */
    setData() {
      return new Promise((resolve, reject) => {
        this.typer.forEach((item, index) => {
          let num = item.total_money - item.paid_money;
          item.company_name =
            item.type == 1
              ? item.company_name + `(待收款${num})`
              : item.company_name + `(待付款${num})`;
        });
      });
    },
    /**
     * 跳转到详情
     */
    goToDeta(id) {
      localStorage.setItem("book_id", id);
      this.$router.push("/DeTa");
    }
  },
  created() {
    this.getToken().then(() => {
      this.setType().then(() => {
        this.getData(this.Type, this.Token).then(() => {
          this.typer.length > 0
            ? (this.setData(), (this.show = false))
            : (this.show = true);
        });
      });
    });
  }
};
</script>

<style scoped>
.SwipeCell {
  height: 58px;
  position: relative;
}
</style>
