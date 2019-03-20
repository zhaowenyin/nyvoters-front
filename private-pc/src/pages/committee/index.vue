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
import CommonTree from '../../components/common-tree'
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      data: [{
        id: '1',
        name: '一级 1',
        access: false,
        children: [{
          id: '1_1',
          name: '二级 1-1',
          access: true,
          children: [{
            id: '1_1_1',
            name: '三级 1-1-1',
            access: true,
          }]
        }]
      }, {
        id: '2',
        name: '一级 2',
        children: []
      }],
      currentSelect: '1_1'
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
  methods: {
    ...mapActions('distictHome', [
      'getListData',
    ]),
    ...mapActions('districtAccount', [
      'getListData1',
    ]),
    change (index) {
      this.$router.push({ path: index })
    },
    handleNodeClick(data) {
      console.log(data)
      this.getListData({code: data.id})
      this.getListData1({code: data.id})
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
