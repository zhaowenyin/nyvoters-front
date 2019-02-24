<template>
  <div class="print-view">
    <el-upload
      class="upload-demo add-upload"
      :action="VUE_APP_BACKEND_SERVER + uploadAddress"
      :on-success="handleSuccess"
      :on-error="handleError"
      :on-remove="handleRemove"
      :before-upload="beforeUpload"
      :file-list="fileList"
      >
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">只能上传.docx文件</div>
    </el-upload>
  </div>
</template>
<script>
import {mapState} from 'vuex'
import {VUE_APP_BACKEND_SERVER} from '../../../../config/index'
export default {
  data () {
    return {
      VUE_APP_BACKEND_SERVER,
      uploadAddress: '/api/v3/pcweb/gauges/print/templates',
    }
  },
  computed: {
    ...mapState('gauge', {
      renderTree: state => state.renderTree
    }),
    fileList () {
      let list = []
      this.renderTree.print_templates.forEach((item) => {
        let obj = {
          name: item.file_name,
          url: item.file_url
        }
        list.push(obj)
      })
      return list
    }
  },
  created () {
    // console.log(this.renderTree)
    // this.renderTree.print_templates.forEach((item) => {
    //   let obj = {
    //     name: item.file_name,
    //     url: item.file_url
    //   }
    //   this.fileList.push(obj)
    // })
    // console.log(this.fileList)
  },
  methods: {
    handleSuccess (res) {
      this.renderTree.print_templates.unshift(res)
    },
    handleError (err, file, fileList) {
      console.log(err, file, fileList)
    },
    handleRemove (file) {
      console.log(file)
      for (let i = 0; i < this.renderTree.print_templates.length; i++) {
        if (file.url === this.renderTree.print_templates[i].file_url) {
          this.renderTree.print_templates.splice(i, 1)
          break
        }
      }
    },
    beforeUpload (file) {
      const {name} = file
      if (/.docx$/.test(name)) {
        return true
      } else {
        this.$notify.error({
          title: '提示',
          message: '只能上传.docx格式文件'
        })
        return false
      }
    },
    beforeRemove (file, fileList) {
      console.log(file, fileList)
      return this.$confirm(`确定删除 ${ file.name }？`)
    }
  }
}
</script>
<style scoped></style>
