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
        label="转移原因"
        prop="transferReason" />
       <el-table-column
        width="180"
        label="申请时间">
        <template slot-scope="scope">
          {{formatDateMinute(scope.row.applyTime)}}
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
import { formatDateMinute } from '../../../../utils/format.js'

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
      case 8:
        text = '暂停行使选举权利'
        break
      case 9:
        text = '长期外出下落不明'
        break
      case 10:
        text = '无资格转移证明'
        break
      case 11:
        text = '比对失败'
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
        text = '地址信息错误'
        break
      case 3:
        text = '姓名与身份证不符'
        break
      case 4:
        text = '身份证号码错误'
        break
      case 5:
        text = '迁出'
        break
      case 6:
        text = '死亡'
        break
      case 7:
        text = '不能行使选举权'
        break
      case 8:
        text = '被剥夺政治权利'
        break
      case 9:
        text = '暂停行使选举权'
        break
      case 10:
        text = '长期外出下落不明'
        break
      case 11:
        text = '未持资格转移证明'
        break
      default:
        text = '其他'
      }
      return text
    },
    formatDateMinute
  }
}
</script>
<style scoped>

</style>
