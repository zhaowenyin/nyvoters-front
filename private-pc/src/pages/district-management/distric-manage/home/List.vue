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
        label="选区名称"
        prop="name" />
      <el-table-column
        label="选区编码"
        prop="code" />
      <el-table-column
        label="类型"
        prop="gender">
        <template slot-scope="scope">
          {{+scope.row.type === 0 ? "区县选区" : '乡镇选区'}}
        </template>
      </el-table-column>
      <el-table-column
        label="代表名额"
        prop="gender">
        <template slot-scope="scope">
          {{scope.row.pnum}}
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
        :total="+total" />
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
    ...mapState('distictHome', {
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
    if(this.belongAreaId!=='') {
      this.getListData({precinctId: this.belongAreaId,pageNum: 1 })
    }
  },
  watch: {
    belongAreaId () {
      this.getListData({precinctId: this.belongAreaId,pageNum: 1 })
    }
  },
  methods: {
    ...mapActions('distictHome', [
      'getListData'
    ]),
    ...mapMutations('distictHome', [
      'saveSelection'
    ]),
    // 分页
    handleCurrentChange (val) {
      this.getListData({ pageNum: val })
    },
    formatDate,
    handleSelectionChange(val) {
      this.saveSelection(val)
    },
    dblclick(val){
      this.$emit('lookDetail',{val,isDisabled: true})
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
