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
        label="选区名称"
        prop="precinctName" />
      <el-table-column
        label="公安数据文件"
        prop="fileName" />
      <el-table-column
        label="状态"
        prop="type">
         <template slot-scope="scope">
          {{handerstatus(scope.row.status)}}
        </template>
      </el-table-column>
       <el-table-column
        label="自动对比结果">
        <template slot-scope="scope">
          <el-upload
            class="upload-demo"
            ref="upload"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :file-list="fileList"
            :auto-upload="false">
            <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload(scope.row)">上传到服务器</el-button>
          </el-upload>
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
        :total="total" />
    </div>
  </div>
</template>
<script>
import { mapState, mapActions,mapMutations } from 'vuex'

export default {
  data () {
    return {
      downLoading: false,
    }
  },
  computed: {
    ...mapState('publicsecuritydata', {
      loading: state => state.loading,
      list: state => state.list,
      total: state => state.total,
      pageSize: state => state.searchParam.pageSize,
      pageNum: state => state.searchParam.pageNum
    }),
    ...mapState('commonData', {
      belongAreaId: state => state.belongAreaId
    })
  },
  components: {
  },
  watch: {
    belongAreaId () {
      this.getListData({ precinctId: this.belongAreaId,pageNum:1})
    }
  },
  created () {
    if (this.belongAreaId === '') {
      return
    }
    this.getListData({precinctId: this.belongAreaId,pageNum:1})
  },
  methods: {
    ...mapActions('publicsecuritydata', [
      'getListData'
    ]),
    ...mapMutations('publicsecuritydata', [
      'saveSelection'
    ]),
    // 分页
    handleCurrentChange (val) {
      this.getListData({ pageNum: val })
    },
    submitUpload() {
      this.$refs.upload.submit();
    },
    handleSelectionChange(val) {
      this.saveSelection(val)
    },
    handerstatus (val) {
      let text = ""
      switch(+val) {
      case 0:
        text = '待上传'
        break
      case 1:
        text = '待对比'
        break
      case 2:
        text = '对比中'
        break
      case 3:
        text = '已对比'
        break
      default:
        text = ''
      }
      return text
    },
    upload () {

    }
  }
}
</script>
<style scoped>

</style>
