<template>
  <div class="book-swipe">
    <van-swipe-cell>
      <slot name="swipe"></slot>
      <template slot="right">
        <slot name="func"></slot>
      </template>
    </van-swipe-cell>
  </div>
</template>

<script>
import {
  SwipeCell,
  Loading,
  Swipe,
  SwipeItem,
  Button,
  Cell,
  CellGroup,
  Toast
} from "vant";
import Api from "../Api";
export default {
  inject: ["reload"],
  components: {
    [Loading.name]: Loading,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [SwipeCell.name]: SwipeCell,
    [Button.name]: Button,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Toast.name]: Toast
  },
  methods: {
    del(_this) {
      //获取id值
      let id = _this.path[4].attributes[1].nodeValue;
      let Token = localStorage.getItem("token");

      this.axios
        .post(Api.Del.Url1 + id + Api.Del.Url2 + Token)
        .then(data => {
          if (data.data.status == true) {
            _this.path[4].style.display = "none";
            //调用刷新方法
            this.reload();
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {
    Toast.clear();
  }
};
</script>

<style lang="less">
.book-swipe {
  background: #fff;
  margin-bottom: 5px;

  .SwipeCell {
    position: relative;
    height: 45px;
  }

  .swipe-img {
    width: 28px;
    position: absolute;
    top: 5px;
    left: 10px;

    img {
      width: 100%;
      position: absolute;
      left: 0;
      top: 14px;
    }
  }

  .van-cell__title {
    text-align: left;
    padding-left: 25px;
  }
}
</style>
