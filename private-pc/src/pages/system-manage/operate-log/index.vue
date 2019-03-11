<template>
  <div class="log">
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
        :page-size="size"
        background
        :current-page="page"
        layout="prev, pager, next"
        :total="total" />
    </div>
  </div>
</template>
<script>
import {getList} from './service.js'
import { formatDate } from '../../../utils/format.js'

export default {
  data () {
    return {
      loading: false,
      list: [],
      total: 0,
      size: 10,
      page: 1
    }
  },
  computed: {

  },
  components: {

  },
  created () {
    this.getListData({ page: 1 })
  },
  methods: {
    // 分页
    handleCurrentChange (val) {
      this.page = val
      this.getListData({ page: val })
    },
    handleSelectionChange() {

    },
    async getListData (payload) {
      this.loading = true
      const { data } = await getList({...payload,size: 10})
      this.list = data.content.data
      this.loading = false
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
