<template>
  <div class="view">
    <Tabs ref="tabs" class="left-box"/>
    <Center class="center-box" @callback="callback"></Center>
    <right class="right-box"></right>
  </div>
</template>
<script>
import { mapMutations } from 'vuex'
import Tabs from './Tabs'
import Center from './Center'
import Right from './right'

export default {
  data () {
    return {}
  },
  computed: {
  },
  components: {
    Tabs,
    Center,
    Right
  },
  created () {
    // 初始化清除数据
    // this.clearState()
  },
  methods: {
    ...mapMutations('gauge', [
      'clearState'
    ]),
    callback () {
      this.$refs.tabs.$refs.question.search()
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
  .left-box {
    height: 100%;
    width: 330px;
  }
  .center-box{
    flex: 1;
    height: 100%;
    margin-left: 20px;
    overflow: hidden;
  }
  .right-box {
    height: 100%;
    width: 220px;
    display: flex;
    margin-left: 20px;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
</style>
