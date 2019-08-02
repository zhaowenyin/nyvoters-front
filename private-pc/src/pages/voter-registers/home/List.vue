<template>
  <div>
    <el-table
      :show-header="true"
      :data="list"
      class="add_table expand-tabel"
      :row-key="getRowKeys"
      :expand-row-keys="[this.list[0]&&this.list[0].id]"
      v-loading="loading"
    >
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-table
            :show-header="false"
            :data="props.row.details"
            class="add_table inner-tabel"
            border
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
              prop="updateUserName">
              <template slot-scope="scope">
                {{scope.row.updateUserName}}
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
                {{handerProcessSate(scope.row.processState)}}
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
          width="200"
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
      :tast-id="tastId"
      :operateType="operateType"
      />
  </div>
</template>
<script>
import { mapState, mapActions,mapMutations } from 'vuex'
import { formatDate } from '../../../utils/format.js'
import CreateDialog from './CreateDialog'
import  output from '../../../utils/output.js'
import { getSession } from '../../../utils/session.js'

export default {
  data () {
    const authToken = getSession()
    return {
      downLoading: false,
      createDialogVisible: false,
      tastId: '',
      getRowKeys(row) {
        return row.id
      },
      operateType: null,
      authToken
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
  mounted() {
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
    formatDate,
    handleSelectionChange(val) {
      this.saveSelection(val)
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
    repair(val) {
      this.createDialogVisible = true
      this.operateType = 1
      this.tastId = val.id
    },
    exportFile(val) {
      try {
        output({url: `/import/export/${val.id}`},{params:this.authToken.token})
      } catch (err) {
        console.log(err)
      }
    },
    contrast (val) {
      this.createDialogVisible = true
      this.operateType = 2
      this.tastId = val.id
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
/* .inner-tabel td {
  border-right: none !important;
} */
</style>
