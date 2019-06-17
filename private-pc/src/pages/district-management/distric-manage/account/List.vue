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
        prop="name" />
      <el-table-column
        label="登录账号"
        prop="account" />
      <el-table-column
        label="角色"
        prop="gender">
        <template slot-scope="scope">
          {{handerRole(scope.row.accountRole)}}
        </template>
      </el-table-column>
      <el-table-column
        label="账号类型"
        prop="accountType">
        <template slot-scope="scope">
          {{handerType(scope.row.accountType)}}
        </template>
      </el-table-column>
        <el-table-column
        label="角色"
        prop="gender">
        <template slot-scope="scope">
          {{handerRole(scope.row.accountRole)}}
        </template>
      </el-table-column>

      <el-table-column
        label="选区"
        prop="precinctName" />
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
import { formatDate } from '../../../../utils/format.js'

export default {
  data () {
    return {
      downLoading: false,
    }
  },
  computed: {
    ...mapState('districtAccount', {
      loading: state => state.loading,
      list: state => state.list,
      total: state => +state.total,
      pageSize: state => state.searchParam.pageSize,
      pageNum: state => state.searchParam.pageNum,

    }),
    ...mapState('commonData', {
      belongAreaId: state => state.belongAreaId
    }),
  },
  components: {
  },
  created () {
    if(this.belongAreaId!=='') {
      this.getListData1({precinctId: this.belongAreaId })
    }
  },
  watch: {
    belongAreaId () {
      this.getListData1({precinctId: this.belongAreaId })
    }
  },
  methods: {
    ...mapActions('districtAccount', [
      'getListData1'
    ]),
    ...mapMutations('districtAccount', [
      'saveSelection'
    ]),
    // 分页
    handleCurrentChange (val) {
      this.getListData1({ pageNum: val })
    },
    dblclick(val){
      this.$emit('lookDetail',{val,isDisabled: true})
    },
    formatDate,
    handleSelectionChange(val) {
      this.saveSelection(val)
    },
    handerRole(val){
      let text = ""
      switch(val) {
      case 0:
        text = '其他'
        break
      case 1:
        text = ' 超级管理员'
        break
      case 2:
        text = '市级选委会'
        break
      case 3:
        text = '一般选委会'
        break
      case 4:
        text = '选区管理员'
        break
      case 5:
        text = '工作人员'
        break
      default:
        text = ''
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
      default:
        text = ''
      }
      return text
    }

  }
}
</script>
<style scoped>

</style>
