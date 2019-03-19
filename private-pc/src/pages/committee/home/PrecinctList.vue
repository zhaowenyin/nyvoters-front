<template>
  <el-dialog
    title="行政区"
    :visible="visible"
    width="600"
    :before-close="comfirmClose">
    <div class="view">
      <div class="view-left">
        <div>待选</div>
        <el-input
          placeholder="输入关键字进行过滤"
          v-model="filterText">
        </el-input>
        <CommonTree
          :data="data"
          @node-click="handleNodeClick" />
      </div>
      <div>3333</div>
      <div class="view-content">
          已选
      </div>
    </div>
    <div
      slot="footer"
      class="footer">
      <el-button
      @click="submitForm()"
      size="medium"
      :loading="loading"
      type="primary">确定</el-button>
      <el-button
      @click="comfirmClose()"
      size="medium">取消</el-button>
    </div>
  </el-dialog>
</template>
<script>
import {getTree} from './service.js'
import CommonTree from '../../../components/common-tree'
export default {
  data () {
    return {
      loading: false,
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
      currentSelect: '1_1',
      filterText: ''

    }

  },
  props:{
    visible: {
      default: false,
      type: Boolean
    },
    item: {
      default: () => {},
      type: Object
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree2.filter(val)
    }
  },
  created () {

  },
  components: {
    CommonTree
  },
  methods: {
    close () {
      this.$emit('update:visible', false)
    },
    submitForm () {
      this.close()
    },

    async searchTree () {
      const {data} = await getTree()
      this.treeList = data.content
    },
    comfirmClose () {
      this.$confirm('关闭将丢失已编辑的内容，确认关闭？')
        .then(() => {
          this.close()
        })
        .catch(() => {})
    },
    handleNodeClick(data) {
      console.log(data);
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
    height: 100%;
    overflow: auto;
    padding-top: 6px;
  }
  .view-content {
    height: 100%;
    flex: 1;
    display: flex;
    flex-direction: column;
    position: relative;
    padding: 0px 20px;
  }
</style>
<style>
  .table-obj .el-form-item {
    margin: 15px 0;
  }
</style>
