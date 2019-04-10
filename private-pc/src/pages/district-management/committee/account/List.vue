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
        label="姓名"
         width="120"
        prop="name" />
      <el-table-column
        width="180"
        label="登录账号"
        prop="account" />
      <el-table-column
        label="手机号码"
        prop="gender">
        <template slot-scope="scope">
          {{scope.row.phoneNum}}
        </template>
      </el-table-column>
      <el-table-column
        width="180"
        label="排序码"
        prop="sort" />
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
    ...mapState('committeeAcccount', {
      loading: state => state.loading,
      list: state => state.list,
      total: state => state.total,
      pageSize: state => state.searchParam.pageSize,
      pageNum: state => state.searchParam.pageNum,

    }),
    ...mapState('commonData', {
      commonDistrictId: state => state.commonDistrictId
    }),
  },
  components: {
  },
  created () {
    this.getListData1({commonDistrictId: this.commonDistrictId })
  },
  watch: {
    commonDistrictId () {
      this.getListData1({commonDistrictId: this.commonDistrictId })
    }
  },
  methods: {
    ...mapActions('committeeAcccount', [
      'getListData1'
    ]),
    ...mapMutations('committeeAcccount', [
      'saveSelection'
    ]),
    // 分页
    handleCurrentChange (val) {
      this.getListData1({ pageNum: val })
    },
    look (id) {
      console.log(id)
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
