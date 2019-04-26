 <template>
    <el-table
      class="download"
      v-loading="loading"
      :data="list"
      style="width: 100%">
      <el-table-column
        prop="name"
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
          @click="download(scope.row)"
          size="medium"
          type="primary">在线生成</el-button>
        </template>
      </el-table-column>
    </el-table>
  </template>
<script>
import {getList} from './service.js'
// import output from '../../utils/output.js'
export default {
  data() {
    return {
      list: [],
      loading: false
    }
  },
  created () {
    this.searchList()
  },
  methods: {
    async searchList () {
      this.loading = true
      const{data} = await getList()
      this.list = data.content.data
      this.loading = false
    },
    async download (item) {
      this.$router.push({
        path:'/create-file',
        query: {type: item.type,status: item.status}
      })
      console.log(item)
      // try {
      //   output({url: '/doc/download', params: {id: item, module: 3}})
      // } catch (err) {
      //   console.log(err)
      // }
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

