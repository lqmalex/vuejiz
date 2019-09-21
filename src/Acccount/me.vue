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
    Func
  },
  methods: {
    /**
     * 获取用户信息
     */
    getInfo() {
      let Token = localStorage.getItem("token");

      this.axios
        .get(Api.User + Token)
        .then(data => {
          // console.log(data);
          this.name = data.data.data.nickname;
          this.Img = data.data.data.avatar_url;
          // console.log(data);
        })
        .catch(err => {
          console.log(err);
        });
    },
    goToSetMe() {
      this.$router.push("/SetMer");
    }
  },
  created() {
    this.getInfo();
  }
};
</script>

<style scoped>
#me {
  margin-bottom: 80px;
}

.me-hea {
  position: relative;
}

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
}

.me-img {
  width: 25%;
  color: #fff;
  margin: 0 auto;
}

.me-img img {
  width: 100%;
  border-radius: 50%;
}
</style>
