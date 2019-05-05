<template>
  <div>
    <el-table
      :data="list"
      @selection-change="handleSelectionChange"
      class="add_table"
      v-loading="loading">
   <el-table-column
        type="selection"
        width="55">
      </el-table-column>
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
          {{handergender(scope.row.gender)}}
        </template>
      </el-table-column>
      <el-table-column
        label="手机号"
        prop="phoneNum" />
      <el-table-column
        label="参选地类型"
        width="100"
        prop="candidateType">
         <template slot-scope="scope">
          {{ scope.row.candidateType === 0 ? '户籍地' : '现居地'}}
        </template>
      </el-table-column>
      <el-table-column
        width="180"
        label="登记日期">
        <template slot-scope="scope">
          {{ formatDate(scope.row.registrationTime) }}
        </template>
      </el-table-column>
      <el-table-column
        label="选民状态"
        prop="status">
         <template slot-scope="scope">
          {{handerstatus(scope.row.status)}}
        </template>
      </el-table-column>
    </el-table>
    <div
      v-show="total"
      class="add_pagination">
      <Pagination
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
import { mapState, mapActions, mapMutations } from 'vuex'
import { formatDate } from '../../../utils/format.js'
import Pagination from '../../../components/Pagination'

export default {
  data () {
    return {
      downLoading: false
    }
  },
  computed: {
    ...mapState('voterRegistersData', {
      loading: state => state.loading,
      list: state => state.list,
      total: state => state.total,
      pageSize: state => state.searchParam.pageSize,
      pageNum: state => state.searchParam.pageNum
    }),
    ...mapState('commonData', {
      belongAreaId: state => state.belongAreaId
    }),
  },
  components: {
    Pagination
  },
  created () {
    if (this.belongAreaId === '') {
      return
    }
    this.getListData({ precinctId: this.belongAreaId })
  },
  watch: {
    belongAreaId () {
      this.getListData({precinctId: this.belongAreaId })
    }
  },
  methods: {
    ...mapActions('voterRegistersData', [
      'getListData'
    ]),
    ...mapMutations('voterRegistersData', [
      'saveSelection'
    ]),
    // 分页
    handleCurrentChange (val) {
      this.getListData({ pageNum: val })
    },
    look (id) {
      console.log(id)
    },
    handleSelectionChange(val) {
      this.saveSelection(val)
    },
    formatDate,
    handergender(val) {
      let text = ""
      switch(val) {
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
        text = '待对比'
        break
      case 1:
        text = '对比中'
        break
      case 2:
        text = '待资格审查'
        break
      default:
        text = '登记成功'
      }
      return text
    }
  }
}
</script>
<style scoped>

</style>
