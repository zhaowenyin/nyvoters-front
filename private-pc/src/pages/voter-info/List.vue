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
        width="80"
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
          {{ handercandidateType(scope.row.candidateType)}}
        </template>
      </el-table-column>
      <el-table-column
        label="选区">
        <template slot-scope="scope">
          {{ scope.row.precinctName }}
        </template>
      </el-table-column>
       <el-table-column
        label="登记方式">
        <template slot-scope="scope">
          {{ handerType(scope.row.registrationType) }}
        </template>
      </el-table-column>
      <el-table-column
        label="比对结果"
        prop="compareResult">
         <template slot-scope="scope">
          {{handerResultStatus(scope.row.compareResult)}}
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
    ...mapState('voterInfo', {
      loading: state => state.loading,
      list: state => state.list,
      total: state => state.total,
      pageSize: state => state.searchParam.pageSize,
      pageNum: state => state.searchParam.page
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
      this.getListData({ precinctId: this.belongAreaId })
    }
  },
  created () {
    if(this.belongAreaId) {
      this.getListData({precinctId: this.belongAreaId })
    }
  },
  methods: {
    ...mapMutations('voterInfo', [
      'saveSelection'
    ]),
    ...mapActions('voterInfo', [
      'getListData'
    ]),
    // 分页
    handleCurrentChange (val) {
      this.getListData({ pageNum: val })
    },
    look (id) {
      console.log(id)
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
        text = ''
      }
      return text
    },
    handerResultStatus(val) {
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
    handerType (val) {
      let text = ""
      switch(val) {
      case 0:
        text = '登记站'
        break
      case 1:
        text = '单位'
        break
      case 2:
        text = '学校'
        break
      case 3:
        text = '个人'
        break
      default:
        text = ''
      }
      return text
    },
    dblclick(val){
      this.$emit('lookDetail',{val,isDisabled: true})
    }
  }
}
</script>
<style scoped>

</style>
