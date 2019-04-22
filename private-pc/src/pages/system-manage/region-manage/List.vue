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
        label="行政区名"
        prop="name" />
      <el-table-column
        label="行政区代码"
        prop="code" />
      <el-table-column
        label="级别"
        prop="level">
        <template slot-scope="scope">
          {{handerlevel(scope.row.level)}}
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
    }
  },
  computed: {
    ...mapState('regionManage', {
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
    this.getListData({ belongAreaId: this.belongAreaId })
  },
  watch: {
    belongAreaId () {
      this.getListData({belongAreaId: this.belongAreaId })
    }
  },
  methods: {
    ...mapActions('regionManage', [
      'getListData'
    ]),
    ...mapMutations('regionManage', [
      'saveSelection'
    ]),
    // 分页
    handleCurrentChange (val) {
      this.getListData({ pageNum: val })
    },
    look (id) {
      console.log(id)
    },
    formatDate,
    handleSelectionChange(val) {
      this.saveSelection(val)
    },
    handerlevel(val) {
      let text = ""
      switch(val) {
      case 0:
        text = '省'
        break
      case 1:
        text = '市'
        break
      case 2:
        text = '县区'
        break
      case 3:
        text = '乡镇'
        break
      default:
        text = '村'
      }
      return text

    }

  }
}
</script>
<style scoped>

</style>
