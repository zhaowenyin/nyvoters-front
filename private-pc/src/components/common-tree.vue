<template>
  <div>
    <el-tree
      class="add-tree"
      icon-class="tree-icon"
      v-bind="[$attrs, $props]"
      v-on="$listeners"
      ></el-tree>
  </div>
</template>
<script>

export default {
  props: {
    data: {
      default: () => [],
      type: Array
    },
    props: {
      default: () => {
        return {
          children: 'children',
          label: 'name'
        }
      },
      type: Object,
    },
    nodeClick: {
      default: () => {},
      type: Function,
    },
    nodeKey: {
      default: 'id',
      type: String,
    },
    defaultExpandAll: {
      default: true,
      type: Boolean
    },
    highlightCurrent: {
      default: true,
      type: Boolean
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
