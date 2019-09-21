<template>
  <div class="Set">
    <div class="toBack">
      <img src="../../assets/images/Back.png" @click="goToFrount" />
      <span class="toBack-text">修改账簿</span>
    </div>
    <div class="text">请输入新的账簿名称</div>
    <div class="Edit">
      <input type="text" placeholder="请输入名称" v-model="name" />
      <button class="btn" @click="setEdit">保存</button>
    </div>
  </div>
</template>

<script>
import Qs from "qs";
import { resolve } from "url";
import { reject } from "q";
export default {
  components: {},
  data() {
    return {
      Eid: "",
      name: "",
      Token: ""
    };
  },
  methods: {
    /**
     *返回上一页
     */
    goToFrount() {
      this.$router.push("/Fin");
    },
    /**
     * 获取对应的id
     */
    getId() {
      return new Promise((resolve, reject) => {
        resolve(
          (this.Eid = localStorage.getItem("FinEid")),
          (this.Token = localStorage.getItem("token"))
        );
      });
    },
    /**
     * 获取对应的名称
     */
    setName(token, id) {
      return new Promise((resolve, reject) => {
        this.axios
          .get(`api/book/detail?token=${token}`, {
            params: {
              book_id: id
            }
          })
          .then(data => {
            resolve((this.name = data.data.data.name));
          });
      });
    },
    /**
     * 执行编辑
     */
    setEdit() {
      let id = this.Eid;
      let data = Qs.stringify({
        book_id: id,
        book_name: this.name
      });
      this.axios
        .post(`api/book/update?token=${this.Token}`, data)
        .then(data => {
          if (data.data.status == true) {
            this.$router.push("/Fin");
          }
        });
    }
  },
  created() {
    this.getId().then(() => {
      this.setName(this.Token, this.Eid).then(() => {});
    });
  }
};
</script>

<style scoped>
.Set {
  width: 100%;
  position: relative;
}

.toBack {
  height: 35px;
  background: #50af08;
  text-align: left;
  padding: 10px;
  margin-bottom: 5px;
  position: relative;
}

.toBack-text {
  position: absolute;
  left: 37%;
  color: #fff;
  top: 25%;
  font-size: 18px;
}

.toBack > img {
  height: 100%;
}

.Edit {
  padding: 0 20px;
}

.text {
  text-align: left;
  padding: 0 10px;
  color: #9c9c9c;
  font-size: 14px;
  margin-bottom: 10px;
}

input {
  width: 100%;
  height: 35px;
  margin-bottom: 10px;
  background: rgba(141, 126, 126, 0.2);
}

.btn {
  width: 100%;
  height: 37px;
  color: #fff;
  background: #50af08;
}
</style>
