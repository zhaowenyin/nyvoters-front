<template>
  <div>
    <el-table
      :data="list"
      class="add_table"
      @selection-change="handleSelectionChange"
      @row-dblclick="dblclick"
      v-loading="loading">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        label="文件名称"
        prop="fileName" />
       <el-table-column
        label="所属模块"
        prop="module">
        <template slot-scope="scope">
          {{handermodule(scope.row.module)}}
        </template>
      </el-table-column>
      <el-table-column
        label="类型">
         <template slot-scope="scope">
          {{scope.row.type === 1 ? '用户上传' : '系统预置'}}
        </template>
      </el-table-column>
      <el-table-column
        label="上传日期"
      >
        <template slot-scope="scope">
          {{formatDate(scope.row.uploadTime)}}
        </template>
      </el-table-column>
    </el-table>
    <div
      v-show="total"
      class="add_pagination">
      <el-pagination
        @current-change="handleCurrentChange"
        :page-size="pageSize"
        background
        :current-page="pageNum"
        layout="prev, pager, next"
        :total="+total" />
    </div>
  </div>
</template>
<script>
import { mapState, mapActions,mapMutations } from 'vuex'
import { formatDate } from '../../../utils/format.js'

export default {
  data () {
    return {
      downLoading: false,
    }
  },
  computed: {
    ...mapState('fileManage', {
      loading: state => state.loading,
      list: state => state.list,
      total: state => state.total,
      pageSize: state => state.searchParam.pageSize,
      pageNum: state => state.searchParam.pageNum,

    })
  },
  components: {
  },
  created () {
    this.getListData()
  },
  methods: {
    ...mapActions('fileManage', [
      'getListData'
    ]),
    ...mapMutations('fileManage', [
      'saveSelection'
    ]),
    // 分页
    handleCurrentChange (val) {
      this.getListData({ pageNum: val })
    },
    dblclick(val){
      this.$emit('lookDetail',{val,isDisabled: true})
    },
    formatDate,
    handleSelectionChange(val) {
      this.saveSelection(val)
    },
    handermodule(module) {
      let text = ""
      switch(module) {
      case 1:
        text = '选民管理'
        break
      case 2:
        text = '选区管理'
        break
      case 3:
        text = '代表事务管理'
        break
      case 4:
        text = '在线申诉'
        break
      default:
        text = '其他'
      }
      return text

    }

  },

}
</script>
<style scoped>

</style>

