<template>
  <div class="func">
    <div class="func-branch">
      <span class="func-branch-text">账面收入</span>
      <input type="text" placeholder="0.00" v-model="total_money" />
    </div>
    <div class="func-branch">
      <span class="func-branch-text">交易对象</span>
      <input type="text" placeholder="输入交易对象" v-model="company" />
    </div>
    <div class="func-branch">
      <span class="func-branch-text">收款方式</span>
      <van-button type="primary" class="vant-but" @click="showPopup">{{radio1}}</van-button>
      <van-popup v-model="show">
        <van-radio-group v-model="radio1">
          <van-cell-group>
            <van-cell title="全额收款" clickable @click="radio1 = '全额收款';setType()">
              <van-radio slot="right-icon" name="全额收款" />
            </van-cell>
            <van-cell title="分期收款" clickable @click="radio1 = '分期收款';setType()">
              <van-radio slot="right-icon" name="分期收款" />
            </van-cell>
          </van-cell-group>
        </van-radio-group>
      </van-popup>
    </div>
    <div class="func-branch" v-show="Type">
      <span class="func-branch-text">首笔收款</span>
      <input type="text" placeholder="0.00" v-model="money" />
    </div>
    <div class="func-branch">
      <span class="func-branch-text">收款账户</span>
      <van-button type="primary" class="vant-but" v-if="!Amess" @click="showPopup2">请选择</van-button>
      <van-button type="primary" class="vant-but" v-else @click="showPopup2">{{Amess}}</van-button>
      <van-popup v-model="show2">
        <van-radio-group v-model="Aid">
          <van-cell-group>
            <van-cell title="请选择" clickable @click="Aid = '';setAmess('')">
              <van-radio slot="right-icon" name />
            </van-cell>
            <van-cell
              v-for="(item,index) in Acco"
              :key="index"
              :title="item.name"
              clickable
              @click="Aid = item.id;setAmess(item.name)"
            >
              <van-radio slot="right-icon" :name="item.id" />
            </van-cell>
          </van-cell-group>
        </van-radio-group>
      </van-popup>
    </div>
    <div class="func-branch">
      <span class="func-branch-text">收款类别</span>
      <van-button type="primary" class="vant-but" v-if="!Cmess" @click="showPopup3">请选择</van-button>
      <van-button type="primary" class="vant-but" v-else @click="showPopup3">{{Cmess}}</van-button>
      <van-popup v-model="show3">
        <van-radio-group v-model="Cid">
          <van-cell-group>
            <van-cell title="请选择" clickable @click="Cid = '';setCmess('')">
              <van-radio slot="right-icon" name />
            </van-cell>
            <van-cell
              v-for="(item,index) in Cate"
              :key="index"
              :title="item.name"
              clickable
              @click="Cid = item.id;setCmess(item.name)"
            >
              <van-radio slot="right-icon" :name="item.id" />
            </van-cell>
          </van-cell-group>
        </van-radio-group>
      </van-popup>
    </div>
    <div class="func-branch">
      <span class="func-branch-text">收款日期</span>
      <van-button type="primary" class="vant-but" @click="showPopup4">{{timeValue}}</van-button>
      <van-popup v-model="show4" round position="bottom" :style="{ height: '40%',width:'100%' }">
        <van-datetime-picker v-model="currentDate" @confirm="getDate" type="date"></van-datetime-picker>
      </van-popup>
    </div>
    <div class="func-branch big">
      <span class="func-branch-text">收入凭证</span>
      <div class="flex-big">
        <van-uploader v-model="fileList" :after-read="afterRead" :before-delete="beforeDel" />
      </div>
    </div>
    <textarea placeholder="请输入备注..." v-model="remark"></textarea>

    <div class="bottom-but">
      <button @click="Submit">保存</button>
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
  Dialog,
  Loading
} from "vant";
import Qs from "qs";
import { reject } from "q";
import { resolve } from "url";
import Api from "../../Api";
export default {
  components: {
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
    [Loading.name]: Loading
  },
  data() {
    return {
      money: "",
      total_money: "",
      company: "",
      show: false,
      show2: false,
      show3: false,
      show4: false,
      Aid: "",
      radio1: "全额收款",
      Amess: "",
      Cmess: "",
      Cid: "",
      currentDate: new Date(),
      timeValue: "",
      fileList: [],
      file: "",
      Type: false,
      Token: "",
      Acco: [],
      Cate: [],
      fileKey: [],
      fileNum: [],
      remark: "",
      SubType: true,
      DisType: "none",
      none: "none",
      Dis: "none"
    };
  },
  methods: {
    showPopup() {
      this.show = true;
    },
    showPopup2() {
      this.show2 = true;
    },
    showPopup3() {
      this.show3 = true;
    },
    showPopup4() {
      this.show4 = true;
    },
    /**
     * 获取Token
     */
    setToken() {
      return new Promise((resolve, reject) => {
        resolve((this.Token = localStorage.getItem("token")));
      });
    },
    /**
     * 设置账户双向数据绑定
     */
    setAmess(mess) {
      this.Amess = mess == "" ? "" : mess;
      this.show2 = false;
    },
    /**
     * 设置类别双向数据绑定
     */
    setCmess(mess) {
      this.Cmess = mess == "" ? "" : mess;
      this.show3 = false;
    },
    /**
     *删除图片
     */
    beforeDel(file) {
      this.fileList.forEach((item, index) => {
        if (item.content == file.content) {
          this.fileList.splice(index, 1);
          this.fileKey.splice(index, 1);
        }
      });
      Toast("删除成功");
    },
    /**
     * 设置全额或分期
     */
    setType() {
      this.Type = this.radio1 == "全额收款" ? false : true;
      this.show = false;
    },
    /**
     * 获取账户
     */
    getAcco(token) {
      return new Promise((resolve, reject) => {
        this.axios.get(Api.Account + token).then(data => {
          resolve((this.Acco = data.data.data));
        });
      });
    },
    /**
     * 获取类别
     */
    getCate(token) {
      return new Promise((resolve, reject) => {
        this.axios
          .get(Api.Cate + token, {
            params: {
              type: 1
            }
          })
          .then(data => {
            resolve((this.Cate = data.data.data));
          });
      });
    },
    /**
     * 获取当前时间
     */
    setTimeVal() {
      let time = new Date();
      let year = time.getFullYear();
      let month = time.getMonth() + 1;
      let day = time.getDate();
      this.timeValue = year + "-" + month + "-" + day;
    },
    /**
     * 点击完成按钮时触发的事件
     */
    getDate(value) {
      //调用格式化时间函数
      this.timeValue = this.timeFormat(this.currentDate);
      this.show4 = false;
    },
    /**
     * 格式化时间
     */
    timeFormat(time) {
      let year = time.getFullYear();
      let month = time.getMonth() + 1;
      let day = time.getDate();
      return year + "-" + month + "-" + day;
    },
    afterRead(file) {
      // 调用上传
      this.SubImg(file.file);
    },
    /**
     * 上传图片
     */
    SubImg(file) {
      return new Promise((resolve, reject) => {
        this.SubType = false;
        // this.DisType = "block";
        this.Loading("上传图片中...", 0);
        //new 一个FormData格式的参数
        let params = new FormData();
        params.append("file", file);
        let config = {
          headers: {
            //添加请求头
            "Content-Type": "multipart/form-data"
          }
        };

        this.axios
          .post(Api.UploadImg + this.Token, params, config)
          .then(data => {
            if (data.data.status == true) {
              this.Loading("上传图片中...", 0.5);
              this.fileKey.push(data.data.data.file.fileKey);
              Toast("文件上传成功");
              this.SubType = true;
            } else {
              this.Loading("上传图片中...", 0.5);
              Toast("文件上传失败");
              this.SubType = true;
            }
          });
      });
    },
    /**
     *  提交
     */
    Submit(_this) {
      if (this.SubType) {
        this.Loading("提交数据中...", 0);
        let money = this.money == "" ? this.total_money : this.money;
        if (this.total_money < 0 || this.money < 0) {
          Toast("亲，请不要使用负数哦!");
          return;
        }

        if (money > 99999999 || this.total_money > 99999999) {
          Toast("您输入的金额有误");
          return;
        }

        if (this.fileKey.length == 0) {
          var fileKey = "";
        } else {
          if (this.fileKey.length == 1) {
            var fileKey = this.fileKey[0];
          } else {
            var fileKey = "";
            var len = this.fileKey.length - 1;
            this.fileKey.forEach((item, index) => {
              if (index == len) {
                item = item;
              } else {
                item = item + ",";
              }
              fileKey += item;
            });
          }
        }

        let data = Qs.stringify({
          total_money: this.total_money,
          money: money,
          account_id: this.Aid,
          category_id: this.Cid,
          date: this.timeValue,
          company_name: this.company,
          remark: this.remark,
          image_keys: fileKey
        });
        this.axios.post(Api.SubAcc + this.Token, data).then(data => {
          if (data.data.status) {
            let TimeNum = 3;

            const toast = Toast.loading({
              duration: 0,
              forbidClick: true,
              message: "提交成功 3 秒"
            });

            let timer = setInterval(() => {
              TimeNum--;
              if (TimeNum) {
                toast.message = `提交成功 ${TimeNum} 秒`;
              } else {
                clearInterval(timer);
                Toast.clear();
                this.$router.push("/book");
              }
            }, 1000);
          } else {
            this.Loading("提交数据中...", 0.5);

            Dialog.alert({
              title: "提示",
              message: `${data.data.data}`
            }).then(() => {});
          }
        });
      } else {
        Dialog.alert({
          title: "提示",
          message: "网络正在请求，请稍等片刻"
        }).then(() => {});
      }
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
    this.setTimeVal();
    this.setToken().then(() => {
      this.getAcco(this.Token).then(() => {
        this.getCate(this.Token).then(() => {
          this.Loading("加载中...", 0.5);
        });
      });
    });
  }
};
</script>

<style scoped lang="less">
.func {
  .func-branch {
    text-align: left;
    display: flex;
    height: 50px;
    background: #fff;
    border-bottom: 2px solid #ccc;

    .func-branch-text {
      flex: 1;
      padding-left: 6px;
      display: flex;
      align-items: center;
    }

    input {
      flex: 1;
      border: 0;
      height: 50px;
      text-align: right;
      padding-right: 6px;
    }
  }

  .big {
    height: 100%;
  }

  .flex-big {
    display: flex;
    flex-wrap: wrap;
    width: 176px;
    justify-content: flex-end;
    padding-top: 8px;
  }

  .vant-but {
    background: #fff;
    border: 0;
    color: #969696;
  }

  .van-cell-group {
    width: 300px;
  }

  textarea {
    width: 100%;
    height: 80px;
    border: 0;
    border-bottom: 2px solid #ccc;
  }

  .bottom-but {
    margin-top: 15px;
    padding: 0 20px;

    button {
      width: 100%;
      height: 37px;
      background: #50af08;
      color: #fff;
    }
  }

  .Login,
  .Login-Img {
    position: fixed;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(110, 110, 110, 0.4);
    z-index: 9999;
    text-align: center;
  }

  .Login-text {
    position: absolute;
    top: 42%;
    left: 35%;
  }

  .van-loading {
    position: absolute;
    top: 45%;
    left: 45%;
  }

  .van-uploader__upload {
    margin: 0 !important;
  }

  button {
    border: 0;
  }
}
</style>
