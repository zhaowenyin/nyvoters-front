<template>
  <div class="view">
    <div class="view-left">
      <CommonTree
        :current-node-key="this.belongAreaId"
        node-key="id"
        :expand-on-click-node="false"
        :data="data"
        @node-click="handleNodeClick"/>
    </div>
    <div class="view-content">
      <div class="down" v-if="belongAreaItem.committee" @click="download">数据导出</div>
      <Echart
        :belongAreaItem="belongAreaItem"
        v-if="belongAreaId"
        :belongAreaId="belongAreaId"
      />
    </div>
  </div>
</template>
<script>
import { mapMutations,mapActions,mapState } from 'vuex'
import Echart from './Echart'
import CommonTree from '../../../components/common-tree'
import  output from '../../../utils/output.js'
import { getSession } from '../../../utils/session'

export default {
  data () {
    const authToken = getSession()
    return {
      authToken
    }
  },
  computed: {
    ...mapState('commonData', {
      data: state => state.treeList,
      belongAreaId: state => state.belongAreaId,
      belongAreaItem: state => state.belongAreaItem
    })
  },
  components: {
    Echart,
    CommonTree
  },
  created () {
    this.searchTree({type: 0, id: ''})
  },
  methods: {

    ...mapMutations('commonData', [
      'saveDistrictId',
      'saveDistrictItem'
    ]),
    ...mapActions('commonData', [
      'searchTree',
    ]),
    handleNodeClick(data) {
      if(!data.access) {
        return
      }
      this.saveDistrictId(data.id)
      this.saveDistrictItem(data)
    },
    async download () {
      try {
        output({url: '/doc/download', param: {fileName: '选区选民情况统计表-导出',token:this.authToken.token,belongAreaId:this.belongAreaItem.districtId,id: 11}})
      } catch (err) {
        console.log(err)
      }
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
.down {
  float: right;
  color: blue;
  cursor: pointer;
}
</style>
