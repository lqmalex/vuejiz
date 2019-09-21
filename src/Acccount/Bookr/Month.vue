<template>
  <div id="book">
    <div class="swpieTop">
      <div class="text" style="color: #969696;margin-bottom:10px">
        当月:
        <span>{{Year1}}-{{Month1.toString().padStart(2,0)}}-{{Day1.toString().padStart(2,0)}}</span>
        -
        <span>{{Year}}-{{Month.toString().padStart(2,0)}}-{{Day.toString().padStart(2,0)}}</span>
      </div>
      <Swpier v-for="(item,index) in typer" :did="item.id" :key="index">
        <div class="SwipeCell" slot="swipe" @click="goToDeta(item.id)">
          <van-cell :border="false" :title="item.company_name" :value="item.paid_money" />
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
import Swpier from "../../components/BookSwipe";
import { Cell, CellGroup, Button, Dialog } from "vant";
import { resolve } from "url";
import { reject } from "q";
import Api from "../../Api";
export default {
  inject: ["reload"],
  components: {
    Swpier,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Button.name]: Button,
    [Dialog.name]: Dialog
  },
  data() {
    return {
      typer: [],
      Month: "",
      Type: [],
      Pay: [],
      Wei: [],
      Day: "",
      Year: "",
      Day1: "",
      Month1: "",
      Year1: "",
      //区分月 季度 年
      type2: "",
      maxMonth: "",
      minMonth: ""
    };
  },
  methods: {
    /**
     * 获取判断参数
     */
    SetType() {
      return new Promise((resolve, reject) => {
        resolve((this.type2 = this.$route.params.date));
      });
    },
    /**
     * 根据参数判断是获取月 季度 还是年度
     */
    getTime() {
      return new Promise((resolve, reject) => {
        let type = this.type2;
        let time = new Date();
        let date;

        switch (type) {
          case "Month":
            this.Year = this.Year1 = time.getFullYear();
            this.Month1 = this.Month = time.getMonth() + 1;
            this.Day1 = "01";
            this.Day = date = new Date(this.Year, this.Month, 0).getDate();
            break;
          case "Quarter":
            this.Year = this.Year1 = time.getFullYear();
            [this.Month, this.Month1] = [
              this.getQuarTer()[0],
              this.getQuarTer()[1]
            ];
            this.Day1 = "01";
            this.Day = date = new Date(this.Year, this.Month, 0).getDate();
            break;
          case "Year":
            this.Year = this.Year1 = time.getFullYear();
            this.Month1 = this.Day1 = "01";
            this.Month = "12";
            this.Day = date = new Date(this.Year, this.Month, 0).getDate();
            break;
        }

        resolve(
          this.Year.toString(),
          this.Year1.toString(),
          this.Month.toString().padStart(2, 0),
          this.Month1.toString().padStart(2, 0),
          this.Day.toString().padStart(2, 0),
          this.Day1.toString().padStart(2, 0)
        );
      });
    },
    /**
     * 获取当前季度
     */
    getQuarTer() {
      let time = new Date();
      let Month = time.getMonth() + 1;
      let dar2 = Month % 3;

      switch (dar2) {
        case 0:
          this.maxMonth = Month;
          this.minMonth = Month - 2;
          break;
        case 1:
          this.maxMonth = Month + 2;
          this.minMonth = Month;
          break;
        case 2:
          this.maxMonth = Month + 1;
          this.minMonth = Month - 1;
          break;
      }

      let arr = new Array(
        this.maxMonth.toString().padStart(2, 0),
        this.minMonth.toString().padStart(2, 0)
      );
      return arr;
    },
    /**
     * 获取支出收入数据
     */
    getType() {
      return new Promise((resolve, reject) => {
        let token = localStorage.getItem("token");

        this.axios
          .get(Api.Record + token, {
            params: {
              begin_date: `${this.Year1}-${this.Month1}-${this.Day1}`,
              end_date: `${this.Year}-${this.Month}-${this.Day}`
            }
          })
          .then(data => {
            resolve((this.typer = data.data.data.list));
          });
      });
    },
    /**
     * 获取待付款所有条目
     */
    getPay() {
      return new Promise((resolve, reject) => {
        let token = localStorage.getItem("token");

        this.axios
          .get(Api.RecWai + token, {
            params: {
              type: 2
            }
          })
          .then(data => {
            resolve((this.Pay = data.data.data.list));
          });
      });
    },
    /**
     * 获取待收款所有条目
     */
    getWei() {
      return new Promise((resolve, reject) => {
        let token = localStorage.getItem("token");

        this.axios
          .get(Api.RecWai + token, {
            params: {
              type: 1
            }
          })
          .then(data => {
            resolve((this.Wei = data.data.data.list));
          });
      });
    },
    /**
     *删除
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
     * 待收款
     */
    getWeiType() {
      this.typer.forEach((item, index) => {
        this.Wei.forEach((data, key) => {
          if (item.id == data.id) {
            let money = data.total_money - data.paid_money;
            item.company_name =
              item.company_name + "(待收款" + `${money}` + ")";
            item.dai = true;
          }
        });
      });
    },
    /**
     * 待付款
     */
    getPayType() {
      this.typer.forEach((item, index) => {
        this.Pay.forEach((data, key) => {
          if (item.id == data.id) {
            let money = data.total_money - data.paid_money;
            item.company_name =
              item.company_name + "(待付款" + `${money}` + ")";
            item.dai = true;
          }
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
    this.SetType().then(() => {
      this.getTime().then(() => {
        this.getType().then(() => {
          this.getWei().then(() => {
            this.getWeiType();
          });
          this.getPay().then(() => {
            this.getPayType();
          });
        });
      });
    });
  }
};
</script>

<style scoped>
.book-header-hea {
  background: #fff;
}

.year {
  padding-top: 8px !important;
}

.book-header {
  width: 100%;
  background: #50af08;
  border-bottom-right-radius: 9px;
  border-bottom-left-radius: 9px;
}

.book-hea-text {
  color: #fff;
  font-size: 20px;
  padding: 10px 0 0 0;
}

.book-hea-main {
  display: flex;
  padding: 20px 0 0 0;
  color: #fff;
  font-size: 17px;
}

.book-hea-main-content {
  flex: 1;
  text-align: left;
  padding-left: 40px;
  padding-bottom: 10px;
}

.head {
  font-size: 20px;
}

.head-box {
  padding-top: 15px;
}

.book-branch {
  display: flex;
  padding: 10px 0;
}

.book-branch-img {
  flex: 1;
}

.book-branch-img img {
  width: 25px;
}

.book-text {
  display: flex;
  color: #666666;
}

.book-text div {
  flex: 1;
}

.book-text-left {
  text-align: left;
}

.book-text-right {
  text-align: right;
}

.SwipeCell {
  height: 58px;
  position: relative;
}
</style>
