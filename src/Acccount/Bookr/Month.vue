<template>
  <div id="book">
    <div class="swpieTop">
      <div class="text" style="color: #969696;margin-bottom:10px">
        {{Str}}:
        <span>{{Year1}}-{{Month1.toString().padStart(2,0)}}-{{Day1.toString().padStart(2,0)}}</span>
        -
        <span>{{Year}}-{{Month.toString().padStart(2,0)}}-{{Day.toString().padStart(2,0)}}</span>
      </div>
      <van-pull-refresh v-model="isLoading" @refresh="ChangePage">
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
          <Swpier v-for="(item,index) in typer" :did="item.id" :key="index">
            <div class="SwipeCell" slot="swipe" @click="goToDeta(item.id)">
              <van-cell :border="false" :title="item.company_name" :value="item.paid_money" />
              <div class="swipe-img" v-if="item.type == 1">
                <img src="../../assets/images/income.png" alt />
                <div
                  style="width: 100px;position: absolute;top: 32px;left: 30px;border: 1px solid #5a8435;border-radius: 21px;"
                >{{item.date}}</div>
              </div>
              <div class="swipe-img" v-else>
                <img src="../../assets/images/expen.png" alt />
                <div
                  style="width: 100px;position: absolute;top: 32px;left: 30px;border: 1px solid red;border-radius: 21px;"
                >{{item.date}}</div>
              </div>
            </div>
            <van-button
              @click="del(item.id)"
              style="height:65px"
              square
              type="danger"
              text="删除"
              slot="func"
            />
          </Swpier>
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>

<script>
import Swpier from "../../components/BookSwipe";
import {
  Cell,
  CellGroup,
  Button,
  Dialog,
  Pagination,
  Loading,
  Toast,
  List,
  PullRefresh
} from "vant";
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
    [Dialog.name]: Dialog,
    [Pagination.name]: Pagination,
    [Loading.name]: Loading,
    [Toast.name]: Toast,
    [List.name]: List,
    [PullRefresh.name]: PullRefresh
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
      minMonth: "",
      Str: "",
      Sum: 0,
      currentPage: 5,
      Dis: "block",
      List: [],
      isLoading: false,
      loading: false,
      finished: false,
      Page: 1
      // currentPage: 5
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
    ChangePage() {
      this.reload();
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
            this.Str = "当月";
            this.Year = this.Year1 = time.getFullYear();
            this.Month1 = this.Month = time.getMonth() + 1;
            this.Day1 = "01";
            this.Day = date = new Date(this.Year, this.Month, 0).getDate();
            break;
          case "Quarter":
            this.Str = "季度";
            this.Year = this.Year1 = time.getFullYear();
            [this.Month, this.Month1] = [
              this.getQuarTer()[0],
              this.getQuarTer()[1]
            ];
            this.Day1 = "01";
            this.Day = date = new Date(this.Year, this.Month, 0).getDate();
            break;
          case "Year":
            this.Str = "年度";
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
              begin_date: `${this.Year1}-${this.Month1.toString().padStart(
                2,
                0
              )}-${this.Day1.toString().padStart(2, 0)}`,
              end_date: `${this.Year}-${this.Month.toString().padStart(
                2,
                0
              )}-${this.Day.toString().padStart(2, 0)}`,
              page: this.Page
            }
          })
          .then(data => {
            if (data.data.data.list.length == 0) {
              this.finished = true;
            }
            resolve(
              (this.List = data.data.data.list),
              (this.Sum += Number(data.data.data.list.length))
            );
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
    Loading(mess, num) {
      Toast.loading({
        mask: true,
        message: mess,
        duration: num
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
    this.Loading("加载中...", 0);
    this.SetType().then(() => {
      this.getTime().then(() => {
        this.getType().then(() => {
          this.getWei().then(() => {
            this.Loading("加载中...", 0.5);
            this.getWeiType();
          });
          this.getPay().then(() => {
            this.Loading("加载中...", 0.5);
            this.getPayType();
          });
        });
      });
    });
  }
};
</script>

<style scoped lang="less">
#book {
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

    img {
      width: 25px;
    }
  }

  .book-text {
    display: flex;
    color: #666666;

    div {
      flex: 1;
    }
  }

  .book-text-left {
    text-align: left;
  }

  .book-text-right {
    text-align: right;
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
}
</style>
