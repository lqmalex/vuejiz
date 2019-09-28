<template>
  <div class="date">
    <div v-show="showr3" class="Follow">
      <div class="Follow-main">
        <div class="toBack">
          <img src="../../assets/images/Back.png" @click="CloseFollow" />
          <span class="toBack-text">后续记账</span>
        </div>
        <div class="func-branch">
          <span class="func-branch-text">{{Tstring}}金额</span>
          <input type="text" placeholder="0.00" v-model="total_money" />
        </div>
        <div class="func-branch">
          <span class="func-branch-text">{{Tstring}}账户</span>
          <van-button type="primary" class="vant-but" v-if="!Amess" @click="showPopuprr">请选择</van-button>
          <van-button type="primary" class="vant-but" v-else @click="showPopuprr">{{Amess}}</van-button>
          <van-popup v-model="showrr">
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
        <div class="func-branch branchr" style="height:80px">
          <span class="func-branch-text">收入凭证</span>
          <van-uploader :after-read="afterRead2" v-model="fileList2" :before-delete="beforeDel" />
        </div>
        <div class="func-branch">
          <span class="func-branch-text">{{Tstring}}日期</span>
          <van-button type="primary" class="vant-but" @click="showPopuprr2">{{TimeValue}}</van-button>
          <van-popup round position="bottom" style="width: 100%;padding: 0;" v-model="showrr2">
            <van-datetime-picker
              v-model="currentDate"
              @cancel="setShow"
              @confirm="getDate2"
              type="date"
            ></van-datetime-picker>
          </van-popup>
        </div>
        <button @click="SubFollow">保存</button>
      </div>
    </div>
    <div class="toBack">
      <img src="../../assets/images/Back.png" @click="goToFrount" />
      <span class="toBack-text">{{type_string}}详情</span>
    </div>
    <div class="func-branch">
      <span class="func-branch-text">账面{{type_string}}</span>
      <van-button type="primary" class="vant-but" @click="showPopup3">
        {{Tmoney}}
        <img class="img" src="../../assets/images/arrow.png" />
      </van-button>
      <van-popup @close="getOne" v-model="show3">
        <div class="func-branch">
          <span class="func-branch-text">账面{{type_string}}</span>
          <input type="text" v-model="Tmoneyg" />
        </div>
        <button @click="SubEdit">保存</button>
      </van-popup>
    </div>
    <div class="func-branch">
      <span class="func-branch-text">交易对象</span>
      <van-button type="primary" class="vant-but" @click="showPopup2">
        {{Obj}}
        <img class="img" src="../../assets/images/arrow.png" />
      </van-button>
      <van-popup @close="getOne" v-model="show2">
        <div class="func-branch">
          <span class="func-branch-text">交易对象</span>
          <input type="text" v-model="Objg" />
        </div>
        <button @click="SubEdit">保存</button>
      </van-popup>
    </div>
    <div class="func-branch">
      <span class="func-branch-text">{{Tstring}}方式</span>
      <span class="vant-but vant-text">{{Tstring2}}</span>
    </div>
    <div class="func-branch">
      <span class="func-branch-text">{{type_string}}类别</span>
      <span class="vant-but vant-text">{{Cobj}}</span>
    </div>
    <div class="func-branch">
      <span class="func-branch-text">结清状态</span>
      <span class="vant-but vant-text">{{Typer}}</span>
    </div>

    <div v-show="Tshow" v-for="(item,index) in Items" :key="index">
      <div class="Deta-text">第{{index + 1}}笔{{Tstring}}</div>
      <div class="func-branch">
        <span class="func-branch-text">{{Tstring}}金额</span>
        <van-button type="primary" class="vant-but" @click="showPopupr(item.money,index)">
          {{item.money}}
          <img class="img" src="../../assets/images/arrow.png" />
        </van-button>
        <van-popup @close="getOne" v-model="showr" :index="index">
          <div class="func-branch">
            <span class="func-branch-text">{{Tstring}}金额</span>
            <input type="text" v-model="Pmoney" />
          </div>
          <button @click="setEditWei()">保存</button>
        </van-popup>
      </div>
      <div class="func-branch">
        <span class="func-branch-text">{{Tstring}}账户</span>
        <van-button
          type="primary"
          class="vant-but"
          @click="showPopupr1(item.account_name,item.account_id,index)"
        >
          {{item.account_name}}
          <img class="img" src="../../assets/images/arrow.png" />
        </van-button>
        <van-popup @close="getOne" v-model="showr1">
          <van-radio-group v-model="AId">
            <van-cell-group>
              <van-cell
                v-for="(item,index) in Acco"
                :key="index"
                :title="item.name"
                clickable
                @click="AId = item.id"
              >
                <van-radio slot="right-icon" :name="item.id" />
              </van-cell>
            </van-cell-group>
            <button @click="setEditWei()">保存</button>
          </van-radio-group>
        </van-popup>
      </div>
      <div class="func-branch">
        <span class="func-branch-text">收款日期</span>
        <van-button
          type="primary"
          class="vant-but"
          @click="showPopupr2(item.date,index)"
        >{{item.date}}</van-button>
        <div>
          <van-popup
            v-model="showr2"
            round
            position="bottom"
            :style="{ padding:'0',width:'100%',height: '40%' }"
          >
            <van-datetime-picker v-model="timeValue" @confirm="getDate" type="date"></van-datetime-picker>
          </van-popup>
        </div>
      </div>
      <div class="func-branch branchr">
        <span class="func-branch-text">收入凭证</span>

        <div
          style="padding-top: 8px;width:170px;display:flex;flex-wrap:wrap;justify-content: flex-end;"
        >
          <div v-for="(it,ke) in item.images" :key="ke" style="height:80px;width:80px">
            <img :src="it.thumbnail" @click="viewPic2(index,ke)" style="height:100%;width:100%" alt />
          </div>

          <van-uploader :name="index" style="width:80px" :after-read="afterRead" />
        </div>
      </div>
    </div>

    <div v-show="!Tshow" class="func-branch branchr">
      <span class="func-branch-text">收入凭证</span>
      <div
        v-if="Imgs.length > 0"
        style="padding-top: 8px;width:170px;display:flex;flex-wrap:wrap;justify-content: flex-end;"
      >
        <div v-for="(it,ke) in Imgs" :key="ke" style="height:80px;width:80px">
          <img :src="it.thumbnail" @click="viewPic(ke)" style="height:100%;width:100%" alt />
        </div>
        <van-uploader :name="0" style="width:80px" :after-read="afterRead" />
      </div>
      <div v-else>
        <van-uploader :name="0" style="width:80px" :after-read="afterRead" />
      </div>
    </div>
    <div class="Deta-text">备注</div>
    <div class="func-branch">
      <span class="func-branch-text" v-if="!remark">备注(空)</span>
      <span class="func-branch-text" v-else>{{remark}}</span>
      <van-button type="primary" class="vant-but" @click="showPopup">
        <img class="img" src="../../assets/images/arrow.png" />
      </van-button>
      <van-popup v-model="show">
        <textarea v-model="remark" placeholder="请输入备注信息"></textarea>
        <button @click="SubEdit">保存</button>
      </van-popup>
    </div>
    <div class="func-top">
      <div class="func-branch">
        <span class="func-branch-text">记账人</span>
        <span class="vant-but vant-text" style="padding: 0;padding-right: 10px;">{{Meobj}}</span>
      </div>
      <div class="func-branch">
        <span class="func-branch-text" style="flex: 0.3;">记账日期</span>
        <span class="vant-but vant-text" style="padding: 0;padding-right: 10px;">{{loaTime}}</span>
      </div>
      <div class="func-branch">
        <span class="func-branch-text" style="flex: 0.3;">更新日期</span>
        <span class="vant-but vant-text" style="padding: 0;padding-right: 10px;">{{newTime}}</span>
      </div>
      <div class="footer-but" v-show="Tshow">
        <van-button type="primary" class="but vant-but" @click="showPopupr3">后续付款</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import { resolve } from "url";
