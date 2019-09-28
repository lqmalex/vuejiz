<template>
  <div class="book">
    <div v-show="show" class="Screen">
      <div class="toBack">
        <img src="../assets/images/Back.png" @click="HiScreen" />
      </div>
      <div class="func-branch">
        <span class="func-branch-text">开始时间</span>
        <van-button type="primary" class="vant-but" @click="showRopr2">{{DateT}}</van-button>
        <van-popup v-model="show2" position="bottom">
          <van-datetime-picker class="Picker" v-model="TimeValue" @confirm="getDate" type="date"></van-datetime-picker>
        </van-popup>
      </div>
      <div class="func-branch">
        <span class="func-branch-text">结束时间</span>
        <van-button type="primary" class="vant-but" @click="showRopr3">{{DateT2}}</van-button>
        <van-popup v-model="show3" position="bottom">
          <van-datetime-picker class="Picker" v-model="TimeValue2" @confirm="getDate2" type="date"></van-datetime-picker>
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
    </div>
    <div class="book-header-hea">
      <div class="book-header">
        <div class="book-hea-text">一起记账</div>
        <div type="primary" class="vantr-but-text" @click="showRopr">筛选</div>
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
    <van-pull-refresh v-model="isLoading" @refresh="ChangePage">
      <van-list
        v-model="loading"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <div class="swpieTop">
          <Swpier v-for="(item,index) in typer" :did="item.id" :key="index">
            <div class="SwipeCell" slot="swipe" @click="goToDeta(item.id)">
              <van-cell
                :border="false"
                v-if="!item.company_name"
                title="无"
                :value="item.paid_money"
              />
              <van-cell :border="false" v-else :title="item.company_name" :value="item.paid_money" />
              <div class="swipe-img" v-if="item.type == 1">
                <img src="../assets/images/income.png" alt />
                <div
                  style="width: 100px;position: absolute;top: 32px;left: 30px;border: 1px solid #5a8435;border-radius: 21px;"
                >{{item.date}}</div>
              </div>
              <div class="swipe-img" v-else>
                <img src="../assets/images/expen.png" alt />
                <div
                  style="width: 100px;position: absolute;top: 32px;left: 30px;border: 1px solid red;border-radius: 21px;"
                >{{item.date}}</div>
              </div>
            </div>
            <van-button
              style="height:65px"
              @click="del(item.id)"
              square
              type="danger"
              text="删除"
              slot="func"
            />
          </Swpier>
        </div>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import Swpier from "../components/BookSwipe";
