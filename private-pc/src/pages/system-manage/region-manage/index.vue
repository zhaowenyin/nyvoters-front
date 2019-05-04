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
import { mapMutations, mapActions, mapState } from 'vuex'
import Search from './Search'
import List from './List'
import CommonTree from '../../../components/common-tree'

export default {
  data () {
    return {
    }
  },
  computed: {
    ...mapState('regionManage', {
      data: state => state.treeList
    })
  },
  components: {
    Search,
    List,
    CommonTree
  },
  created () {
    // 初始化清除数据
    this.clearState()
    this.searchDistrictTree({type: 0, id: ''})
  },
  methods: {
    ...mapMutations('regionManage', [
      'clearState',
      'saveDistrictId',
      'saveDistrictName'
    ]),
    ...mapActions('regionManage', [
      'searchDistrictTree',
    ]),
    handleNodeClick(data) {
      this.saveDistrictId(data.id)
      this.saveDistrictName(data.name)
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
