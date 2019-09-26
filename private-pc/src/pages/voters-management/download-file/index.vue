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
import output from '../../../utils/output'
export default {
  data() {
    return {
      list: [],
      loading: false,
      params: {
        pageNum: 1,
        pageSize: 20
      },
      total: 0
    }
  },
  created () {
    this.searchList()
  },
  methods: {
    async searchList (val) {
      this.loading = true
      const{data} = await getList({...this.params,...val,module: 1})
      this.list = data.content.data.map(i=> {
        i.doctype=this.handlegender(i.fileName)
        i.precinct = this.handerCommittee(i.fileName)
        return i
      })

      this.total=+data.content.total
      this.loading = false
    },
    async create (item) {
      this.$router.push({
        path:'/create-votersfile',
        query: {type: item.doctype,fileSuffix: item.fileSuffix,title: item.fileName,id: item.id,precinct: item.precinct}
      })
    },
    async download (item) {
      try {
        output({url: '/doc/download', param: {id: item.id,fileName: item.fileName}})
      } catch (err) {
        console.log(err)
      }
    },
    handlegender(fileName) {
      let text = null
      switch(fileName) {
      case '选举委员会关于选民名单公告（1）':
        text = 1
        break
      case '选举委员会关于选民名单补正公告（1）':
        text = 3
        break
      case '选举委员会关于选民名单补正公告（2）':
        text = 4
        break
      case '选举委员会关于选举日及选举登记时间的公告':
        text = 5
        break
      case '选民证（1）':
        text = 6
        break
      case '选民证（2）':
        text = 7
        break;
      default:
        text = null
      }
      return text
    },
    handerCommittee(fileName) {
      let text = 2
      switch(fileName) {
      case '选区选民情况统计表（1）':
        text = 1
        break
      case '选区选民情况统计表（2）':
        text = 1
        break
      case '选举委员会关于选举日及选举登记时间的公告':
        text = 2
        break
      default:
        text = 3
      }
      return text
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

