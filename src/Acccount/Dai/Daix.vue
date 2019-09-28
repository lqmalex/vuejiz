<template>
  <div class="Set">
    <div class="text" style="color:#969696" v-show="show">暂无信息</div>
    <van-pull-refresh v-model="isLoading" @refresh="ChangePage">
      <!-- <p style="color: #969696;">下拉刷新</p> -->
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <div class="swpieTop" style="margin-top:10px">
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
        </div>
      </van-list>
    </van-pull-refresh>
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
  Dialog,
  Pagination,
  Loading,
  List,
  PullRefresh
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
      show: false,
      Sum: 0,
      currentPage: 5,
      Dis: "block",
      List: [],
      isLoading: false,
      loading: false,
      finished: false
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
    [Dialog.name]: Dialog,
    [Pagination.name]: Pagination,
    [Loading.name]: Loading,
    [List.name]: List,
    [PullRefresh.name]: PullRefresh
  },
  methods: {
    /**
     * 设置待收款 待付款
     */
    setType() {
      return new Promise((resolve, reject) => {
        resolve((this.Type = this.$route.params.id));
      });
    },
    ChangePage() {
      this.reload();
    },
    /**
     * 下滑加载
     */
    onLoad() {
      let num = this.currentPage - 5;
      this.isLoading = false;
      if (this.List.length == 0) {
        this.setType().then(() => {
          this.getData("", "").then(() => {
            this.loading = false;
          });
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
          // 加载状态结束
          this.currentPage += 5;
          this.loading = false;
          this.isLoading = false;

          // 数据全部加载完成
          if (this.typer.length >= this.Sum) {
            this.finished = true;
          }
        }, 1000);
      }
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
     * 获取待付款或待收款数据
     */
    getData(Typer, token) {
      return new Promise((resolve, reject) => {
        Typer = Typer == "" ? this.Type : Typer;
        token = token == "" ? this.Token : token;
        this.axios
          .get(Api.RecWai + token, {
            params: {
              type: Typer
            }
          })
          .then(data => {
            if (data.data.data.list.length == 0) {
              this.finished = true;
            }
            resolve(
              (this.List = data.data.data.list),
              (this.Sum = data.data.data.list.length)
            );
          });
      });
    },
    /**
     * 遍历填写数据
     */
    setData() {
      return new Promise((resolve, reject) => {
        this.List.forEach((item, index) => {
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
    this.Loading("加载中...", 0);
    this.getToken().then(() => {
      this.setType().then(() => {
        this.getData(this.Type, this.Token).then(() => {
          this.Loading("加载中...", 0.5);
          this.List.length > 0
            ? (this.setData(), (this.show = false))
            : (this.show = true);
        });
      });
    });
  }
};
</script>

<style scoped lang="less">
.Set {
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
