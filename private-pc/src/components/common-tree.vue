<template>
  <div>
    <el-tree
      class="add-tree"
      :data="data"
      :props="defaultProps"
      icon-class="tree-icon"
      @node-click="handleNodeClick"></el-tree>
  </div>
</template>
<script>

export default {
  props: {
    data: {
      default: () => [],
      type: Array
    },
    defaultProps: {
      default: () => {
        return {
          children: 'children',
          label: 'label'
        }
      },
      type: Object,
    },
    nodeClick: {
      default: () => {},
      type: Function,
    }
  },
  data () {
    return {
    }
  },
  computed: {

  },
  components: {
  },
  created () {
  },
  methods: {
    handleNodeClick(data) {
      this.$emit('node-click', data)
    }
  }
}
</script>
<style scoped>
</style>
