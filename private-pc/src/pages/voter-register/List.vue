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
        label="姓名"
        width="100"
        prop="name" />
      <el-table-column
        width="180"
        label="身份证号码"
        prop="idNum" />
       <el-table-column
        width="50"
        label="性别"
        prop="gender">
        <template slot-scope="scope">
          {{handergender(scope.row.gender)}}
        </template>
      </el-table-column>
      <el-table-column
        width="120"
        label="手机号"
        prop="phoneNum" />
      <el-table-column
        label="参选地类型"
        width="100"
        prop="candidateType">
         <template slot-scope="scope">
          {{ handercandidateType(scope.row.candidateType)}}
        </template>
      </el-table-column>
      <el-table-column
        width="150"
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
      pageSize: state => state.searchParam.pageSize,
      pageNum: state => state.searchParam.pageNum
    }),
    ...mapState('commonData', {
      belongAreaId: state => state.belongAreaId
    })
  },
  components: {
    Pagination
  },
  watch: {
    belongAreaId () {
      this.getListData({ precinctId: this.belongAreaId,pageNum:1})
    }
  },
  created () {
    if (this.belongAreaId === '') {
      return
    }
    this.getListData({precinctId: this.belongAreaId,pageNum:1})
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
      this.getListData({ pageNum: val })
    },
    dblclick(val){
      this.$emit('lookDetail',{val,isDisabled: true})
    },
    formatDate,
    handleSelectionChange(val) {
      this.saveSelection(val)
    },
    handercandidateType(val){
      let text = ""
      switch(val) {
      case 0:
        text = '户籍地'
        break
      case 1:
        text = '居住地'
        break
      case 2:
        text = '单位'
        break
      case 3:
        text = '学校'
        break
      case 4:
        text = '其他'
        break
      default:
        text = '其他'
      }
      return text
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
        text = '登记成功'
      }
      return text
    }
  }
}
</script>
<style scoped>

</style>
