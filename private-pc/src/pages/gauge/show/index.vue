<template>
  <div class="view">
    <Tabs :check-item.sync="checkItem" @callback="callback" class="left-box"/>
    <center class="center-box" ref="center" :check-item="checkItem"></center>
  </div>
</template>
<script>
import Tabs from './Tabs'
import Center from './center'
export default {
  data () {
    return {
      checkItem: {
        item: {
          question: {
            options: []
          }
        },
        index: -1,
        key: -1
      }
    }
  },
  components: {
    Tabs,
    Center
  },
  methods: {
    callback () {
      this.$refs.center.clear()
    }
  }
}
</script>
<style scoped>
  .view {
    padding: 20px;
    height: 100%;
    display: flex;
  }
  .center-box {
    flex: 1;
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

