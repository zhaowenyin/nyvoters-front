<template>
  <div class="behalf">
      <Search />
      <List />
  </div>
</template>
<script>
import { mapMutations } from 'vuex'
import Search from './Search'
import List from './List'

export default {
  data () {
    return {
    }
  },
  computed: {

  },
  components: {
    Search,
    List
  },
  created () {
    // 初始化清除数据
    this.clearState()
  },
  methods: {
    ...mapMutations('fileManage', [
      'clearState'
    ]),
    handleNodeClick(data) {
      console.log(data);
    }
  }
}
</script>
<style scoped>
  .behalf{
    background: #f8f8f8;
    padding: 16px 20px;
  }
</style>
