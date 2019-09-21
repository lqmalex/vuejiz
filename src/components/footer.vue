<template>
  <div id="footer">
    <slot name="footerItem"></slot>
  </div>
</template>

<script>
</script>

<style scoped>
#footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 60px;
  display: flex;
  background: #fff;
  padding: 5px 0;
  color: #bfbfbf;
}
</style>
