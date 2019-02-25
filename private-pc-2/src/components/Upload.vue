<template>
  <el-upload
    :headers="headers"
    :action="allUrl"
    ref="upload"
    :on-change="changeFile"
    :on-success="successFn"
    :on-error="errorFn"
    :on-remove="changeFile"
    :multiple="false"
    :before-upload="beforeAvatarUpload"
    :limit="1"
    :file-list="fileList"
    :auto-upload="false">
    <el-button
      size="small"
      type="primary">点击上传</el-button>
  </el-upload>
</template>

<script>
import { baseURL } from '../utils/api.js'
import { getSession } from '../utils/session.js'

export default {
  props: {
    param: {
      default: () => {},
      type: Object
    },
    url: {
      default: '',
      type: String
    },
    success: {
      default: () => {},
      type: Function
    },
    error: {
      default: () => {},
      type: Function
    }
  },
  data () {
    const authToken = getSession()
    return {
      fileList: [],
      headers: {
        Authorization: authToken.token,
        AuthID: authToken.id
      }
    }
  },
  computed: {
    allUrl () {
      let paramStr = ''
      for (const k in this.param) {
        if (this.param[k] !== undefined &&
            this.param[k] !== null &&
            this.param[k] !== '') {
          paramStr += `&${k}=${this.param[k]}`
        }
      }
      paramStr = paramStr.substr(1)
      return `${baseURL}${this.url}?${paramStr}`
    }
  },
  methods: {
    submit () {
      if (this.fileList.length === 0) {
        this.$notify.error({title: '上传文件不能为空'})
        this.error()
        return
      }
      this.$refs.upload.submit()
    },
    changeFile (file, fileList) {
      this.fileList = fileList
    },
    beforeAvatarUpload (file) {
      console.log(file)
      return true
      // const isXlsx = file.type ===
      //   'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      // if (!isXlsx) {
      //   this.$notify.error({title: '只能上传 xlsx 格式的文件!'})
      //   this.error()
      // }
      // return isXlsx
    },
    successFn () {
      this.$notify.success({title: '上传成功'})
      this.$refs.upload.clearFiles()
      this.success(...arguments)
    },
    errorFn (err) {
      const { message = `{}` } = err
      const errorObj = JSON.parse(message)
      this.$notify.error({title: errorObj.message || '上传失败'})
      this.error(...arguments)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
