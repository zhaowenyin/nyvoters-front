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
        prop="type">
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
        :page-size="size"
        background
        :current-page="page"
        layout="prev, pager, next"
        :total="total" />
    </div>
  </div>
</template>
<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import { formatDate } from '../../utils/format.js'
import Pagination from '../../components/Pagination'

export default {
  data () {
    return {
      downLoading: false
    }
  },
  computed: {
    ...mapState('voterRegister', {
      loading: state => state.loading,
      list: state => state.list,
      total: state => state.total,
      size: state => state.searchParam.size,
      page: state => state.searchParam.page
    }),
    ...mapState('commonData', {
      commonDistrictId: state => state.commonDistrictId
    })
  },
  components: {
    Pagination
  },
  watch: {
    commonDistrictId () {
      this.getListData({ commonDistrictId: this.commonDistrictId })
    }
  },
  created () {
    this.getListData({commonDistrictId: this.commonDistrictId })
  },
  methods: {
    ...mapMutations('voterRegister', [
      'saveSelection'
    ]),
    ...mapActions('voterRegister', [
      'getListData'
    ]),
    // 分页
    handleCurrentChange (val) {
      this.getListData({ page: val })
    },
    look (id) {
      console.log(id)
    },
    formatDate,
    handleSelectionChange(val) {
      this.saveSelection(val)
    },
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
