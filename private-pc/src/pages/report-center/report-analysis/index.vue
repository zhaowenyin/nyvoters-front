<template>
  <div class="view">
    <div class="view-left">
      <CommonTree
        :expand-on-click-node="false"
        :data="data"
        @node-click="handleNodeClick" />
    </div>
    <div class="view-content">
      <Echart
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

export default {
  data () {
    return {

    }
  },
  computed: {
    ...mapState('commonData', {
      data: state => state.treeList,
      belongAreaId: state => state.belongAreaId
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
    ]),
    ...mapActions('commonData', [
      'searchTree',
    ]),
    handleNodeClick(data) {
      this.saveDistrictId(data.id)
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
