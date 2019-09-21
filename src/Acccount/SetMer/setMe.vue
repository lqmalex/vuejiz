<template>
  <div class="Set">
    <div class="toBack">
      <img src="../../assets/images/Back.png" @click="goToFrount" />
      <span class="toBack-text">个人信息</span>
    </div>
    <div class="change">
      <input type="text" v-model="NewName" />
      <div class="func-branch branchr" style="margin-top:10px;">
        <span class="func-branch-text">修改头像</span>
        <van-button type="primary" class="vant-but" @click="showPopupr">查看头像</van-button>
        <van-uploader :after-read="afterRead" />
        <van-popup
          v-model="show"
          round
          position="bottom"
          :style="{ padding:'0',width:'100%',height: '40%',background: 'rgb(216,216,216,1)' }"
        >
          <div style="width:65%;margin:0 auto">
            <img :src="ImgUrl" style="width:100%;border-radius:50%;" alt />
          </div>
        </van-popup>
      </div>

      <button class="but" @click="SetPer">保存</button>
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
import { resolve } from "url";
import { reject } from "q";
import Qs from "qs";
export default {
  data() {
    return {
      NewName: "",
      fileKey: "",
      Token: "",
      ImgUrl: "",
      show: false
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
        this.axios.get(`/api/user/profile?token=${token}`).then(data => {
          // console.log(data);
          resolve(
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
        let params = new FormData();
        params.append("file", file);
        let config = {
          headers: {
            //添加请求头
            "Content-Type": "multipart/form-data"
          }
        };

        this.axios
          .post(`/api/upload/image?token=${this.Token}`, params, config)
          .then(data => {
            if (data.data.status == true) {
              resolve(
                (this.fileKey = data.data.data.file.fileKey),
                Toast("文件上传成功")
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
      let data = Qs.stringify({
        nickname: this.NewName,
        avatar: this.fileKey
      });

      this.axios
        .post(`/api/user/profile/update?token=${this.Token}`, data)
        .then(data => {
          if (data.data.status) {
            Toast("修改成功");
          } else {
            Toast(`${data.data.data}`);
          }
        });
    },
    showPopupr() {
      this.show = true;
    }
  },
  created() {
    this.getToken().then(() => {
      this.getMe(this.Token);
    });
  }
};
</script>

<style scoped>
.Set {
  width: 100%;
}

.toBack {
  height: 35px;
  background: #50af08;
  text-align: left;
  padding: 10px;
  position: relative;
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

.toBack-text {
  position: absolute;
  left: 40%;
  color: #fff;
  top: 25%;
  font-size: 18px;
}

.toBack > img {
  height: 100%;
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
  line-height: 80px;
  padding-left: 6px;
}

.change {
  margin-top: 10px;
  padding: 0 15px;
}

.change > input {
  width: 100%;
  background: rgba(141, 126, 126, 0.4);
  height: 35px;
}

.branchr {
  height: 80px;
}

.change button {
  width: 100%;
  height: 37px;
  background: #50af08;
  color: #fff;
  margin-top: 10px;
}
</style>
