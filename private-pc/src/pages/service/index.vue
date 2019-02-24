<template>
  <div class="service-manage">
    <div class="add-button">
      <el-button type="primary" @click="add">创建服务包</el-button>
    </div>
    <el-form :model="form" :inline="true">
      <el-form-item>
        <el-input
          placeholder="请输入服务包名称搜索"
          style="width:250px"
          v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-select clearable v-model="form.state">

        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="search">搜索</el-button>
      </el-form-item>
    </el-form>
    <div>
      <el-table
        :data="tableData"
        stripe
        style="width: 100%;"
        border>
        <el-table-column
          label="ID"
          align="center"
          width="150"
          prop="id"></el-table-column>
        <el-table-column
          label="服务包名称"
          align="center"
          prop="name"></el-table-column>
        <el-table-column
          label="服务周期"
          align="center"
          prop="create_time"></el-table-column>
        <el-table-column
          label="面向居民"
          align="center"
          prop="update_time">
        </el-table-column>
        <el-table-column
          label="状态"
          align="center"
          prop="update_time">
        </el-table-column>
        <el-table-column
          label="创建时间"
          align="center"
          :formatter="formatCreateTime"
          prop="update_time">
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button v-if="scope" type="text" size="small">编辑</el-button>
            <el-button type="text" size="small">停用</el-button>
            <el-button type="text" size="small">启用</el-button>
            <el-button @click="copy(scope.row)" type="text" size="small">复制</el-button>
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
import {formatDateMinute} from "../../utils/format"
import Pagination from '../../components/Pagination.vue'
export default {
  components: {
    Pagination
  },
  data () {
    return {
      form : {
        name: '',
        state: ''
      },
      type: 'create',
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
    add () {
      this.$router.push('/serviceEdit')
    },
    copy (item) {
      console.log(item)
      this.$router.push('/serviceEdit')
    },
    del (item) {
      console.log(item)
    },
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
      // const {data} = await getGaugeList(params)
      const data = {
        data: [{}],
        total_elements: 0
      }
      console.log(params)
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
    }
  }
}
</script>
<style scoped>
  .service-manage {
    display: flex;
    flex-direction: column;
    padding: 20px;
  }
  .add-button {
    margin-bottom: 10px;
  }
</style>
