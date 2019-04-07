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
        prop="recommendedPerson" />
      <el-table-column
        width="180"
        label="身份证号码"
        prop="idNum"/>
       <el-table-column
        label="性别"
        prop="gender">
        <template slot-scope="scope">
          {{scope.row.gender === 1 ? '男' : '女'}}
        </template>
      </el-table-column>
      <el-table-column
        label="推荐方式">
         <template slot-scope="scope">
          {{scope.row.gender === 1 ? '团体推荐' : '选民联名推荐'}}
        </template>
      </el-table-column>
      <el-table-column
        label="类型"
      >
        <template slot-scope="scope">
          {{scope.row.gender === 1 ? '区县代表' : '乡镇代表'}}
        </template>
      </el-table-column>
      <el-table-column
        prop="belongAreaId"
        label="所属选区"/>
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
      size: state => state.searchParam.size,
      page: state => state.searchParam.page,

    }),
    ...mapState('districtCommon', {
      commonDistrictId: state => state.commonDistrictId
    }),
  },
  components: {
  },
  watch: {
    commonDistrictId () {
      this.getListData1({commonDistrictId: this.commonDistrictId })
    }
  },
  created () {
    this.getListData1({commonDistrictId: this.commonDistrictId })
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
      this.getListData1({ page: val })
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

