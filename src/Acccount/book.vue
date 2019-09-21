<template>
  <div id="book">
    <div class="book-header-hea">
      <div class="book-header">
        <div class="book-hea-text">一起记账</div>
        <van-button type="primary" class="vantr-but" @click="showRopr">筛选</van-button>
        <van-popup v-model="show">
          <div class="func-branch">
            <span class="func-branch-text">开始时间</span>
            <van-button type="primary" class="vant-but" @click="showRopr2">{{DateT}}</van-button>
            <van-popup v-model="show2" position="bottom">
              <van-datetime-picker v-model="TimeValue" @confirm="getDate" type="date"></van-datetime-picker>
            </van-popup>
          </div>
          <div class="func-branch">
            <span class="func-branch-text">结束时间</span>
            <van-button type="primary" class="vant-but" @click="showRopr3">{{DateT2}}</van-button>
            <van-popup v-model="show3" position="bottom">
              <van-datetime-picker v-model="TimeValue2" @confirm="getDate2" type="date"></van-datetime-picker>
            </van-popup>
          </div>

          <div style="margin-top:20px"></div>
          <div class="func-branch">
            <span class="func-branch-text">收入支出</span>
            <van-button type="primary" class="vant-but" @click="showRopr4">{{Str1}}</van-button>
            <van-popup v-model="show4">
              <van-radio-group v-model="AId">
                <van-cell-group>
                  <van-cell title="不限" clickable @click="AId = 3,Str1 = '不限'">
                    <van-radio slot="right-icon" :name="3" />
                  </van-cell>
                  <van-cell title="收入" clickable @click="AId = 1;Str1 = '收入'">
                    <van-radio slot="right-icon" :name="1" />
                  </van-cell>
                  <van-cell title="支出" clickable @click="AId = 2,Str1 = '支出'">
                    <van-radio slot="right-icon" :name="2" />
                  </van-cell>
                </van-cell-group>
              </van-radio-group>
            </van-popup>
          </div>
          <div class="func-branch">
            <span class="func-branch-text">收支类别</span>
            <van-button type="primary" class="vant-but" @click="showRopr5">{{Str2}}</van-button>
            <van-popup v-model="show5">
              <van-radio-group v-model="UId">
                <van-cell-group>
                  <van-cell title="不限" clickable @click="UId = 3,Str2 = '不限'">
                    <van-radio slot="right-icon" :name="3" />
                  </van-cell>
                  <van-cell
                    v-for="(item,index) in Lei"
                    :key="index"
                    :title="item.name"
                    clickable
                    @click="UId = item.id,Str2 = item.name"
                  >
                    <van-radio slot="right-icon" :name="item.id" />
                  </van-cell>
                </van-cell-group>
              </van-radio-group>
            </van-popup>
          </div>
          <button class="show_but" @click="SetScreen">筛选</button>
        </van-popup>
        <div class="book-hea-main">
          <div class="book-hea-main-content">
            <div>收入</div>
            <div class="head-box">
              <span class="head">{{income}}</span>
            </div>
          </div>
          <div class="book-hea-main-content">
            <div>支出</div>
            <div class="head-box">
              <span class="head">{{out}}</span>
            </div>
          </div>
          <div class="book-hea-main-content">
            <div>利润</div>
            <div class="head-box">
              <span class="head">{{(income - out).toFixed(2)}}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="book-branch">
        <div class="book-branch-img" @click="goToDet">
          <img src="../assets/images/funclass.png" alt />
        </div>
        <div class="book-branch-img" @click="goToDai">
          <img src="../assets/images/dai.png" alt />
        </div>
      </div>
    </div>
    <div class="book-text">
      <div class="book-text-left">{{month}}月{{day}}日 星期{{TimeDay}}</div>
      <div class="book-text-right">
        收入:{{income}}
        <br />
        支出:{{out}}
      </div>
    </div>
    <div class="swpieTop">
      <Swpier v-for="(item,index) in typer" :did="item.id" :key="index">
        <div class="SwipeCell" slot="swipe" @click="goToDeta(item.id)">
          <van-cell :border="false" v-if="!item.company_name" title="无" :value="item.paid_money" />
          <van-cell :border="false" v-else :title="item.company_name" :value="item.paid_money" />
          <div class="swipe-img" v-if="item.type == 1">
            <img src="../assets/images/income.png" alt />
            <div
              style="width: 100px;position: absolute;top: 32px;left: 20px;border: 1px solid #5a8435;border-radius: 21px;"
            >{{item.date}}</div>
          </div>
          <div class="swipe-img" v-else>
            <img src="../assets/images/expen.png" alt />
            <div
              style="width: 100px;position: absolute;top: 32px;left: 20px;border: 1px solid red;border-radius: 21px;"
            >{{item.date}}</div>
          </div>
        </div>
        <van-button style="height:58px" @click="del" square type="danger" text="删除" slot="func" />
      </Swpier>
    </div>
  </div>
