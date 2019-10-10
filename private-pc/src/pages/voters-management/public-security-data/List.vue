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
            :on-remove="handleRemove"
            :on-change="changeFile"
            :on-success="successFn"
            :on-error="errorFn"
            :before-upload="beforeAvatarUpload"
            :file-list="fileList"
            :auto-upload="true">
            <el-button slot="trigger" size="small" type="success" @click="submitUpload(scope.row)">上传到服务器</el-button>
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
import { baseURL } from '../../../utils/api.js'
import { getSession } from '../../../utils/session.js'

export default {
  data () {
    const authToken = getSession()
    return {
      downLoading: false,
      fileList:[],
      authToken,
      precinctId: ''
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
    }),
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

    },
    successFn (response) {
      console.log(123,response)
      // this.form.id = response.id
      this.$refs.upload.clearFiles()
    },
    errorFn (err) {
      const { message = `{}` } = err
      const errorObj = JSON.parse(message)
      this.$notify.error({title: errorObj.message || '上传失败'})
    },
    changeFile (file, fileList) {
      this.fileList = fileList
    },
    beforeAvatarUpload (file) {
      const isXlsx = file.type ===
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      if (!isXlsx) {
        this.$notify.error({title: '只能上传 xlsx 格式的文件!'})
      }
      return isXlsx
    },
    handleRemove () {

    },
    allUrl () {
      let param = {
        precinctId: this.precinctId,
        token: this.authToken.token
      }
      let paramStr = ''
      for (const k in param) {
        if (param[k] !== undefined &&
            param[k] !== null &&
            param[k] !== '') {
          paramStr += `&${k}=${encodeURI(param[k])}`
        }
      }
      paramStr = paramStr.substr(1)
      let url = ''
      url =`${baseURL}/doc/upload/?${paramStr}`
      return url
    }
  }
}
</script>
<style scoped>

</style>
