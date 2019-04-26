<template>
  <div class="view">
    <div class="view-left">
      <CommonTree
        :data="data"
        @node-click="handleNodeClick" />
    </div>
    <div class="view-content">
      <Item
      :belongAreaId="belongAreaId"/>
    </div>
  </div>
</template>

<script>
import CommonTree from '../../../components/common-tree'
import { mapMutations, mapActions, mapState } from 'vuex'
import Item from './Item'
export default {
  data () {
    return {

    }
  },
  computed: {
    activeIndex () {
      return this.$route.path
    },
    ...mapState('commonData', {
      data: state => state.treeList,
      belongAreaId: state => state.belongAreaId
    })
  },
  components: {
    CommonTree,
    Item
  },
  created () {
    this.searchTree({type: 0, id: ''})
    this.saveDistrictId('')
  },
  methods: {
    change (index) {
      this.$router.push({ path: index })
    },
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
    flex: 1;
    display: flex;
    flex-direction: column;
    position: relative;
    padding: 0px 20px;
  }
</style>
