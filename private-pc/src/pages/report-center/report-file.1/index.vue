<template>
  <div class="view">
    <div class="view-left">
       <CommonTree
        :data="data"
        @node-click="handleNodeClick" />
    </div>
    <div class="view-content">
      <File
      :saveDistrictId="saveDistrictId"
      />
    </div>
  </div>
</template>
<script>
import File from './File'
import CommonTree from '../../../components/common-tree'
import {getTree} from './service.js'

export default {
  data () {
    return {
      saveDistrictId: '',
      data: []
    }
  },
  components: {
    File,
    CommonTree
  },
  created () {
    // 初始化清除数据
    this.searchDistrictTree({type: 0, id: ''})
  },
  methods: {
    async searchDistrictTree (payload) {
      const { data } = await getTree(payload)
      console.log(data)
      this.data=[data.content]
    },
    handleNodeClick(data) {
      this.saveDistrictId = data.id
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
    flex:1;
    background: #f8f8f8;
    padding: 16px 20px;
  }
</style>
