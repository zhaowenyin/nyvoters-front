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
      <el-menu
        :default-active="activeIndex"
        class="add-menu-x"
        @select="change"
        active-text-color="#d41c1a"
        background-color="#f8f8f8"
        mode="horizontal">
        <el-menu-item
          index="/district/manage">
          选区
        </el-menu-item>
        <el-menu-item
          index="/district/account">
          帐号管理
        </el-menu-item>
      </el-menu>
      <router-view class="content" />
    </div>
  </div>
</template>
<script>
import CommonTree from '../../../components/common-tree'
import { mapMutations,mapActions,mapState } from 'vuex'

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
    CommonTree
  },
  created () {
    this.searchTree({type: 0, id: ''})
  },
  methods: {
    ...mapMutations('commonData', [
      'saveDistrictId',
      'saveDistrictName',
      'saveDistrictItem'
    ]),
    ...mapActions('commonData', [
      'searchTree',
    ]),
    change (index) {
      this.$router.push({ path: index })
    },
    handleNodeClick(data) {
      if(!data.access) {
        return
      }
      this.saveDistrictId(data.id)
      this.saveDistrictName(data.name)
      this.saveDistrictItem(data)
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
    overflow: auto;
  }
</style>
