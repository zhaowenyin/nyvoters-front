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
    ...mapState('districtAccount', {
      loading: state => state.loading,
      list: state => state.list,
      total: state => state.total,
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
    this.getListData1({belongAreaId: this.belongAreaId })
  },
  watch: {
    belongAreaId () {
      this.getListData1({belongAreaId: this.belongAreaId })
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
