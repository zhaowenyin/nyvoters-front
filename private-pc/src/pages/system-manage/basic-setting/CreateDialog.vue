<template>
  <el-dialog
    title="系统参数设置"
    :visible="visible"
    width="600px"
    :before-close="comfirmClose">
    <el-form
      label-width="110px"
      :model="form"
      :rules="rules"
      ref="form"
      class="form">
      <el-form-item
        label="选举届数"
        prop="sessionNum">
        <el-input
          size="medium"
          placeholder="请输入"
          :maxlength="18"
          class="item"
          v-model="form.sessionNum" />
      </el-form-item>
      <el-form-item
        label="选举日"
        prop="voteDate">
        <el-date-picker
          style="width: 100%"
          v-model="form.voteDate"
          type="date"
          placeholder="请选择">
        </el-date-picker>
      </el-form-item>
      <el-form-item
        label="登记开日期"
        prop="registerStartDate">
        <el-date-picker
          style="width: 100%"
          v-model="form.registerStartDate"
          type="date"
          placeholder="请选择">
        </el-date-picker>
      </el-form-item>
      <el-form-item
        style="width: 100%"
        label="登记结束日期"
        prop="registerEndDate">
        <el-date-picker
         style="width: 100%"
          v-model="form.registerEndDate "
          type="date"
          placeholder="请选择">
        </el-date-picker>
      </el-form-item>
       <el-form-item
        label="登录背景地址"
        class="complait-content"
        prop="fileList">
          <el-upload
            style="100%"
            :class="['commom1',{'uploadcomplait':form.fileList.length>0}]"
            :headers="headers"
            :action="allUrl"
            ref="upload"
            :on-change="changeFile"
            :on-success="successFn"
            :on-error="errorFn"
            :on-remove="changeFile"
            name="fileName"
            :multiple="false"
            :before-upload="beforeAvatarUpload"
            :limit="1"
            :file-list="form.fileList"
            :auto-upload="ture">
            <div
            v-if="form.fileList.length===0"
            class="but">请上传登录背景地址</div>
          </el-upload>
      </el-form-item>
    </el-form>
    <div
      slot="footer"
      class="footer">
      <el-button
        @click="submitForm()"
        size="medium"
        :loading="loading"
        type="primary">确定</el-button>
        <el-button
        @click="comfirmClose()"
        size="medium">取消</el-button>
    </div>
  </el-dialog>
</template>
<script>
import {setSubmit} from './service.js'
import { baseURL } from '../../../utils/api.js'
export default {
  data () {
    return {
      loading: false,
      form: {
        fileList: [],
        registerEndDate:'',
        registerStartDate: '',
        sessionNum: null,
        voteDate: ''
      },
      multipleSelection: [],
      rules: {
        registerEndDate: [
          { required: true, message: '请选择推荐方式！', trigger: 'blur' }
        ],
        registerStartDate: [
          { required: true, message: '请选择推荐方式！', trigger: 'blur' }
        ],
        sessionNum: [
          { required: true, message: '请选择推荐方式！', trigger: 'blur' }
        ],
        voteDate: [
          { required: true, message: '请选择推荐方式！', trigger: 'blur' }
        ]
      },
      headers: {
        // Authorization: authToken.token,
        // AuthID: authToken.id
      },
    }

  },
  props:{
    visible: {
      default: false,
      type: Boolean
    },
    item: {
      default: () => {},
      type: Object
    }
  },
  computed: {
    allUrl () {
      let param = {
        module: '3',
      }
      let paramStr = ''
      for (const k in param) {
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
  created () {
  },
  methods: {
    close () {
      this.$emit('update:visible', false)
    },
    submitForm () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.sumitData()
        }
      })
    },
    async sumitData () {
      this.loading = true
      await setSubmit(this.form)
      this.close()
      this.loading = false
    },
    comfirmClose () {
      this.$confirm('关闭将丢失已编辑的内容，确认关闭？')
        .then(() => {
          this.close()
        })
        .catch(() => {})
    },
    // submit () {
    //   if (this.form.fileList.length === 0) {
    //     this.$notify.error({title: '上传文件不能为空'})
    //     return
    //   }
    //   this.$emit('upload', {ref: 'upload'})
    //   this.$refs.upload.submit()
    // },
    changeFile (file, fileList) {
      this.form.fileList = fileList
    },
    beforeAvatarUpload (file) {
      const isXlsx = file.type ===
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      if (!isXlsx) {
        this.$notify.error({title: '只能上传 xlsx 格式的文件!'})
      }
      return isXlsx
    },
    successFn () {
      this.$notify.success({title: '上传成功'})
      this.$refs.upload.clearFiles()
    },
    errorFn (err) {
      const { message = `{}` } = err
      const errorObj = JSON.parse(message)
      this.$notify.error({title: errorObj.message || '上传失败'})
    },
  }

}
</script>
<style scoped>
.form {
  margin: 0 30px;
}
.but {
  width: 100%;
  border: solid 1px #DCDFE6;
  background: #fff;
  color: #c0c4cb;
  padding-left: 15px;
  height: 40px;
  line-height: 40px;
  border-radius: 4px;

  }
 .but:after {
    content: "";
    display: inline-block;
    background: url("../../../assets/img/folder.png") center center no-repeat;
    background-size: 100% 100%;
    width: 19px;
    height: 15px;
    float: right;
    margin-right: 9px;
    transform: translateY(12px);
  }
  .uploadcomplait {
    border:solid 1px #DCDFE6;
    background: #fff;
  }


</style>
<style>
  .table-obj .el-form-item {
    margin: 15px 0;
  }
.commom1 .el-upload {
  background: #fff;
  width: 100%;
  text-align: left;
}
.commom1 .el-upload-list__item:first-child {
  margin: 8px 0;
}
.complait-content .el-form-item__content {
  line-height: 10px;
}
.uploadcomplait .el-upload{
  display: none;
}
</style>
