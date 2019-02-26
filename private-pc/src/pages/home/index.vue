<template>
  <div class="view">
    首页
    {{formatDate('')}}
  </div>
</template>
<script>
import { mapMutations } from 'vuex'
import { formatDate } from '../../utils/format.js'

export default {
  data () {
    return {
    }
  },
  computed: {

  },
  components: {
  },
  created () {
    // 初始化清除数据
    this.clearState()
  },
  methods: {
    ...mapMutations('taskManage', [
      'clearState'
    ]),
    formatDate
  }
}
</script>
<style scoped>
  .view{
    padding: 0px 30px;
  }
</style>
