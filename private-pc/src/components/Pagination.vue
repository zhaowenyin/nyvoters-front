<template>
  <div>
    {{autoData}}
    <el-pagination
      v-bind="[$attrs, $props]"
      v-on="$listeners"/>
  </div>
</template>
<script>
// 解决当页没有数据了，往前退，可用于有删除的页面
export default {
  props: {
    pageSize: {
      default: 10,
      type: Number
    },
    total: {
      default: 0,
      type: Number
    },
    currentPage: {
      default: 0,
      type: Number
    }
  },
  data () {
    return {
    }
  },
  computed: {
    autoData () {
      const maxPage = Math.ceil(this.total / this.pageSize) || 1
      if (this.currentPage > maxPage) {
        this.$emit('current-change', maxPage)
      }
      return null
    }
  },
  components: {
  },
  created () {
  },
  methods: {
  }
}
</script>
<style scoped>

</style>
