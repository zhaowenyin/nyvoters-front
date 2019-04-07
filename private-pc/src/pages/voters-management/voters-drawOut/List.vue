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
        :maxlength="18"
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
        :maxlength="11"
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
        label="选民状态"
        prop="type">
         <template slot-scope="scope">
          {{handerstatus(scope.row.status)}}
        </template>
      </el-table-column>
       <el-table-column
        width="180"
        label="自动对比结果">
        <template slot-scope="scope">
          {{scope.row.type===1 ? '个人登记' : '迁出'}}
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

export default {
  data () {
    return {
      downLoading: false,
    }
  },
  computed: {
    ...mapState('votersOut', {
      loading: state => state.loading,
      list: state => state.list,
      total: state => state.total,
      pageSize: state => state.searchParam.pageSize,
      pageNum: state => state.searchParam.pageNum
    }),
    ...mapState('commonData', {
      commonDistrictId: state => state.commonDistrictId
    })
  },
  components: {
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
    ...mapActions('votersOut', [
      'getListData'
    ]),
    ...mapMutations('votersOut', [
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
    handlegender() {
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
    },
    handerAuditStatus(val) {
      let text = ""
      switch(val) {
      case 0:
        text = '未审核'
        break
      case 1:
        text = '不能行使选举权'
        break
      case 2:
        text = '被剥夺政治权利'
        break
      case 3:
        text = '迁出'
        break
      case 4:
        text = '死亡'
        break
      default:
        text = '其他'
      }
      return text
    },
  }
}
</script>
<style scoped>

</style>
