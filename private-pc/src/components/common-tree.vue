<template>
  <div>
    <el-input
      v-if="hasSearch"
      placeholder="请输入关键字进行过滤"
      size="medium"
      class="input"
      v-model="filterText">
    </el-input>
    <el-tree
      class="add-tree"
      ref="tree"
      icon-class="tree-icon"
      :filter-node-method="filterNode"
      v-bind="[$attrs, $props]"
      :render-content="renderContent"
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
          label: 'name',
          disabled: 'access'
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
    },
    hasSearch: {
      default: false,
      type: Boolean
    }

  },
  data () {
    return {
      filterText: ''
    }
  },
  computed: {

  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val)
    }
  },
  components: {
  },
  created () {
  },
  methods: {
    filterNode(value, data) {
      if (!value) return true;
      return data.name.indexOf(value) !== -1;
    },
    renderContent (h, { node }){
      return (
        <span>
          {node.disabled&&<span class="disabel">{node.label}</span>}
          {!node.disabled&&<span>{node.label}</span>}
        </span>)
    }
  }
}
</script>
<style scoped>

</style>
<style>
  .disabel {
    color: #d8d8d8;
    cursor: not-allowed;
  }
</style>
