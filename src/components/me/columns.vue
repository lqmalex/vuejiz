<template>
  <div class="columns">
    <div class="column-main">
      <div class="column-text Inv">{{Mer_len}}</div>
      <div class="column-botton">
        <img src="../../assets/images/Inv.png" alt /> 已添加
      </div>
    </div>
    <div class="column-main">
      <div class="column-text book">{{Book_len}}</div>
      <div class="column-botton">
        <img src="../../assets/images/book.png" alt /> 总账本
      </div>
    </div>
    <div class="column-main">
      <div class="column-text Deta">{{Mxi_len}}</div>
      <div class="column-botton">
        <img src="../../assets/images/Deta2.png" alt /> 总明细
      </div>
    </div>
  </div>
</template>

<script>
import { resolve } from "url";
import { reject } from "q";
import Api from "../../Api";
import { Toast } from "vant";
export default {
  components: {
    [Toast.name]: Toast
  },
  data() {
    return {
      Mxi_len: 0,
      Book_len: 0,
      Mer_len: 0,
      Token: "",
      book_id: "",
      Page: 1,
      Num: 0
    };
  },
  methods: {
    getToken() {
      return new Promise((resolve, reject) => {
        resolve((this.Token = localStorage.getItem("token")));
      });
    },
    /**
     * 获取相关数据
     */
    getBook(token) {
      return new Promise((resolve, reject) => {
        this.axios.get(Api.CurBook + token).then(data => {
          resolve((this.Book_id = data.data.data.id));
        });
      });
    },
    getAllBook(token) {
      return new Promise((resolve, reject) => {
        this.axios.get(Api.Book + token).then(data => {
          if (data.data.status) {
            resolve((this.Book_len = data.data.data.length));
          }
        });
      });
    },
    getDataNum(token) {
      return new Promise((resolve, reject) => {
        this.axios
          .get(Api.Record + token, {
            params: {
              begin_date: "1990-01-01",
              end_date: "2100-01-01",
              page: this.Page
            }
          })
          .then(data => {
            //因返回的数据最多20条所以当list长度等于20时递归调用自己 且让页码+1 直到最后一页
            if (data.data.data.list.length == 20) {
              this.Num += data.data.data.list.length;
              this.Page += 1;
              let tokenr = localStorage.getItem("token");
              this.getDataNum(tokenr).then(() => {});
            } else {
              this.Num += data.data.data.list.length;
            }

            resolve((this.Mxi_len = this.Num));
          });
      });
    },
    getMember(book, token) {
      return new Promise((resolve, reject) => {
        this.axios
          .get(Api.Member + token, {
            params: {
              book_id: book
            }
          })
          .then(data => {
            if (!data.data.status) {
              resolve((this.Mer_len = 0));
              return;
            }
            resolve((this.Mer_len = data.data.data.length));
          });
      });
    }
  },
  created() {
    Toast.clear();
    this.getToken().then(() => {
      this.getBook(this.Token).then(() => {
        this.getMember(this.Book_id, this.Token).then(() => {});
      });
      this.getAllBook(this.Token).then(() => {});
      this.getDataNum(this.Token).then(() => {});
    });
  }
};
</script>

<style scoped lang="less">
.columns {
  display: flex;
  background: #fff;
  border-bottom: 1px solid #ccc;

  & > div {
    & + div {
      &::before {
        content: "";
        display: block;
        position: absolute;
        width: 1px;
        height: 80%;
        left: 0;
        top: 5px;
        background: #bfbfbf;
      }
    }
  }

  .column-main {
    flex: 1;
    padding: 5px 0;
    position: relative;
  }

  .column-text {
    font-size: 35px;
  }

  .Inv {
    color: orange;
  }

  .book {
    color: #05b1b1;
  }

  .Deta {
    color: #1ad82d;
  }

  .column-botton {
    color: #bfbfbf;

    img {
      width: 14px;
    }
  }
}
</style>
