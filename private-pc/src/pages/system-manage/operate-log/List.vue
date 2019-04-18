<template>
  <div class="log">
    <el-table
    :data="list"
    class="add_table"
    v-loading="loading">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        label="时间"
        prop="opTime">
        <template slot-scope="scope">
          {{formatDate(scope.row.opTime)}}
        </template>
      </el-table-column>

      <el-table-column
        width="120"
        label="用户"
        prop="userName"/>
       <el-table-column
        label="模块"
        prop="module">
        <template slot-scope="scope">
          {{scope.row.module}}
        </template>
      </el-table-column>
      <el-table-column
        label="操作">
         <template slot-scope="scope">
          {{scope.row.operate}}
        </template>
      </el-table-column>
      <el-table-column
        label="详情"
      >
        <template slot-scope="scope">
          {{scope.row.details}}
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
import { formatDate } from '../../../utils/format.js'
import { mapState, mapActions } from 'vuex'

export default {
  data () {
    return {

    }
  },
  computed: {
    ...mapState('log', {
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
    ...mapActions('log', [
      'getListData'
    ]),
    // 分页
    handleCurrentChange (val) {
      this.getListData({ pageNum: val })
    },
    formatDate

  }
}
</script>
<style scoped>
  .log{
    background: #f8f8f8;
    padding: 16px 20px;
  }
</style>
