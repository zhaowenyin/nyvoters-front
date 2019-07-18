<template>
  <div>
    <el-table
      :data="list"
      class="add_table"
      @selection-change="handleSelectionChange"
      v-loading="loading">
      <el-table-column
        label="姓名"
        prop="name" />
      <el-table-column
        label="选委会/选区" >
        <template slot-scope="scope">
         {{scope.row.precinctName || scope.row.committeeName}}
        </template>
      </el-table-column>
      <el-table-column
        label="手机号"
        prop="phoneNum">
        <template slot-scope="scope">
         {{scope.row.phoneNum}}
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
import { formatDate } from '../../../utils/format.js'

export default {
  data () {
    return {
      downLoading: false,
      createDialogVisible: false,
      item: {}
    }
  },
  computed: {
    ...mapState('addressBook', {
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
      this.getListData({precinctId: this.belongAreaId })
    }
  },
  watch: {
    belongAreaId () {
      this.getListData({precinctId: this.belongAreaId })
    }
  },
  methods: {
    ...mapActions('addressBook', [
      'getListData'
    ]),
    ...mapMutations('addressBook', [
      'saveSelection'
    ]),
    // 分页
    handleCurrentChange (val) {
      this.getListData({ pageNum: val })
    },
    formatDate,
    handleSelectionChange(val) {
      this.saveSelection(val)
    }
  }
}
</script>
<style scoped>

</style>
