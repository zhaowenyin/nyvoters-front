<template>
  <div class="view">
    <Tabs class="left-box"/>
    <router-view class="center-box"></router-view>
  </div>
</template>
<script>
import Tabs from './Tabs'
export default {
  components: {
    Tabs
  },
  data () {
    return {}
  }
}
</script>
<style scoped>
  .view {
    padding: 20px;
    height: 100%;
    display: flex;
  }
  .left-box {
    height: 100%;
    width: 300px;
  }
  .center-box{
    flex: 1;
    height: 100%;
    margin-left: 20px;
    overflow: hidden;
  }
</style>
