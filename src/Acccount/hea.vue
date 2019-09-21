<template>
  <div class="header">
    <div class="header-main">
      <div class="header-img">
        <img src="../assets/images/More.png" alt />
      </div>
      <div class="header-img">
        <img src="../assets/images/Dot.png" alt />
      </div>
    </div>
  </div>
</template>

<script>
</script>

<style scoped>
.header {
  position: fixed;
  top: 10px;
  right: 20px;
  z-index: 999;
}

.header-main {
  background: rgba(100, 100, 100, 0.5);
  border-radius: 20px;
  padding: 0 10px;
}

.header-img {
  display: inline-block;
  padding: 5px;
  position: relative;
}

.header-img:first-child {
  border-right: 1px solid #ccc;
}

.header-img img {
  width: 25px;
}
</style>
