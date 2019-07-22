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
          {{handlegender(scope.row.gender)}}
        </template>
      </el-table-column>
      <el-table-column
        label="手机号"
        prop="phoneNum" />
      <el-table-column
        label="原选区"
        prop="fromPrecinctName">
         <template slot-scope="scope">
          {{ scope.row.fromPrecinctName }}
        </template>
      </el-table-column>
      <el-table-column
        label="转移选区"
        prop="toPrecinctName">
         <template slot-scope="scope">
          {{scope.row.toPrecinctName}}
        </template>
      </el-table-column>
       <el-table-column
        width="180"
        label="申请时间">
        <template slot-scope="scope">
          {{formatDate(scope.row.registrationTime)}}
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
import { formatDate } from '../../../../utils/format.js'

export default {
  data () {
    return {
      downLoading: false,
    }
  },
  computed: {
    ...mapState('votersTransfer', {
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
    this.getListData()
  },
  methods: {
    ...mapActions('votersTransfer', [
      'getListData'
    ]),
    ...mapMutations('votersTransfer', [
      'saveSelection'
    ]),
    // 分页
    handleCurrentChange (val) {
      this.getListData({ pageNum: val })
    },
    handleSelectionChange(val) {
      this.saveSelection(val)
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
      switch(+val) {
      case 0:
        text = '待对比'
        break
      case 1:
        text = '待资格审查'
        break
      case 2:
        text = '不能行使选举权'
        break
      case 3:
        text = '被剥夺政治权利'
        break
      case 4:
        text = '迁出'
        break
      case 5:
        text = '死亡'
        break
      case 6:
        text = '其他'
        break
      case 7:
        text = '登记成功'
        break
      default:
        text = ''
      }
      return text
    },
    handercompareResult	(val) {
      let text = ""
      switch(val) {
      case 0:
        text = '待对比'
        break
      case 1:
        text = '正常'
        break
      case 2:
        text = '被剥夺政治权利 '
        break
      case 3:
        text = '被剥夺政治权利'
        break
      case 4:
        text = '迁出'
        break
      case 5:
        text = '死亡'
        break
      default:
        text = '其他'
      }
      return text
    },
    formatDate
  }
}
</script>
<style scoped>

</style>
