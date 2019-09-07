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
        label="申述人"
        width="120"
        prop="name" />
      <el-table-column
        label="身份证号"
        prop="idNum" />
      <el-table-column
        label="联系电话"
        prop="phoneNum" />
      <el-table-column
        label="申请时间">
        <template slot-scope="scope">
          {{scope.row.applyTime}}
        </template>
      </el-table-column>
       <el-table-column
        label="申诉书"
        prop="docName" />
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
    ...mapState('votersAppealHome', {
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
    ...mapActions('votersAppealHome', [
      'getListData'
    ]),
    ...mapMutations('votersAppealHome', [
      'saveSelection'
    ]),
    // 分页
    handleCurrentChange (val) {
      this.getListData({ pageNum: val })
    },
    handleSelectionChange(val) {
      this.saveSelection(val)
    },
    formatDate
  }
}
</script>
<style scoped>

</style>
