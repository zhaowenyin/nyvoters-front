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
        label="手机号码"
        prop="gender">
        <template slot-scope="scope">
          {{scope.row.phoneNum}}
        </template>
      </el-table-column>
      <el-table-column
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
      total: state => +state.total,
      pageSize: state => state.searchParam.pageSize,
      pageNum: state => state.searchParam.pageNum,

    }),
    ...mapState('commonCommittee', {
      belongAreaId: state => state.belongAreaId
    }),
  },
  components: {
  },
  watch: {
    belongAreaId () {
      this.getListData1({ precinctId: this.belongAreaId,pageNum: 1 })
    }
  },
  created () {
    if(this.belongAreaId !== '') {
      this.getListData1({precinctId: this.belongAreaId,pageNum: 1 })
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
    dblclick(val){
      this.$emit('lookDetail',{val,isDisabled: true})
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
