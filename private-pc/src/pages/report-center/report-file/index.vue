 <template>
  <div class="download">
    <el-table
      v-loading="loading"
      :data="list"
      style="width: 100%">
      <el-table-column
        prop="fileName"
        label="文件资料">
      </el-table-column>
      <el-table-column
        prop="action"
        label="文件下载">
        <template slot-scope="scope">
          <el-button
          @click="download(scope.row)"
          size="medium"
          type="primary">下载</el-button>
        </template>
      </el-table-column>
      <el-table-column
        prop="action"
        label="在线生成">
        <template slot-scope="scope">
          <el-button
          v-if="scope.row.isFillData===1"
          @click="create(scope.row)"
          size="medium"
          type="primary">在线生成</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div
      v-show="total"
      class="add_pagination">
      <el-pagination
        @current-change="handleCurrentChange"
        :page-size="params.pageSize"
        background
        :current-page="params.pageNum"
        layout="prev, pager, next"
        :total="total" />
      </div>
    </div>
</template>
<script>
import {getList} from './service.js'
import output from '../../../utils/output.js'
import {getSession} from '../../../utils/session'
export default {
  data() {
    const authToken = getSession()
    return {
      list: [],
      loading: false,
      params: {
        pageNum: 1,
        pageSize: 20
      },
      total: 0,
      authToken

    }
  },
  created () {
    this.searchList(this.params)
  },
  methods: {
    async searchList (val) {
      this.loading = true
      const{data} = await getList({...this.params,...val,module: 5})
      this.list = data.content.data
      this.total=+data.content.total
      this.loading = false
    },
    create (item) {
      this.$router.push({
        path:'/report-file-detail',
        query: {type: item.doctype,fileSuffix: item.fileSuffix,title: item.fileName,id: item.id}
      })

    },
    async download (item) {
      try {
        output({url: '/doc/download', param: {id: item.id,fileName: item.fileName,token:this.authToken.token}})
      } catch (err) {
        console.log(err)
      }
    },
    handleCurrentChange (val) {
      this.searchList({ pageNum: val })
    },
  }
}
</script>
<style scoped>
  .download {
    background: #f8f8f8;
    padding: 16px 20px;
  }
</style>