</template>

<script>
import Swpier from "../components/BookSwipe";
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
import { resolve } from "url";
import { reject } from "q";
import Qs from "qs";
export default {
  inject: ["reload"],
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
  data() {
    return {
      month: "",
      income: "",
      out: "",
      month: "",
      day: "",
      TimeDay: "",
      typer: [],
      Wei: [],
      Pay: [],
      Str1: "不限",
      Str2: "不限",
      AId: 3,
      UId: 3,
      TimeValue: "",
      DateT: "",
      DateT2: "",
      TimeValue2: "",
      Lei: [],
      show: false,
      show2: false,
      show3: false,
      show4: false,
      show5: false
    };
  },
  methods: {
    /**
     * 获取当前时间
     */
    getTime() {
      let TimeArr = ["一", "二", "三", "四", "五", "六", "日"];
      let time = new Date();
      this.month = (time.getMonth() + 1).toString().padStart(2, 0); //月
      this.day = time.getDate().toString(); //日
      this.TimeDay =
        time.getDay() - 1 == -1 ? TimeArr[6] : TimeArr[time.getDay() - 1]; //星期
    },
    /**
     * 获取当前时间
     */
    getCurrent() {
      let time = new Date();
      this.TimeValue =
        time.getFullYear() +
        "-" +
        (time.getMonth() + 1).toString().padStart(2, 0) +
        "-" +
        "01";

      let data = new Date(time.getFullYear(), time.getMonth() + 1, 0);
      this.TimeValue2 =
        data.getFullYear() +
        "-" +
        (data.getMonth() + 1).toString().padStart(2, 0) +
        "-" +
        data
          .getDate()
          .toString()
          .padStart(2, 0);
      this.TimeValue = new Date(this.TimeValue);
      this.DateT = this.timeFormat(this.TimeValue);
      this.TimeValue2 = new Date(this.TimeValue2);
      this.DateT2 = this.timeFormat(this.TimeValue2);
    },
    /**
     * 格式化时间
     */
    timeFormat(time) {
      time = new Date(time);
      let year = time.getFullYear();
      let month = (time.getMonth() + 1).toString().padStart(2, 0);
      let day = time
        .getDate()
        .toString()
        .padStart(2, 0);
      return year + "-" + month + "-" + day;
    },
    /**
     * 点击完成按钮时触发的事件
     */
    getDate(value) {
      //调用格式化时间函数
      let time = new Date(value);
      this.DateT = this.timeFormat(time);
      this.show2 = false;
    },
    /**
     * 点击完成按钮时触发的事件
     */
    getDate2(value) {
      //调用格式化时间函数
      let time = new Date(value);
      this.DateT2 = this.timeFormat(time);
      this.show3 = false;
    },
    /**
     * 获取支出收入数据
     */
    getType() {
      return new Promise((resolve, reject) => {
        let UId = this.UId == 3 ? "" : this.UId;

        let token = localStorage.getItem("token");
        this.axios
          .get(`/api/record/account?token=${token}`, {
            params: {
              begin_date: this.DateT,
              end_date: this.DateT2,
              type: this.AId,
              category_id: UId
            }
          })
          .then(data => {
            // console.log(data);
            resolve((this.typer = data.data.data.list));
          });
      });
    },
    /**
     * 筛选
     */
    SetScreen() {
      this.getType().then(() => {});
      this.show = false;
    },
    /**
     * 获取收支 类别
     */
    getLei() {
      let token = localStorage.getItem("token");
      this.axios
        .get(`/api/category?token=${token}`, {
          params: {
            type: this.AId
          }
        })
        .then(data => {
          // console.log(data);
          this.Lei = data.data.data;
        });
    },
    /**
     * 获取待付款所有条目
     */
    getPay() {
      return new Promise((resolve, reject) => {
        let token = localStorage.getItem("token");

        this.axios
          .get(`/api/record/account/waiting?token=${token}`, {
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
          .get(`/api/record/account/waiting?token=${token}`, {
            params: {
              type: 1
            }
          })
          .then(data => {
            // console.log(data);
            resolve((this.Wei = data.data.data.list));
          });
      });
    },
    /**
     * 获取收入支出总数据
     */
    getData() {
      let token = localStorage.getItem("token");

      this.axios
        .get(`/api/view/home?token=${token}`)
        .then(data => {
          // console.log(data);
          this.income = data.data.data.account.in;
          this.out = data.data.data.account.out;
        })
        .catch(err => {
          console.log(err);
        });
    },
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
            .post(`api/record/delete?id=${id}&token=${Token}`)
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
    showRopr() {
      this.show = true;
    },
    showRopr2() {
      this.show2 = true;
    },
    showRopr3() {
      this.show3 = true;
    },
    showRopr4() {
      this.show4 = true;
    },
    showRopr5() {
      this.AId == 3 ? (this.Lei = []) : this.getLei();

      this.show5 = true;
    },
    /**
     * 跳转到分类 月 季度 年
     */
    goToDet() {
      this.$router.push("/Detar");
    },
    /**
     * 跳转到详情
     */
    goToDeta(id) {
      localStorage.setItem("book_id", id);
      this.$router.push("/DeTa");
    },
    /**
     * 跳转到待付款待收款
     */
    goToDai() {
      this.$router.push("/Dai");
    }
  },
  created() {
    this.getTime();
    this.getCurrent();
    this.getType().then(() => {
      this.getWei().then(() => {
        this.getWeiType();
      });
      this.getPay().then(() => {
        this.getPayType();
      });
    });
    this.getData();
  }
};
</script>

<style scoped>
#book {
  margin-bottom: 80px;
}

.book-header-hea {
  background: #fff;
}

.year {
  padding-top: 8px !important;
}

.func-branch {
  text-align: left;
  display: flex;
  height: 50px;
  background: #fff;
  border-bottom: 2px solid #ccc;
}

.func-branch-text {
  flex: 1;
  line-height: 50px;
  padding-left: 6px;
}

.book-header {
  width: 100%;
  background: #50af08;
  border-bottom-right-radius: 9px;
  border-bottom-left-radius: 9px;
  position: relative;
}

.book-hea-text {
  color: #fff;
  font-size: 20px;
  padding: 10px 0 0 0;
  display: inline-block;
}

.vant-but {
  background: #fff;
  border: 0;
  color: #969696;
  flex: 1;
  text-align: right;
  position: relative;
  padding: 0 24px;
}

.van-popup {
  width: 300px;
  padding: 20px 20px;
  height: 60%;
}

.vantr-but {
  display: inline-block;
  position: absolute;
  top: 7px;
  right: 10px;
  background: #50af08;
  border: 0;
  font-size: 19px;
}

.show_but {
  width: 100%;
  height: 37px;
  background: #50af08;
  color: #fff;
  margin-top: 15px;
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
