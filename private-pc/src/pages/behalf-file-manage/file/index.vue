<template>
  <div class="view">
    <div class="view-left">
      <CommonTree
        :current-node-key="this.belongAreaId"
        node-key="id"
        :expand-on-click-node="false"
        :data="data"
        @node-click="handleNodeClick" />
    </div>
    <div class="view-content">
      <Item
      v-if="$route.query.fileSuffix==='docx'"
      :belongAreaId="belongAreaId"/>
      <OtherFile
      :belongAreaId="belongAreaId"
      :id="$route.query.id"
      v-else/>
    </div>
  </div>
</template>

<script>
import CommonTree from '../../../components/common-tree'
import { mapMutations, mapActions, mapState } from 'vuex'
import Item from './Item'
import OtherFile from './OtherFile'
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
    CommonTree,
    Item,
    OtherFile
  },
  created () {
    if(this.$route.query.id === '-6677295243971456535'){
      //代表名册
      this.searchTree({type: 0, id: '', maxLevel: '2'})
    }else{
      this.searchTree({type: 0, id: ''})
    }
  },
  methods: {
    ...mapMutations('commonData', [
      'saveDistrictId',
    ]),
    ...mapActions('commonData', [
      'searchTree',
    ]),
    handleNodeClick(data) {
      if(!data.access) {
        return
      }
      this.saveDistrictId(data.id)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
    height: 100%;
    overflow: auto;
    flex: 1;
    display: flex;
    flex-direction: column;
    position: relative;
    padding: 0px 20px;
  }
</style>
