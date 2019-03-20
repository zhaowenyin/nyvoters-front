<template>
  <el-dialog
    title=""
    :visible="visible"
    width="700px"
    :before-close="comfirmClose">
    <div class="view">
      <div class="view-left">
        <div>待选</div>
        <div class="content">
           <el-input
           style="padding: 10px;"
          placeholder="输入关键字进行过滤"
          v-model="filterText">
          </el-input>
          <CommonTree
            :data="data"
            @node-click="handleNodeClick" />
        </div>

      </div>
      <div class="row-ccontent"><div class="row"/><div class="row up"/></div>
      <div class="view-content">
          已选
        <div class="content">{{selectItem.name}}</div>
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
      data: [],
      filterText: '',
      selectItem: {}

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
    },
  },
  watch: {
    filterText(val) {
      this.$refs.tree2.filter(val)
    }
  },
  created () {
    let val = {}
    if(this.item.id) {
      val = {
        id: this.item.id,
        type: 2
      }
    } else {
      val = {
        type: 2
      }
    }
    this.searchTree(val)
  },
  components: {
    CommonTree
  },
  methods: {
    close () {
      this.$emit('update:visible', false)
    },
    submitForm () {
      this.$emit('saveData', this.selectItem)
      this.close()
    },

    async searchTree () {
      const {data} = await getTree()
      this.data = data
    },
    comfirmClose () {
      this.$confirm('关闭将丢失已编辑的内容，确认关闭？')
        .then(() => {
          this.close()
        })
        .catch(() => {})
    },
    handleNodeClick(data) {
      this.selectItem = data
    }
  }

}
</script>
<style scoped>
.view{
    display: flex;
    height: 100%;
  }
  .view-left {
    flex: 1;
    background-color: #ffffff;
  }
  .view-content {
    flex: 1;
  }
  .content {
    height: 350px;
    border: 1px solid #ccc;
    padding: 10px;
  }
  .row-ccontent {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 50px;
  }
  .row {
      width:0;
      height:0;
      border-left:25px solid #fff;
      border-top:15px solid transparent;
      border-bottom:15px solid transparent;
      position: relative;
      &:after{
        content: '';
        display: block;
        position: absolute;
        top: -12px;
        left: -25px;
        border-left:25px solid #444;
        border-top:15px solid transparent;
        border-bottom:15px solid transparent;
      }
       &.up{
        transform: rotate(180deg);
      }
    }
</style>
<style>
  .table-obj .el-form-item {
    margin: 15px 0;
  }
</style>
