<template>
  <div class="view">
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
    List,
  },
  created () {
    // 初始化清除数据
    this.clearState()
  },
  methods: {
    ...mapMutations('log', [
      'clearState'
    ]),
    handleNodeClick(data) {
      console.log(data);
    }
  }
}
</script>
<style scoped>
  .view{
    background: #f8f8f8;
    padding: 16px 20px;
  }
</style>
