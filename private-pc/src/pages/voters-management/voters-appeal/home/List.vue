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
        label="身份证号码"
        prop="idNum" />
      <el-table-column
        label="联系电话"
        prop="phoneNum" />
      <el-table-column
        label="申诉时间">
        <template slot-scope="scope">
          {{formatDateMinute(scope.row.applyTime)}}
        </template>
      </el-table-column>
       <el-table-column
        label="申诉书"
        prop="docName">
        <template slot-scope="scope">
          <el-button
            @click="download(scope.row)"
            size="small"
            type="text">{{scope.row.docName}}</el-button>
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
import { formatDateMinute } from '../../../../utils/format.js'
import output from '../../../../utils/output.js'

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
    formatDateMinute,
    async download (item) {
      try {
        output({url: '/doc/download', param: {id: item.docId,fileName: item.docName}})
      } catch (err) {
        console.log(err)
      }
    },
  }
}
</script>
<style scoped>

</style>