import Api from "../Api";
import "vant/lib/icon/local.css";
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
  Dialog,
  Loading,
  Pagination,
  PullRefresh,
  Lazyload,
  List
} from "vant";
import { resolve } from "url";
import { reject } from "q";
import Qs from "qs";
export default {
  inject: ["reload", "Date1", "Date2"],
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
    [Dialog.name]: Dialog,
    [Loading.name]: Loading,
    [Pagination.name]: Pagination,
    [PullRefresh.name]: PullRefresh,
    [Lazyload.name]: Lazyload,
    [List.name]: List
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
      page: 1,
      isLoading: false,
      show: false,
      show2: false,
      show3: false,
      show4: false,
      show5: false,
      Sum: 0,
      currentPage: 5,
      Num: 0,
      loading: false,
      finished: false,
      error: false,
      List: [],
      Page: 1
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
      let Arr = new Array(this.DateT, this.DateT2);
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
    ChangePage() {
      this.$emit("setTime", this.DateT, this.DateT2);
      this.reload();
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
        this.List = [];
        let token = localStorage.getItem("token");
        this.axios
          .get(Api.Record + token, {
            params: {
              begin_date: this.DateT,
              end_date: this.DateT2,
              type: this.AId,
              category_id: UId,
              page: this.Page
            }
          })
          .then(data => {
            if (data.data.status) {
              if (data.data.data.list.length == 0) {
                this.finished = true;
              }
              resolve(
                (this.List = data.data.data.list),
                (this.Sum += Number(data.data.data.list.length))
              );
            }
          });
      });
    },
    /**
     * 筛选
     */
    SetScreen() {
      this.Page = 1;
      this.currentPage = 5;
      this.typer = [];
      this.loading = true;
      this.finished = false;
      this.getType().then(() => {
        this.getWeiType().then(() => {});
        this.getPayType().then(() => {});
        if (this.loading) {
          this.onLoad();
        }
      });

      this.show = false;
    },
    HiScreen() {
      this.show = false;
    },
    /**
     * 获取收支 类别
     */
    getLei() {
      let token = localStorage.getItem("token");
      this.axios
        .get(Api.Cate + token, {
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
     * 获取收入支出总数据
     */
    getData() {
      let token = localStorage.getItem("token");

      this.axios
        .get(Api.View + token)
        .then(data => {
          // console.log(data);
          this.income = data.data.data.account.in;
          this.out = data.data.data.account.out;
        })
        .catch(err => {
          console.log(err);
        });
    },
    del(id) {
      //获取id值
      let Token = localStorage.getItem("token");
      Dialog.confirm({
        title: "提示",
        message: "您确定要删除吗?"
      })
        .then(() => {
          this.axios
            .post(Api.Del.Url1 + id + Api.Del.Url2 + Token)
            .then(data => {
              if (data.data.status) {
                //调用刷新方法
                this.reload();
              } else {
                Toast(`${data.data.data}`);
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
      return new Promise((resolve, reject) => {
        this.List.forEach((item, index) => {
          this.Wei.forEach((data, key) => {
            if (item.id == data.id) {
              let money = data.total_money - data.paid_money;
              resolve(
                (item.company_name =
                  item.company_name + "(待收款" + `${money}` + ")"),
                (item.dai = true)
              );
            }
          });
        });
      });
    },
    /**
     * 待付款
     */
    getPayType() {
      return new Promise((resolve, reject) => {
        this.List.forEach((item, index) => {
          this.Pay.forEach((data, key) => {
            if (item.id == data.id) {
              let money = data.total_money - data.paid_money;
              resolve(
                (item.company_name =
                  item.company_name + "(待付款" + `${money}` + ")"),
                (item.dai = true)
              );
            }
          });
        });
      });
    },
    /**
     * 下滑加载
     */
    onLoad() {
      let num = this.currentPage - 5;
      this.isLoading = false;
      if (this.List.length == 0) {
        this.Loading("加载中...", 0);
        this.getType().then(() => {
          this.getWeiType().then(() => {});
          this.getPayType().then(() => {});
          this.Loading("加载中...", 0.3);
          this.loading = false;
        });
      } else {
        // 异步更新数据
        setTimeout(() => {
          for (let i = num; i < this.currentPage; i++) {
            if (this.List[i] === undefined) {
              this.loading = false;
              this.finished = true;
              return;
            } else {
              this.typer.push(this.List[i]);
            }
          }
          if (this.currentPage == 20) {
            this.Page += 1;
            this.currentPage = 5;
            this.getType().then(() => {
              this.loading = false;
            });
            return;
          } else {
            // 加载状态结束
            this.currentPage += 5;
            this.loading = false;
            // 数据全部加载完成
            if (this.typer.length >= this.Sum) {
              this.finished = true;
            }
          }
        }, 1000);
      }
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
    this.Loading("加载中", 0);
    this.getTime();
    this.getCurrent();
    this.getType().then(() => {
      this.getWei().then(() => {
        this.Loading("加载中", 0.5);
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

<style scoped lang="less">
.book {
  margin-bottom: 80px;

  .Screen {
    position: fixed;
    z-index: 9999;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: #fff;

    .toBack {
      height: 35px;
      background: #50af08;
      text-align: left;
      padding: 10px;
      position: relative;

      img {
        height: 100%;
      }
    }

    .van-popup {
      width: 80%;
      padding: 0;
      border-radius: 9px;
      height: 40%;
    }

    .van-popup--bottom {
      width: 100%;
    }
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

    .func-branch-text {
      flex: 1;
      line-height: 50px;
      padding-left: 6px;
    }
  }

  .book-header {
    width: 100%;
    background: #50af08;
    border-bottom-right-radius: 9px;
    border-bottom-left-radius: 9px;
    position: relative;

    .book-hea-text {
      color: #fff;
      font-size: 20px;
      padding: 10px 0 0 0;
      display: inline-block;
    }
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

  .vantr-but-text {
    display: inline-block;
    font-size: 20px;
    color: #fff;
    position: absolute;
    top: 10px;
    right: 10%;
  }

  .show_but {
    width: 90%;
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
    overflow: hidden;
  }

  .book-hea-main-content {
    flex: 1;
    text-align: left;
    padding-left: 40px;
    padding-bottom: 10px;
  }

  .head {
    font-size: 20px;

    .head-box {
      padding-top: 15px;
    }
  }

  .book-branch {
    display: flex;
    padding: 10px 0;

    .book-branch-img {
      flex: 1;

      img {
        width: 25px;
      }
    }
  }

  .book-text {
    display: flex;
    color: #666666;

    div {
      flex: 1;
    }

    .book-text-left {
      text-align: left;
    }

    .book-text-right {
      text-align: right;
    }
  }

  .SwipeCell {
    height: 65px;
    position: relative;
  }

  .Login {
    position: fixed;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(110, 110, 110, 0.4);
    z-index: 9999;
    text-align: center;
  }

  .van-loading {
    position: absolute;
    top: 45%;
    left: 45%;
  }

  button {
    border: 0;
  }
}
</style>
