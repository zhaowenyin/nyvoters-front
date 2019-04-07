<template>
  <div class="view">
    <div class="view-left">
      <CommonTree
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
          index='/committee/manage'>
          委员会
        </el-menu-item>
        <el-menu-item
          index="/committee/account">
          帐号管理
        </el-menu-item>
      </el-menu>
      <router-view class="content" />
    </div>
  </div>
</template>

<script>
import CommonTree from '../../../components/common-tree'
import { mapMutations } from 'vuex'
import {getTree} from '../../../common-data/service.js'

export default {
  data () {
    return {
      data: []
    }
  },
  computed: {
    activeIndex () {
      return this.$route.path
    }
  },
  components: {
    CommonTree
  },
  created () {
    this.searchTree()
    this.saveDistrictId('')
  },
  methods: {
    ...mapMutations('commonData', [
      'saveDistrictId',
    ]),
    change (index) {
      this.$router.push({ path: index })
    },
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
