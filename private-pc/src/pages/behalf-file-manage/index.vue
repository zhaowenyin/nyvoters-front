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
import output from '../../utils/output.js'
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
    this.searchList(this.params)
  },
  methods: {
    async searchList (val) {
      this.loading = true
      const{data} = await getList({...this.params,...val})
      this.list = data.content.data.map(i=> {
        i.doctype=this.handlegender(i.fileName)
        return i
      })
      this.total=+data.content.total
      this.loading = false
    },
    handlegender(fileName) {
      let text = null
      switch(fileName) {
      case '选举委员会关于初步代表候选人名单公告（1）':
        text = 1
        break
      case '选举委员会关于初步代表候选人名单公告（2）':
        console.log(99)
        text = 2
        break
      case '选举委员会关于正式代表候选人名单公告（1）':
        text = 3
        break
      case '选举委员会关于正式代表候选人名单公告（2）':
        text = 4
        break
      case '选区选举大会公告':
        text = 5
        break
      case '选举委员会关于代表当选公告':
        text = 6
        break
      default:
        text = null
      }
      console.log(text)
      return text
    },
    create (item) {
      console.log(22,item)
      this.$router.push({
        path:'/create-file',
        query: {type: item.doctype,fileSuffix: item.fileSuffix,title: item.fileName,id: item.id}
      })
      console.log(item)

    },
    async download (item) {
      try {
        output({url: '/doc/download', param: {id: item.id}})
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

