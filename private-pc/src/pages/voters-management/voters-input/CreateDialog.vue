<template>
  <el-dialog
    title=""
    :visible="visible"
    width="700px"
    :before-close="comfirmClose">
    <div v-loading="loading" class="view">
      <div class="view-left">
        <div>待选</div>
        <div class="content">
          <CommonTree
            :expand-on-click-node="false"
            :hasSearch="true"
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
import {drawIn} from './service.js'
import CommonTree from '../../../components/common-tree'
import { mapActions,mapState } from 'vuex'

export default {
  data () {
    return {
      loading: false,
      filterText: '',
      selectItem: {}
    }

  },
  props:{
    visible: {
      default: false,
      type: Boolean
    },
    ids: {
      default: null,
      type: null
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree2.filter(val)
    }
  },
  computed: {
    ...mapState('commonData', {
      data: state => state.treeList
    })

  },
  created () {
    this.searchTree({type: 0,id: ''})
  },
  components: {
    CommonTree
  },
  methods: {
    ...mapActions('votersQualification', [
      'getListData'
    ]),
    ...mapActions('commonData', [
      'searchTree',
    ]),
    close () {
      this.$emit('update:visible', false)
    },

    async submitForm () {
      if(this.selectItem.value) {
        this.$notify({
          title: '',
          message: '请选择区域！',
          type:'warning'
        })
        return
      }
      this.loading = true
      let params = {
        ids: this.ids,
        precinctId: this.selectItem.id
      }
      await drawIn(params)
      this.$notify({
        title: '',
        message: '选民划入成功！',
        type: 'success'
      })
      this.close()
      this.getListData()
      this.loading = false
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
    overflow: auto;
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
