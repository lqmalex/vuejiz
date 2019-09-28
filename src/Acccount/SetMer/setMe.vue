<template>
  <div class="Set">
    <div class="toBack">
      <img src="../../assets/images/Back.png" @click="goToFrount" />
      <span class="toBack-text">个人信息</span>
    </div>
    <div class="chan" @click="setShow">
      <div style="display:flex;flex-wrap:wrap">
        <div style="height:80px;margin-right:10px">
          <img :src="ImgUrl" style="height:100%;border-radius:50%;" alt />
        </div>
      </div>
      <span>
        <div>昵称: {{NewName}}</div>
        <div>手机号: {{mobile}}</div>
      </span>
    </div>
    <van-popup v-model="show" overlay-class="overlay-one">
      <div class="change">
        <div class="change-text">修改个人信息</div>
        <div class="flex">
          <!-- <div>修改昵称</div> -->
          <input type="text" placeholder="请输入新的用户名" v-model="NewName2" />
        </div>
        <div class="func-branch branchr" style="margin-top:10px;height: 100%;">
          <span class="func-branch-text">修改头像</span>
          <div style="width:175px;display:flex;flex-wrap:wrap">
            <div style="height:80px;margin:0 auto">
              <img :src="ImgUrl" style="height:100%;border-radius:50%;" alt />
            </div>
            <van-uploader :after-read="afterRead" />
          </div>
        </div>

        <button class="but" @click="SetPer">保存</button>
      </div>
    </van-popup>
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
import { resolve } from "url";
import { reject } from "q";
import Qs from "qs";
import Api from "../../Api";
export default {
  inject: ["reload"],
  data() {
    return {
      NewName: "",
      fileKey: "",
      Token: "",
      ImgUrl: "",
      mobile: "",
      show: false,
      NewName2: ""
    };
  },
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
    [Dialog.name]: Dialog
  },
  methods: {
    /**
     *返回上一页
     */
    goToFrount() {
      this.$router.go(-1);
    },
    /**
     * 获取token
     */
    getToken() {
      return new Promise((resolve, reject) => {
        resolve((this.Token = localStorage.getItem("token")));
      });
    },
    /**
     * 获取个人信息
     */
    getMe(token) {
      return new Promise((resolve, reject) => {
        this.axios.get(Api.User + token).then(data => {
          resolve(
            (this.mobile = data.data.data.mobile),
            (this.NewName = data.data.data.nickname),
            (this.ImgUrl = data.data.data.avatar_url)
          );
        });
      });
    },
    /**
     * 文件上传完成触发
     */
    afterRead(file) {
      this.SubImg(file.file);
    },
    /**
     * 图片上传
     */
    SubImg(file) {
      return new Promise((resolve, reject) => {
        this.Loading("图片上传中...", 0);
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
            if (data.data.status) {
              this.Loading("图片上传中...", 0.5);
              resolve(
                (this.fileKey = data.data.data.file.fileKey),
                Toast("文件上传成功,点击保存则可更改")
              );
            } else {
              Toast("文件上传失败");
            }
          });
      });
    },
    /**
     * 修改资料
     */
    SetPer() {
      this.NewName2 = this.NewName2 == "" ? this.NewName : this.NewName2;
      this.Loading("网络正在拼命奔跑...", 0);
      let data = Qs.stringify({
        nickname: this.NewName2,
        avatar: this.fileKey
      });

      this.axios.post(Api.UserUpload + this.Token, data).then(data => {
        if (data.data.status) {
          this.Loading("网络正在拼命奔跑...", 0.5);
          Toast("修改成功");
          this.reload();
        } else {
          Toast(`${data.data.data}`);
        }
      });
    },
    showPopupr() {
      this.show = true;
    },
    Loading(mess, num) {
      Toast.loading({
        mask: true,
        message: mess,
        duration: num
      });
    },
    setShow() {
      this.show = true;
    }
  },
  created() {
    this.Loading("加载中...", 0);
    this.getToken().then(() => {
      this.getMe(this.Token).then(() => {
        this.Loading("加载中...", 0.5);
      });
    });
  }
};
</script>

<style scoped lang="less">
.Set {
  width: 100%;

  .change-text {
    margin-bottom: 5px;
    font-size: 14px;
    color: #969696;
  }

  .toBack {
    height: 35px;
    background: #50af08;
    text-align: left;
    padding: 10px;
    position: relative;

    .toBack-text {
      position: absolute;
      left: 40%;
      color: #fff;
      top: 25%;
      font-size: 18px;
    }

    img {
      height: 100%;
    }
  }

  .vant-but {
    background: #fff !important;
    border: 0;
    color: #969696 !important;
    flex: 1;
    text-align: right;
    position: relative;
    padding: 0 24px;
  }

  .func-branch {
    text-align: left;
    display: flex;
    height: 50px;
    background: #fff;
    border-bottom: 2px solid #ccc;
  }

  .func-branch-text {
    display: flex;
    align-items: center;
    flex: 1;
    padding-left: 6px;
  }

  .change {
    margin-top: 10px;
    padding: 0 15px;

    input {
      flex: 1;
      width: 100%;
      height: 35px;
      border: 0;
      border-bottom: 1px solid #ccc;
      text-align: center;
    }

    button {
      width: 100%;
      height: 37px;
      background: #50af08;
      color: #fff;
      margin-top: 10px;
    }
  }

  .flex {
    display: flex;
    margin-bottom: 10px;

    div {
      flex: 0.2;
    }
  }

  .branchr {
    height: 80px;
  }

  .van-popup {
    width: 80%;
    padding: 20px 0;
    border-radius: 9px;
  }

  .chan {
    background: #fff;
    display: flex;
    padding: 10px 10px;

    span {
      color: #969696;

      div {
        height: 50%;
        display: flex;
        align-items: center;
      }
    }
  }

  button {
    border: 0;
  }
}
</style>
