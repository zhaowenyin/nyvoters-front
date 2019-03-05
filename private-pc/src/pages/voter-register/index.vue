<template>
  <div class="view">
    <div class="view-left">
      <CommonTree
        :data="data"
        @node-click="handleNodeClick" />
    </div>
    <div class="view-content">
      <Search />
      <List />
    </div>
  </div>
</template>
<script>
import { mapMutations } from 'vuex'
import Search from './Search'
import List from './List'
import CommonTree from '../../components/common-tree'

export default {
  data () {
    return {
      data: [{
        label: '一级 1',
        children: [{
          label: '二级 1-1',
          children: [{
            label: '三级 1-1-1'
          }]
        }]
      }, {
        label: '一级 2',
        children: [{
          label: '二级 2-1',
          children: [{
            label: '三级 2-1-1'
          }]
        }, {
          label: '二级 2-2',
          children: [{
            label: '三级 2-2-1'
          }]
        }]
      }, {
        label: '一级 3',
        children: [{
          label: '二级 3-1',
          children: [{
            label: '三级 3-1-1'
          }]
        }, {
          label: '二级 3-2',
          children: [{
            label: '三级 3-2-1'
          }]
        }]
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  computed: {

  },
  components: {
    Search,
    List,
    CommonTree
  },
  created () {
    // 初始化清除数据
    this.clearState()
  },
  methods: {
    ...mapMutations('voterRegister', [
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
    display: flex;
  }
  .view-left {
    width: 270px;
    background-color: #ffffff;
    border-right: 1px solid #ddd;
    height: 100%;
    overflow: auto;
    padding-top: 6px;
  }
  .view-content {
    background: #f8f8f8;
    flex: 1;
    padding: 16px 20px;
  }
</style>
