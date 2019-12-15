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
         width="120"
        prop="recommendedPerson" />
      <el-table-column
        width="180"
        label="身份证号码"
        prop="idNum" />
      <el-table-column
        label="性别"
        prop="gender">
        <template slot-scope="scope">
          {{handlegender(scope.row.gender)}}
        </template>
      </el-table-column>
      <el-table-column
        label="推荐方式">
         <template slot-scope="scope">
          {{+scope.row.recommendType === 1 ? '团体推荐' : '选民联名推荐'}}
        </template>
      </el-table-column>
      <el-table-column
        label="类型"
      >
          <template slot-scope="scope">
          {{+scope.row.type === 1 ? '区县代表' : '乡镇代表'}}
        </template>
      </el-table-column>
      <el-table-column
        prop="belongAreaName"
        label="所属选区">
      </el-table-column>
      <el-table-column
        label="状态"
        prop="status">
       <template slot-scope="scope">
          {{handerStatus(scope.row.status)}}
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
import { formatDate } from './../../utils/format.js'

export default {
  data () {
    return {
      downLoading: false,
    }
  },
  computed: {
    ...mapState('initialCandidate', {
      loading: state => state.loading,
      list: state => state.list,
      total: state => state.total,
      pageSize: state => state.searchParam.pageSize,
      pageNum: state => state.searchParam.pageNum,
    }),
    ...mapState('commonData', {
      belongAreaId: state => state.belongAreaId
    })
  },
  components: {
  },
  watch: {
    belongAreaId () {
      this.getListData({ belongAreaId: this.belongAreaId,statusList:['PRELIMINARY_CANDIDATE','FORMAL_CANDIDATE','FORMAL_REPRESENTATIVE'],pageNum:1})
    }
  },
  created () {
    if (this.belongAreaId === '') {
      return
    }
    this.getListData({belongAreaId: this.belongAreaId,statusList:['PRELIMINARY_CANDIDATE','FORMAL_CANDIDATE','FORMAL_REPRESENTATIVE'],pageNum:1})
  },
  methods: {
    ...mapActions('initialCandidate', [
      'getListData'
    ]),
    ...mapMutations('initialCandidate', [
      'saveSelection'
    ]),
    // 分页
    handleCurrentChange (val) {
      this.getListData({ pageNum: val })
    },
    dblclick(val){
      this.$emit('lookDetail',{val,isDisabled: true})
    },
    look (id) {
      console.log(id)
    },
    formatDate,
    handleSelectionChange(val) {
      this.saveSelection(val)
    },
    handlegender(module) {
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
    },
    handerStatus (val) {
      let text = ""
      switch(val) {
      case 'DELETE':
        text = '删除'
        break
      case 'WAIT_SUBMIT':
        text = '待提交'
        break
      case 'WAIT_REVIEW':
        text = '待资格审查'
        break
      case 'REVIEW_FAIL':
        text = '资格审查不通过'
        break
      case 'REVIEW_SUCCESS':
        text = '资格审查通过'
        break
      case 'PRELIMINARY_CANDIDATE':
        text = '初步候选人'
        break
      case 'FORMAL_CANDIDATE':
        text = '正式候选人'
        break
      default:
        text = '正式代表'
      }
      return text
    }
  }
}
</script>
<style scoped>

</style>
