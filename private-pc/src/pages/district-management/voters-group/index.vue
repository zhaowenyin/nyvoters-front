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
import {getTree} from '../../../common-data/service.js'
import CommonTree from '../../../components/common-tree'

export default {
  data () {
    return {
      data: []
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
    this.searchTree({type: 0, id: ''})
    this.saveDistrictId('')
  },
  methods: {
    ...mapMutations('voterGroup', [
      'clearState'
    ]),
    ...mapMutations('commonData', [
      'saveDistrictId',
    ]),
    handleNodeClick(data) {
      this.saveDistrictId(data.id)
    },
    async searchTree () {
      const {data} = await getTree()
      this.data = data.content
    },
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
