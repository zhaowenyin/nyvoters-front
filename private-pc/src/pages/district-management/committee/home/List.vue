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
        label="选委会"
        prop="name" />
      <el-table-column
        label="选委会编码"
        prop="code" />
      <el-table-column
        label="联系人"
        prop="gender">
        <template slot-scope="scope">
          {{scope.row.manager}}
        </template>
      </el-table-column>
      <el-table-column
        label="手机号码"
        prop="gender">
        <template slot-scope="scope">
          {{scope.row.phoneName}}
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
    ...mapState('committeeHome', {
      loading: state => state.loading,
      list: state => state.list,
      total: state => +state.total,
      pageSize: state => state.searchParam.pageSize,
      pageNum: state => state.searchParam.pageNum,
    }),
    ...mapState('commonCommittee', {
      committeeId: state => state.belongAreaId
    })
  },
  components: {
  },
  watch: {
    committeeId () {
      this.getListData({ committeeId: this.committeeId,pageNum: 1 })
    }
  },
  created () {
    if(this.committeeId !== '') {
      this.getListData({committeeId: this.committeeId,pageNum: 1 })
    }
  },
  methods: {
    ...mapActions('committeeHome', [
      'getListData'
    ]),
    ...mapMutations('committeeHome', [
      'saveSelection'
    ]),
    // 分页
    handleCurrentChange (val) {
      this.getListData({ pageNum: val })
    },
    dblclick(val){
      this.$emit('lookDetail',{val,isDisabled: true})
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
