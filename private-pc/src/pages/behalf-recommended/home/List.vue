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
        label="被推荐人"
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
          {{scope.row.gender === 1 ? '团体推荐' : '选民联名推荐'}}
        </template>
      </el-table-column>
      <el-table-column
        label="推荐类型"
      >
          <template slot-scope="scope">
          {{scope.row.gender === 1 ? '区县代表' : '乡镇代表'}}
        </template>
      </el-table-column>
      <el-table-column
        prop="belongAreaId"
        label="所属选区">
      </el-table-column>
      <el-table-column
        label="状态"
        prop="status" />
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
import { mapState, mapActions,mapMutations } from 'vuex'
import { formatDate } from '../../../utils/format.js'

export default {
  data () {
    return {
      downLoading: false,
    }
  },
  computed: {
    ...mapState('behalfCommended', {
      loading: state => state.loading,
      list: state => state.list,
      total: state => state.total,
      size: state => state.searchParam.size,
      page: state => state.searchParam.page,

    })
  },
  components: {
  },
  created () {
    this.getListData()
  },
  methods: {
    ...mapActions('behalfCommended', [
      'getListData'
    ]),
    ...mapMutations('behalfCommended', [
      'saveSelection'
    ]),
    // 分页
    handleCurrentChange (val) {
      this.getListData({ page: val })
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
