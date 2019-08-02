<template>
  <div>
    <el-table
      :data="list"
      class="add_table"
      v-loading="loading">
      <el-table-column
        label="姓名"
        width="120"
        prop="name" />
      <el-table-column
        width="180"
        label="身份证号码"
        prop="idNum" />
       <el-table-column
        width="100"
        label="性别"
        prop="gender">
        <template slot-scope="scope">
          {{handlegender(scope.row.gender)}}
        </template>
      </el-table-column>
      <el-table-column
        label="手机号"
        prop="phoneNum" />
      <el-table-column
        label="原选区"
        prop="candidateType">
         <template slot-scope="scope">
          {{ scope.row.fromPrecinctName }}
        </template>
      </el-table-column>
      <el-table-column
        label="转移选区"
        prop="type">
         <template slot-scope="scope">
          {{scope.row.toPrecinctName}}
        </template>
      </el-table-column>
       <el-table-column
        label="申请时间">
        <template slot-scope="scope">
          {{formatDate(scope.row.applyTime)}}
        </template>
      </el-table-column>
        <el-table-column
        label="类型">
        <template slot-scope="scope">
          {{scope.row.candidateType===0 ? '发起' : '处理'}}
        </template>
      </el-table-column>
      <el-table-column
        label="状态">
        <template slot-scope="scope">
          {{handerstatus(scope.row.status)}}
        </template>
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <el-button
          @click="repeal(scope.row)"
          size="small"
          type="primary">撤销</el-button>
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
  </div>
</template>
<script>
import { mapState, mapActions,mapMutations } from 'vuex'
import { formatDate } from '../../../../utils/format.js'
import { repealTabel } from './service.js'

export default {
  data () {
    return {
      downLoading: false,
    }
  },
  computed: {
    ...mapState('votersTransferHistory', {
      loading: state => state.loading,
      list: state => state.list,
      total: state => state.total,
      pageSize: state => state.searchParam.pageSize,
      pageNum: state => state.searchParam.pageNum
    })
  },
  components: {
  },
  created () {
    this.getListData({type:0})
  },
  methods: {
    ...mapActions('votersTransferHistory', [
      'getListData'
    ]),
    ...mapMutations('votersTransferHistory', [
      'saveSelection'
    ]),
    // 分页
    handleCurrentChange (val) {
      this.getListData({ pageNum: val})
    },
    look (id) {
      console.log(id)
    },
    handlegender(module) {
      let text = ""
      switch(module) {
      case 0:
        text = '未设置'
        break
      case 1:
        text = '男'
        break
      case 2:
        text = '女'
        break
      default:
        text = '其他'
      }
      return text
    },
    handerstatus (val) {
      let text = ""
      switch(val) {
      case 0:
        text = '待审核'
        break
      case 1:
        text = '转移成功'
        break
      default:
        text = '不同意转移'
      }
      return text
    },
    formatDate,
    async repeal (val) {
      await repealTabel({id: val.id})
      this.getListData()
    }
  }
}
</script>
<style scoped>

</style>
