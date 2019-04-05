<template>
  <el-dialog
    title="上传"
    :visible="visible"
    width="650px"
    :before-close="comfirmClose">
    <el-form
      label-width="110px"
      :model="form"
      :rules="rules"
      ref="form"
      class="form">
       <el-form-item
        label="选择文件"
        class="complait-content"
        prop="id">
          <el-upload
            style="100%"
            :class="['commom1',{'uploadcomplait':fileList.length>0}]"
            :headers="headers"
            action="https://jsonplaceholder.typicode.com/posts/"
            ref="upload"
            :on-change="changeFile"
            :on-success="successFn"
            :on-error="errorFn"
            :disabled="!!item.id"
            :on-remove="changeFile"
            :multiple="false"
            :before-upload="beforeAvatarUpload"
            :limit="1"
            :file-list="fileList"
            :auto-upload="true">
            <div
            v-if="fileList.length===0"
            class="but">选择文件</div>
          </el-upload>
      </el-form-item>
      <el-form-item
        label="文件名称"
        prop="fileName">
        <el-input
          size="medium"
          placeholder="请输入"
          :maxlength="18"
          class="item"
          v-model="form.fileName" />
      </el-form-item>
      <el-form-item
        label="所属模块"
        prop="module">
          <el-radio-group  size="medium" v-model="form.module">
            <el-radio v-for="(i,key) in moudel" :key="key" :label="+key">{{i}}</el-radio>
          </el-radio-group>
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
import { baseURL } from '../../../utils/api.js'
import {moudel} from '../../../common-data/config.js'
import { getSession } from '../../../utils/session.js'
import { mapActions } from 'vuex'
import {modifySubmit} from './service.js'
export default {
  data () {
    const authToken = getSession()
    return {
      loading: false,
      form: {
        fileName: '',
        id: '',
        module: '',
      },
      fileList: [],
      multipleSelection: [],
      rules: {
        fileName: [
          { required: true, message: '请输入文件名字！', trigger: 'blur' }
        ],
        module: [
          { required: true,message: '请选择所属模块！', trigger: 'blur' }
        ],
        id: [
          { required: true,message: '请选择文件！', trigger: 'blur' }
        ]
      },
      headers: {
        Authorization: authToken.token,
      },
      moudel
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
        module: this.form.module
      }
      let paramStr = ''
      for (const k in param) {
        if (param[k] !== undefined &&
            param[k] !== null &&
            param[k] !== '') {
          paramStr += `&${k}=${param[k]}`
        }
      }
      paramStr = paramStr.substr(1)
      return `${baseURL}/doc/upload/?${paramStr}`
    }
  },
  created () {
    if(this.item.id) {
      this.form = {...this.form, id:this.item.id, fileName: this.item.fileName,module: this.item.module}
    }

  },
  methods: {
    ...mapActions('fileManage', [
      'getListData'
    ]),
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
      let param = {
        fileName: this.form.fileName,
        module: this.form.module,
        id: this.form.id
      }
      await modifySubmit(param)
      this.getListData()
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
    changeFile (file, fileList) {
      this.fileList = fileList
    },
    beforeAvatarUpload (file) {
      console.log(file)
      // const isXlsx = file.type ===
      //   'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      // if (!isXlsx) {
      //   this.$notify.error({title: '只能上传 xlsx 格式的文件!'})
      // }
      // return isXlsx
    },
    successFn (response) {
      console.log(response)
      this.getListData()
      this.form.id = 1
      // this.$refs.upload.clearFiles()
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
