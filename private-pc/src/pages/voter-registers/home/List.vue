<template>
  <div>
    <div
       v-for="(i, index) in list"
      :key="index">
      <el-table
        :show-header="index===0"
        :data="i.details"
        class="add_table"
        border
        v-loading="loading">
        <el-table-column
          align="right"
          width="55">
           <template slot-scope="scope">
            {{scope.row.id==='' ? '-' : ''}}
          </template>
        </el-table-column>
        <el-table-column
          label="分类"
          prop="type">
          <template slot-scope="scope">
            {{handertype(scope.row.type)}}
          </template>
        </el-table-column>
        <el-table-column
          label="导入时间"
          width='120'
          prop="importTime">
          <template slot-scope="scope">
            {{formatDate(scope.row.importTime)}}
          </template>
        </el-table-column>
        <el-table-column
          label="操作人"
          prop="operater">
          <template slot-scope="scope">
            {{handergender(scope.row.operater)}}
          </template>
        </el-table-column>
        <el-table-column
          label="登记类型">
          <template slot-scope="scope">
            {{handerRegistrationType(scope.row.registrationType	)}}
          </template>
        </el-table-column>
        <el-table-column
          label="总数"
          prop="num"
        />
        <el-table-column
          prop="successNum"
          label="成功数">
        </el-table-column>
        <el-table-column
          label="失败数"
          prop="failNum" />
          <el-table-column
          label="进度"
          prop="processSate" >
          >
          <template slot-scope="scope">
            {{handerProcessSate(scope.row.processSate)}}
          </template>
        </el-table-column>
          <el-table-column
          fixed="right"
          width="150"
          label="操作"
        >
          <template slot-scope="scope">
            <el-button size="small" @click="repair(scope.row.id)" type="text">修复</el-button>
            <el-button size="small" @click="exportFile(scope.row.id)" type="text">导出失败数据</el-button>
            <el-button size="small" @click="contrast(scope.row.id)" type="text">对比</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div
      v-show="total"
      class="add_pagination">
      <el-pagination
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
import { mapState, mapActions,mapMutations } from 'vuex'
import { formatDate } from '../../../utils/format.js'

export default {
  data () {
    return {
      downLoading: false,
    }
  },
  computed: {
    ...mapState('voterRegisters', {
      loading: state => state.loading,
      list: state => state.list,
      total: state => state.total,
      size: state => state.searchParam.size,
      page: state => state.searchParam.page,

    })
  },
  components: {
  },
  created () {
    this.getListData()
  },
  methods: {
    ...mapActions('voterRegisters', [
      'getListData'
    ]),
    ...mapMutations('voterRegisters', [
      'saveSelection'
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
      case 3:
        text = '其他'
        break
      default:
        text = ''
      }
      return text
    },
    handerRegistrationType (val) {
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
      default:
        text = ''
      }
      return text
    },
    handerProcessSate (val) {
      let text = ""
      switch(val) {
      case 0:
        text = '导入中'
        break
      case 1:
        text = '对比中'
        break
      case 2:
        text = '导入完成'
        break
      case 3:
        text = '待修复'
        break
      default:
        text = ''
      }
      return text
    },
    handertype (val) {
      let text = ""
      switch(val) {
      case 0:
        text = '导入'
        break
      case 1:
        text = '修复'
        break
      default:
        text = '导入记录'
      }
      return text
    },
    repair() {

    },
    exportFile() {

    },
    contrast () {

    }
  }
}
</script>
<style scoped>

</style>
<style>
.table1 .el-table__empty-block {
  display: none;
 }
</style>
