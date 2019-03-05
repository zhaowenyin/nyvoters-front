<template>
  <div>
    <el-table
      :data="list"
      class="add_table"
      v-loading="loading">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        label="被推荐人"
        prop="name" />
      <el-table-column
        label="身份证号码"
        prop="card" />
      <el-table-column
        label="性别"
        prop="gender" />
      <el-table-column
        label="手机号"
        prop="tel" />
      <el-table-column
        label="参选地类型"
        prop="address_type" />
      <el-table-column
        label="登记日期">
        <template slot-scope="scope">
          {{ formatDate(scope.row.time) }}
        </template>
      </el-table-column>
      <el-table-column
        label="选民状态"
        prop="type" />
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
import { mapState, mapActions } from 'vuex'
import { formatDate } from '../../utils/format.js'

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
      size: state => state.searchParam.size,
      page: state => state.searchParam.page
    })
  },
  components: {
  },
  created () {
    this.getListData()
  },
  methods: {
    ...mapActions('voterRegister', [
      'getListData'
    ]),
    // 分页
    handleCurrentChange (val) {
      this.getListData({ page: val })
    },
    look (id) {
      console.log(id)
    },
    formatDate,
  }
}
</script>
<style scoped>

</style>
