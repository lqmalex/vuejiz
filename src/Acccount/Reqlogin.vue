<template>
  <div id="ReqLogin">
    <div class="paging">
      <router-link to="/login">登录</router-link>
      <router-link to="/req">注册</router-link>
    </div>
    <div class="page">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
  </div>
</template>

<script>
</script>

<style scoped>
#ReqLogin {
  width: 100%;
  position: absolute;
  height: 100%;
  background: url(../assets/images/background6.jpg) no-repeat;
  background-size: cover;
}

.paging {
  display: flex;
  padding-top: 20px;
}

.paging a {
  flex: 1;
  color: #fff;
  font-size: 25px;
}

.page {
  margin-top: 35px;
}

.router-link-exact-active {
  border-bottom: 1px solid #fff;
}
</style>
