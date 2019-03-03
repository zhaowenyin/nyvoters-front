<template>
  <div class="view-wrapper">
    <common-header class="view-header" />
    <div class="view-content">
      <common-menu class="view-left" />
      <router-view class="view-right" />
    </div>
  </div>
</template>

<script>
import CommonHeader from '../components/common-header'
import CommonMenu from '../components/common-menu'
export default {
  components: {
    CommonHeader,
    CommonMenu
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .view-wrapper {
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  .view-content {
    flex: 1;
    display: flex;
    overflow: auto;
  }
  .view-left {
    overflow: auto;
    height: 100%;
  }
  .view-right {
    flex: 1;
    overflow: auto;
    height: 100%;
  }
</style>
