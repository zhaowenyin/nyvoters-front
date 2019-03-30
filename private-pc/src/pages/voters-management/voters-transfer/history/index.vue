<template>
  <div class="view">
    <div class="view-left">
      <CommonTree
        :data="data"
        :current-node-key="currentSelect"
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
import CommonTree from '../../../components/common-tree'

export default {
  data () {
    return {
      data: [{
        id: '1',
        name: '一级 1',
        access: false,
        children: [{
          id: '1_1',
          name: '二级 1-1',
          access: true,
          children: [{
            id: '1_1_1',
            name: '三级 1-1-1',
            access: true,
          }]
        }]
      }, {
        id: '2',
        name: '一级 2',
        children: []
      }],
      currentSelect: '1_1'
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
    ...mapMutations('votersOut', [
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
