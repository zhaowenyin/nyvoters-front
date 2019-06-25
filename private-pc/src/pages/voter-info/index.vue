<template>
  <div class="view">
    <div class="view-left">
      <!-- :hasSearch="true" 可搜索 -->
      <CommonTree
      :current-node-key="this.belongAreaId"
      node-key="id"
      :expand-on-click-node="false"
      :data="data"
      @node-click="handleNodeClick" />
    </div>
    <div class="view-content">
     <Search/>
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
import { mapMutations,mapActions,mapState } from 'vuex'
import Search from './Search'
import List from './List'
import CommonTree from '../../components/common-tree'
import CreateDialog from '../voter-register/CreateDialog'

export default {
  data () {
    return {
      item: {},
      createDialogVisible: false,
      isDisabled: false
    }
  },
  computed: {
    ...mapState('commonData', {
      data: state => state.treeList,
      belongAreaId: state => state.belongAreaId
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
    this.searchTree({type: 0, id: ''})
  },
  methods: {
    ...mapMutations('voterInfo', [
      'clearState'
    ]),
    ...mapMutations('commonData', [
      'saveDistrictId',
    ]),
    ...mapActions('commonData', [
      'searchTree',
    ]),
    handleNodeClick(data) {
      this.saveDistrictId(data.id)
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
