<template>
  <div class="gauge-manage">
    <div class="add-button">
      <el-button type="primary" @click="add">创建量表</el-button>
    </div>
    <el-form :model="form" :inline="true">
      <el-form-item>
        <el-input
          placeholder="请输入量表名称搜索"
          style="width:250px"
          v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="search">搜索</el-button>
      </el-form-item>
    </el-form>
    <div>
      <el-table
        :data="tableData"
        stripe
        border
        style="width: 100%;">
        <el-table-column
          label="ID"
          align="center"
          width="150"
          prop="id"></el-table-column>
        <el-table-column
          label="量表"
          align="center"
          prop="name"></el-table-column>
        <el-table-column
          label="创建时间"
          align="center"
          :formatter="formatCreateTime"
          prop="create_time"></el-table-column>
        <el-table-column
          label="更新时间"
          align="center"
          :formatter="formatUpdateTime"
          prop="update_time">
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button @click="edit(scope.row)" type="text" size="small">编辑</el-button>
            <el-button @click="del(scope.row)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination-position">
      <pagination
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="pageSize"
        layout="total, prev, pager, next, jumper"
        :total="total"></pagination>
    </div>
  </div>
</template>
<script>
import {formatDateMinute} from "../../../utils/format"
import Pagination from '../../../components/Pagination.vue'
import {getGaugeList, delGaugeTemplate} from "../service"
import {mapActions, mapMutations} from 'vuex'
export default {
  components: {
    Pagination
  },
  data () {
    return {
      form : {
        name: ''
      },
      total: 0,
      pageSize: 15,
      currentPage: 1,
      tableData: []
    }
  },
  mounted () {
    this.getList()
  },
  methods: {
    ...mapMutations('gauge', [
      'clearState'
    ]),
    ...mapActions('gauge', [
      'getGaugeContent'
    ]),
    handleCurrentChange (val) {
      this.currentPage = val
      this.getList()
    },
    search () {
      this.currentPage = 1
      this.getList()
    },
    async getList () {
      const {form, currentPage, pageSize} = this
      const params = {...form, page: currentPage - 1, page_size: pageSize}
      const {data} = await getGaugeList(params)
      console.log(data)
      if (data) {
        this.tableData = data.data
        this.total = data.total_elements
      }
    },
    formatUpdateTime (row) {
      return formatDateMinute(row.update_time)
    },
    formatCreateTime (row) {
      return formatDateMinute(row.create_time)
    },
    add () {
      // 新增时初始化
      this.clearState()
      this.$router.push('/gauge')
    },
    del (row) {
      this.$confirm('是否确认删除此量表？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const {id} = row
        await delGaugeTemplate({id})
        this.getList()
      }).catch(() => {})
    },
    edit (row) {
      const {id} = row
      this.$router.push({path: '/gauge', query: {id}})
    }
  }
}
</script>
<style scoped>
  .gauge-manage {
    display: flex;
    flex-direction: column;
    padding: 20px;
  }
  .add-button {
    margin-bottom: 10px;
  }
</style>
