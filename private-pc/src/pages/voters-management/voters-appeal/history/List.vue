<template>
  <div>
    <el-table
      :data="list"
      class="add_table"
      @selection-change="handleSelectionChange"
      v-loading="loading">
      <el-table-column
        label="申述人"
        width="120"
        prop="userName" />
      <el-table-column
        width="180"
        label="身份证号码"
        prop="idNum" />
      <el-table-column
        label="手机号"
        prop="phoneNum" />
      <el-table-column
        width="180"
        label="申请时间">
        <template slot-scope="scope">
          {{formatDate(scope.row.applyTime)}}
        </template>
      </el-table-column>
      <el-table-column
        label="处理人"
        prop="auditer" />
      <el-table-column
        label="处理结论"
        prop="phoneNum" >
         <template slot-scope="scope">
          {{handerauditer(scope.row.status)}}
        </template>
      </el-table-column>
      <el-table-column
        width="180"
        label="处理时间">
        <template slot-scope="scope">
          {{formatDate(scope.row.auditTime)}}
        </template>
      </el-table-column>
       <el-table-column
        label="操作">
        <template slot-scope="scope">
         <el-button
          @click="lookdetail(scope.row)"
          size="small"
          type="text">查看</el-button>
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
      :visible.sync='createDialogVisible'
      :id="id"
      />
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import { formatDate } from '../../../../utils/format.js'
import CreateDialog from './CreateDialog'

export default {
  data () {
    return {
      createDialogVisible: false,
      id: ''
    }
  },
  computed: {
    ...mapState('votersAppealHistory', {
      loading: state => state.loading,
      list: state => state.list,
      total: state => state.total,
      pageSize: state => state.searchParam.pageSize,
      pageNum: state => state.searchParam.pageNum
    })
  },
  components: {
    CreateDialog
  },
  created () {
    this.getListData()
  },
  methods: {
    ...mapActions('votersAppealHistory', [
      'getListData'
    ]),
    // 分页
    handleCurrentChange (val) {
      this.getListData({ pageNum: val })
    },
    handerauditer (val) {
      let text = ""
      switch(val) {
      case 0:
        text = '未处理 '
        break
      case 1:
        text = '对比中'
        break
      default:
        text = '驳回'
      }
      return text
    },
    formatDate,
    lookdetail(row) {
      this.createDialogVisible = true
      this.id = row.id

    }
  }
}
</script>
<style scoped>

</style>
