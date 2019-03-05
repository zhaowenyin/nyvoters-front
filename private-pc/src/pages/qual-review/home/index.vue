<template>
  <div class="view">
    资格审查
  </div>
</template>
<script>
import { mapMutations } from 'vuex'

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
    ...mapMutations('home', [
      'clearState'
    ])
  }
}
</script>
<style scoped>
  .view{
    padding: 0px 30px;
  }
</style>
