<template>
  <div class="box">
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
    ...mapMutations('home', [
      'clearState'
    ])
  }
}
</script>
<style scoped>
  .box{
    padding-top: 16px;
  }
</style>
