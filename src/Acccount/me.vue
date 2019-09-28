<template>
  <div id="me">
    <div class="me-hea">
      <div class="me-back"></div>
      <div class="me-list">
        <div class="me-img" @click="goToSetMe">
          <img :src="Img" alt />
          <div>{{name}}</div>
        </div>
      </div>
    </div>

    <columns></columns>
    <Func></Func>
  </div>
</template>

<script>
import columns from "../components/me/columns";
import Func from "../components/me/meFunc";
import Api from "../Api";
import { resolve } from "url";
import { reject } from "q";
import { Loading, Toast } from "vant";
export default {
  data() {
    return {
      name: "",
      Img: "",
      Token: ""
    };
  },
  components: {
    columns,
    Func,
    [Loading.name]: Loading,
    [Toast.name]: Toast
  },
  methods: {
    /**
     * 获取用户信息
     */
    getInfo() {
      return new Promise((resolve, reject) => {
        let Token = localStorage.getItem("token");

        this.axios
          .get(Api.User + Token)
          .then(data => {
            // console.log(data);
            resolve(
              (this.name = data.data.data.nickname),
              (this.Img = data.data.data.avatar_url)
            );
            // console.log(data);
          })
          .catch(err => {
            console.log(err);
          });
      });
    },
    goToSetMe() {
      this.$router.push("/SetMer");
    },
    Loading(mess, num) {
      Toast.loading({
        mask: true,
        message: mess,
        duration: num
        // closeOnClick: true
      });
    }
  },
  created() {
    this.Loading("加载中", 0);
    this.getInfo().then(() => {
      this.Loading("加载中", 0.5);
    });
  }
};
</script>

<style scoped lang="less">
#me {
  margin-bottom: 80px;

  .me-hea {
    position: relative;

    .me-back {
      width: 100%;
      height: 230px;
      background: url(../assets/images/background1.jpeg) no-repeat;
      background-size: 100%;
    }

    .me-list {
      width: 100%;
      position: absolute;
      top: 20%;

      .me-img {
        width: 25%;
        color: #fff;
        margin: 0 auto;
      }

      img {
        width: 100%;
        border-radius: 50%;
      }
    }
  }
}
</style>
