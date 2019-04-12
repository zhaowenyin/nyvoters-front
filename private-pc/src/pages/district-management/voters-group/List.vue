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
        label="小组名称"
         width="120"
        prop="name" />
      <el-table-column
        label="组长"
        prop="manager" />
      <el-table-column
        label="组长联系电话"
        width="180"
        prop="managerPhone" />
      <el-table-column
        label='召集人'
        prop="convener" />
      <el-table-column
        label="召集人联系电话"
        width="180"
        prop="convenerPhone" />
      <el-table-column
        label="类型"
        prop="type">
        <template slot-scope="scope">
          {{scope.row.type === 0 ? "区县小组" : '乡镇小组'}}
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
    ...mapState('voterGroup', {
      loading: state => state.loading,
      list: state => state.list,
      total: state => state.total,
      pageSize: state => state.searchParam.pageSize,
      pageNum: state => state.searchParam.pageNum
    }),
    ...mapState('commonData', {
      belongAreaId: state => state.belongAreaId
    }),
  },
  components: {
  },
  watch: {
    belongAreaId () {
      this.getListData({ belongAreaId: this.belongAreaId })
    }
  },
  created () {
    this.getListData({belongAreaId: this.belongAreaId })
  },
  methods: {
    ...mapActions('voterGroup', [
      'getListData'
    ]),
    ...mapMutations('voterGroup', [
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
    handlegender() {
      let text = ""
      switch(module) {
      case 0:
        text = '未设置'
        break
      case 1:
        text = '男'
        break
      case 2:
        text = '女'
        break
      default:
        text = '其他'
      }
      return text
    }
  }
}
</script>
<style scoped>

</style>
