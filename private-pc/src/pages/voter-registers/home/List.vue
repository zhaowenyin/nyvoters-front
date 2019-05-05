<template>
  <div>
    <el-table
      :show-header="true"
      :data="list"
      class="add_table expand-tabel"
      border
      v-loading="loading"
    >
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-table
            :show-header="false"
            :data="props.row.details"
            class="add_table"
            >
            <el-table-column
              label="分类"
              width="48"
              prop="">
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
              <template slot-scope="scope">
                {{handerProcessSate(scope.row.processSate)}}
              </template>
            </el-table-column>
              <el-table-column
              width="150"
              label="操作"
            >
            </el-table-column>
          </el-table>
        </template>
      </el-table-column>
      <el-table-column
        label="分类"
        prop="">
        <template slot-scope="scope">
          {{scope.row.type}}
           导入记录
        </template>
      </el-table-column>
      <el-table-column
          label="导入时间"
          width='120'
          prop="">
        </el-table-column>
        <el-table-column
          label="操作人"
          prop="">
        </el-table-column>
        <el-table-column
          label="登记类型">
        </el-table-column>
        <el-table-column
          label="总数"
          prop=""
        />
        <el-table-column
          prop=""
          label="成功数">
        </el-table-column>
        <el-table-column
          label="失败数"
          prop="" />
          <el-table-column
          label="进度"
          prop="" >
        </el-table-column>
        <el-table-column
          width="150"
          label="操作"
        >
        <template slot-scope="scope">
          <el-button v-if="scope.row.lastFailNum>0&&scope.row.lastProcessSate!==1" size="small" @click="repair(scope.row)" type="text">修复</el-button>
          <el-button  v-if="scope.row.lastFailNum>0&&scope.row.lastProcessSate!==1" size="small" @click="exportFile(scope.row)" type="text">导出失败数据</el-button>
          <el-button size="small" v-if="scope.row.lastProcessSate==1"  @click="contrast(scope.row)" type="text">对比</el-button>
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
      <CreateDialog
      v-if="createDialogVisible"
      :visible.sync='createDialogVisible'
      :last-id="lastId"
      />
  </div>
</template>
<script>
import { mapState, mapActions,mapMutations } from 'vuex'
import { formatDate } from '../../../utils/format.js'
import CreateDialog from './CreateDialog'
import  output from '../../../utils/output.js'

export default {
  data () {
    return {
      downLoading: false,
      createDialogVisible: false,
      lastId: null
    }
  },
  computed: {
    ...mapState('voterRegisters', {
      loading: state => state.loading,
      list: state => state.list,
      total: state => state.total,
      pageSize: state => state.searchParam.pageSize,
      pageNum: state => state.searchParam.pageNum,

    })
  },
  components: {
    CreateDialog
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
      this.getListData({ pageNum: val })
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
      this.createDialogVisible = true
      this.lastId = null
    },
    exportFile(val) {
      try {
        output({url: '/doc/download', params: {id: val.id, module: 1}})
      } catch (err) {
        console.log(err)
      }
    },
    contrast (val) {
      console.log(val)
      this.createDialogVisible = true
      this.lastId = val.lastId
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
 .expand-tabel .el-table__expanded-cell[class*=cell] {
    padding: 0px 0px;
}
</style>
