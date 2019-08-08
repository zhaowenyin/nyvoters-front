<template>
  <div class="view">
    <div class="view-left">
       <CommonTree
        :expand-on-click-node="false"
        :data="data"
        @node-click="handleNodeClick" />
    </div>
    <div class="view-content">
       <Search
        @searchDistrictTree="searchDistrictTree"
        @lookDetail="lookDetail"
      />
      <List
      @lookDetail="lookDetail"/>
      <CreateDialog
      v-if="createDialogVisible"
      :item='item'
      :isDisabled="isDisabled"
      :visible.sync='createDialogVisible'
      />
    </div>
  </div>
</template>
<script>
import { mapMutations, mapActions, mapState } from 'vuex'
import Search from './Search'
import List from './List'
import CommonTree from '../../../components/common-tree'
import CreateDialog from './CreateDialog'

export default {
  data () {
    return {
      item: {},
      createDialogVisible: false,
      isDisabled: false
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
    CommonTree,
    CreateDialog
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
    },
    lookDetail (val) {
      this.item = val.val
      this.createDialogVisible = true
      this.isDisabled = val.isDisabled
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
    overflow: auto;
  }
</style>