import { reject } from "q";
import Qs from "qs";
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
  DropdownMenu,
  DropdownItem,
  ImagePreview
} from "vant";
import Api from "../../Api";
export default {
  inject: ["reload"],
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
    [Loading.name]: Loading,
    [DropdownMenu.name]: DropdownMenu,
    [DropdownItem.name]: DropdownItem,
    [ImagePreview.name]: ImagePreview
  },
  data() {
    return {
      book_id: "",
      Token: "",
      Tshow: false,
      //收入或支出
      type_string: "",
      //收款或付款
      Tstring: "",
      //已结清或未结清
      Typer: "",
      //全额或分期
      Tstring2: "",
      //交易对象
      Obj: "",
      Objg: "",
      //类别
      Cobj: "",
      //记账人
      Meobj: "",
      //记账日期
      loaTime: "",
      //更新时间
      newTime: "",
      //备注
      remark: "",
      //金额
      Tmoney: "",
      Tmoneyg: "",
      //实付金额
      Pmoney: "",
      //日期
      DateT: "",
      //账户
      Acco: [],
      //账户名称
      Amess: "",
      //账户id
      AId: "",
      //修改的items主键
      key: "",
      //后续 金额
      total_money: "",
      //后续 账户id
      Aid: "",
      AcId: "",
      //后续 时间
      currentDate: new Date(),
      //后续 时间显示
      TimeValue: "",
      //原始记录id
      Yid: "",
      Dis: "block",
      DisType: "none",
      DisType2: "none",
      fileList: [],
      Items: [],
      Imgs: [],
      Imgs2: [],
      itemId: "",
      fileKey: [],
      Lshow: false,
      timeValue: [],
      fileList2: [],
      option1: [{ text: "请选择", value: "" }],
      show3: false,
      show2: false,
      show: false,
      showr: false,
      showr1: false,
      showr2: false,
      showr3: false,
      showrr: false,
      showrr2: false,
      showrw: false,
      showrwr: false
    };
  },
  methods: {
    /**
     *返回上一页
     */
    goToFrount() {
      this.$router.go(-1);
    },
    /**
     * 获取当前时间
     */
    getCurrent() {
      let time = new Date();
      this.TimeValue = (
        time.getFullYear() +
        "-" +
        (time.getMonth() + 1) +
        "-" +
        time.getDate()
      ).toString();
    },
    setShow() {
      this.showrr2 = false;
    },
    /**
     * 获取账单id
     */
    getBookId() {
      return new Promise((resolve, reject) => {
        resolve(
          ((this.book_id = localStorage.getItem("book_id")),
          (this.Token = localStorage.getItem("token")))
        );
      });
    },
    /**
     * 设置文字
     */
    setString() {
      return new Promise((resolve, reject) => {
        resolve((this.Tstring = this.type_string == "收入" ? "收款" : "付款"));
      });
    },
    /**
     * 获取账单详情 整合数据
     */
    getData(id, token) {
      return new Promise((resolve, reject) => {
        this.axios
          .get(Api.RecDate.Url1 + id + Api.RecDate.Url2 + token)
          .then(data => {
            let num =
              parseFloat(data.data.data.total_money) -
              parseFloat(data.data.data.paid_money);
            this.type_string = data.data.data.type_string;

            this.setString().then(() => {
              resolve(
                (this.AcId = data.data.data.items[0].account_id),
                (this.Yid = data.data.data.id),
                (this.Items = data.data.data.items),
                (this.Imgs = data.data.data.items[0].images),
                (this.Tshow = num == 0 ? false : true),
                (this.Tmoney = data.data.data.total_money),
                (this.Typer = num == 0 ? "已结清" : `未结清(${num})`),
                (this.Tstring2 =
                  num == 0 ? `全额${this.Tstring}` : `分期${this.Tstring}`),
                (this.Obj = data.data.data.company_name),
                (this.Cobj = data.data.data.category_name),
                (this.Meobj = data.data.data.user_nickname),
                (this.loaTime = data.data.data.created_at),
                (this.newTime = data.data.data.updated_at),
                (this.remark = data.data.data.remark)
              );
            });
          });
      });
    },
    viewPic(num) {
      ImagePreview({
        images: this.Imgs2,
        startPosition: num,
        maxZoom: 3,
        minZoom: 1 / 3,
        onClose() {
          // do something
        }
      });
    },
    viewPic2(key, num) {
      let arr = [];
      this.Items.forEach((item, index) => {
        if (index == key) {
          item.images.forEach((val, key2) => {
            arr.push(val.thumbnail);
          });
        }
      });

      ImagePreview({
        images: arr,
        startPosition: num,
        maxZoom: 3,
        minZoom: 1 / 3,
        onClose() {
          // do something
        }
      });
    },
    /**
     * 点击完成按钮时触发的事件
     */
    getDate(value) {
      //调用格式化时间函数
      let time = new Date(value);
      this.DateT = this.timeFormat(time);
      this.showr2 = false;
      this.setEditWei();
    },
    /**
     * 后续 点击完成按钮时触发的事件
     */
    getDate2(value) {
      let time = this.timeFormat(value);
      this.TimeValue = time;
      this.showrr2 = false;
    },
    /**
     * 插件时间调为收款时间
     */
    setTime() {
      this.timeValue = this.timeFormat(this.DateT);
      this.timeValue = new Date(this.timeValue);
    },
    /**
     * 格式化时间
     */
    timeFormat(time) {
      time = new Date(time);
      let year = time.getFullYear();
      let month = time.getMonth() + 1;
      let day = time.getDate();
      return year + "-" + month + "-" + day;
    },
    /**
     * 设置后续账户双向数据绑定
     */
    setAmess(mess, id) {
      this.Amess = mess;
      this.showrr = false;
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
    setOption() {
      this.Acco.forEach((item, index) => {
        let Obj = {
          text: item.name,
          value: item.id
        };
        this.option1.push(Obj);
      });
    },
    /**
     * 文件读取完毕回调函数
     */
    afterRead(file, _this) {
      this.key = _this.name;
      // 调用上传
      this.SubImg(file.file).then(() => {
        this.setEditWei();
      });
    },
    afterRead2(file) {
      this.SubImg(file.file).then(() => {});
    },
    beforeDel(file) {
      this.fileList2.forEach((item, index) => {
        if (item.content == file.content) {
          this.fileList2.splice(index, 1);
          this.fileKey.splice(index, 1);
        }
      });
    },
    /**
     * 上传图片
     */
    SubImg(file) {
      return new Promise((resolve, reject) => {
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
              Toast("文件上传成功");
              resolve(this.fileKey.push(data.data.data.file.fileKey));
            } else {
              this.Loading("上传图片中...", 0.5);
              Toast(`${data.data.data}`);
            }
          });
      });
    },
    /**
     * 修改
     */
    SubEdit() {
      this.Loading("提交数据中", 0);

      this.Tmoneyg = this.Tmoneyg == "" ? this.Tmoney : this.Tmoneyg;
      this.Objg = this.Objg == "" ? this.Obj : this.Objg;

      if (this.Tmoneyg > 99999999) {
        Toast("您输入的金额有误");
        return;
      }

      let data = Qs.stringify({
        total_money: this.Tmoneyg,
        company_name: this.Objg,
        remark: this.remark,
        image_keys: this.fileKey[0]
      });
      this.axios
        .post(
          Api.RecEdit.Url1 + this.book_id + Api.RecEdit.Url2 + this.Token,
          data
        )
        .then(data => {
          if (data.data.status) {
            this.Loading("提交数据中", 0.5);
            Toast("修改成功");
            this.reload();
          } else {
            this.Loading("提交数据中", 0.5);
            Toast(`${data.data.data}`);
          }
        });
    },
    /**
     * 未结清修改
     */
    setEditWei() {
      this.Loading("提交数据中...", 0);
      //获取id key代表主键
      let id = this.Items[this.key].id;
      //利用三元判断是否为空 来填写相应的值
      this.Pmoney =
        this.Pmoney == "" ? this.Items[this.key].money : this.Pmoney;
      this.AId = this.AId == "" ? this.Items[this.key].account_id : this.AId;
      this.DateT = this.DateT == "" ? this.Items[this.key].date : this.DateT;

      //整合数据
      let data = Qs.stringify({
        money: this.Pmoney,
        account_id: this.AId,
        date: this.DateT,
        image_keys: this.fileKey[0]
      });

      //调用接口修改数据
      this.axios
        .post(Api.RecWeoEdit.Url1 + id + Api.RecWeoEdit.Url2 + this.Token, data)
        .then(data => {
          if (data.data.status) {
            this.Loading("提交数据中", 0.5);
            Toast("修改成功");
            this.reload();
          } else {
            this.Loading("提交数据中", 0.5);
            Toast(`${data.data.data}`);
          }
        });
    },
    /**
     * 后续记账提交
     */
    SubFollow() {
      var key = "";
      if (this.fileKey.length > 0) {
        this.fileKey.forEach((item, index) => {
          if (index != this.fileKey.length - 1) {
            key += item + ",";
          } else {
            key += item;
          }
        });
      }

      this.Loading("提交数据中...", 0);
      let data = Qs.stringify({
        record_id: this.Yid,
        money: this.total_money,
        account_id: this.Aid,
        date: this.TimeValue,
        image_keys: key
      });
      this.axios.post(Api.sequel + this.Token, data).then(data => {
        if (data.data.status) {
          this.Loading("提交数据中...", 0.5);
          Toast("记账成功");
          this.reload();
        } else {
          this.Loading("提交数据中...", 0.5);
          Toast(`${data.data.data}`);
        }
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
     *
     */
    showPopup3() {
      this.Tmoneyg = this.Tmoney;
      this.show3 = true;
    },
    showPopup2() {
      this.Objg = this.Obj;
      this.show2 = true;
    },
    showPopup() {
      this.show = true;
    },
    showPopupr(money, key) {
      this.key = key;
      this.Pmoney = money;
      this.showr = true;
    },
    showPopupr1(name, id, key) {
      this.key = key;
      this.AId = id;
      this.showr1 = true;
    },
    showPopupr2(time, key) {
      this.key = key;
      this.timeValue = this.timeFormat(time);
      this.timeValue = new Date(this.timeValue);
      this.showr2 = true;
    },
    showPopupr3() {
      this.showr3 = true;
    },
    CloseFollow() {
      this.showr3 = false;
    },
    showPopuprr() {
      this.showrr = true;
    },
    showPopuprr2() {
      this.showrr2 = true;
    },
    showPopuprw(imgs) {
      this.fileList = imgs;
      this.showrw = true;
    },
    showPopuprwr(imgs) {
      this.fileList = imgs;
      this.showrwr = true;
    },
    /**
     * 弹出框关闭时触发
     */
    getOne() {
      //将在调用接口传递的值赋值为空 避免用户没保存却又提交上去
      [this.Tmoneyg, this.Objg, this.Pmoney, this.AId] = ["", "", "", ""];
    }
  },
  created() {
    this.Loading("加载中...", 0);
    this.getBookId().then(() => {
      this.getCurrent();
      this.getData(this.book_id, this.Token).then(() => {
        this.getAcco(this.Token).then(() => {
          this.setOption();
          this.Imgs.forEach((item, index) => {
            this.Imgs2.push(item.thumbnail);
          });

          this.Loading("加载中...", 0.5);
        });
        if (this.Items.length == 1) {
          this.Lshow = this.Items[0].images.length > 0 ? true : false;
        }
      });
    });
  }
};
</script>

<style scoped lang="less">
.date {
  margin-bottom: 80px;

  .Follow {
    position: fixed;
    width: 100%;
    bottom: 0;
    top: 0;
    z-index: 999;
    background: #fff;

    .Follow-main {
      position: relative;
      height: 100%;
    }
  }

  .toBack {
    height: 35px;
    background: #50af08;
    text-align: left;
    padding: 10px;
    margin-bottom: 5px;
    position: relative;

    .toBack-text {
      position: absolute;
      left: 38%;
      color: #fff;
      top: 14%;
      font-size: 18px;
    }

    img {
      height: 100%;
    }
  }

  .func-branch {
    text-align: left;
    display: flex;
    height: 50px;
    background: #fff;
    border-bottom: 2px solid #ccc;

    .func-branch-text {
      display: flex;
      align-items: center;
      flex: 1;
      padding-left: 6px;
    }

    input {
      flex: 1;
      border: 0;
      height: 50px;
      text-align: right;
      padding-right: 6px;
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
    margin: 0;
    height: 100%;
  }

  .van-popup {
    padding: 20px 20px;
    width: 80%;
    border-radius: 9px;
  }

  .img {
    width: 15px;
    position: absolute;
    top: 17px;
    right: 5px;
  }

  button,
  .but {
    margin-top: 15px;
    width: 100%;
    height: 37px;
    background: #50af08;
    color: #fff;
    text-align: center;
  }

  .vant-text {
    line-height: 50px;
  }

  .Deta-text {
    color: #969696;
    font-size: 14px;
    text-align: left;
    padding-left: 5px;
  }

  textarea {
    width: 100%;
    height: 80px;
    border: 0;
    border-bottom: 2px solid #ccc;
  }

  .func-top {
    margin-top: 20px;
  }

  .branchr {
    height: 100%;
  }

  .footer-but {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 10px 10px;
    background: #fff;
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

  .van-picker {
    border-radius: 9px;
  }

  .van-dropdown-item {
    top: 122px;
  }

  .show_but {
    border: 0;
  }

  button {
    border: 0;
  }
}
</style>
