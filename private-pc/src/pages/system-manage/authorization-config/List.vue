<template>
  <div>
    <el-table
      :data="list"
      class="add_table"
      @selection-change="handleSelectionChange"
      v-loading="loading">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        label="姓名"
        prop="name" />
      <el-table-column
        label="登录账号"
        prop="account" />
      <el-table-column
        label="角色"
        prop="accountRole">
        <template slot-scope="scope">
          {{handerRole(scope.row.accountRole)}}
        </template>
      </el-table-column>
      <el-table-column
        label="菜单权限"
        prop="">
        <template slot-scope="scope">
          <el-button
          @click="modyfyForm(scope.row)"
          size="medium"
          type="text">修改</el-button>
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
        :total="total" />
    </div>
    <CreateDialog
      v-if="createDialogVisible"
      :item='item'
      :visible.sync='createDialogVisible'
      />
  </div>
</template>
<script>
import { mapState, mapActions,mapMutations } from 'vuex'
import { formatDate } from '../../../utils/format.js'
import CreateDialog from './CreateDialog'

export default {
  data () {
    return {
      downLoading: false,
      createDialogVisible: false,
      item: {}
    }
  },
  computed: {
    ...mapState('authority', {
      loading: state => state.loading,
      list: state => state.list,
      total: state => +state.total,
      pageSize: state => state.searchParam.pageSize,
      pageNum: state => state.searchParam.pageNum,

    }),
    ...mapState('commonData', {
      belongAreaId: state => state.belongAreaId
    }),
  },
  components: {
    CreateDialog
  },
  created () {
    if(this.belongAreaId!=='') {
      this.getListData({precinctId: this.belongAreaId })
    }
  },
  watch: {
    belongAreaId () {
      this.getListData({precinctId: this.belongAreaId })
    }
  },
  methods: {
    ...mapActions('authority', [
      'getListData'
    ]),
    ...mapMutations('authority', [
      'saveSelection'
    ]),
    // 分页
    handleCurrentChange (val) {
      this.getListData({ pageNum: val })
    },
    modyfyForm(row){
      this.createDialogVisible=true
      this.item = row
    },
    formatDate,
    handleSelectionChange(val) {
      this.saveSelection(val)
    },
    handerRole(val){
      let text = ""
      switch(val) {
      case 0:
        text = '其他'
        break
      case 1:
        text = ' 超级管理员'
        break
      case 2:
        text = '市级选委会'
        break
      case 3:
        text = '一般选委会'
        break
      case 4:
        text = '选区管理员'
        break
      case 5:
        text = '工作人员'
        break
      default:
        text = ''
      }
      return text
    }
  }
}
</script>
<style scoped>

</style>
