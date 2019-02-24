<template>
  <div class="view-wrapper">
    <common-header class="view-header" />
    <router-view class="view-content" />
  </div>
</template>

<script>
import CommonHeader from '../components/common-header'
export default {
  components: {
    CommonHeader
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
</style>
