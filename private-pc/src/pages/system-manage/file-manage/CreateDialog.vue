<template>
  <el-dialog
    title="上传"
    :visible="visible"
    width="650px"
    :close-on-click-modal="false"
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
            :on-remove="Onremove"
            :disabled="!!item.id"
            :multiple="false"
            :before-upload="beforeAvatarUpload"
            :limit="1"
            :file-list="form.fileList"
            :auto-upload="false">
            <div
            v-if="form.fileList.length===0"
            class="but">
            <span style="color: #606266" v-if="item.fileName">{{item.fileName}}</span>
            <span v-else>选择文件</span>
          </div>

          </el-upload>

      </el-form-item>
      <el-form-item
        label="文件名称"
        prop="fileName">
        <el-input
          :disabled="isDisabled"
          size="medium"
          placeholder="请输入"
          class="item"
          v-model="form.fileName" />
      </el-form-item>
      <el-form-item
        label="所属模块"
        prop="module">
          <el-radio-group :disabled="isDisabled" size="medium" v-model="form.module">
            <el-radio v-for="(i,key) in moudel" :key="key" :label="+key">{{i}}</el-radio>
          </el-radio-group>
      </el-form-item>
    </el-form>
    <div
      slot="footer"
      class="footer">
      <el-button
        v-if="!isDisabled"
        @click="submitForm()"
        size="medium"
        :loading="loading"
        type="primary">确定</el-button>
      <el-button
        v-if="!isDisabled"
        @click="comfirmClose()"
        size="medium">取消</el-button>
      <el-button
        v-if="isDisabled"
        type="primary"
        @click="comfirmClose()"
        size="medium">确定</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { baseURL } from '../../../utils/api.js'
import {moudel} from '../../../common-data/config.js'
import { getSession } from '../../../utils/session.js'
import { mapActions } from 'vuex'
import {modifyFile} from './service.js'
export default {
  data () {
    const authToken = getSession()
    return {
      loading: false,
      form: {
        fileName: '',
        fileList: [],
        module: '',
      },
      multipleSelection: [],
      rules: {
        fileName: [
          { required: true, message: '请输入文件名字！', trigger: 'blur' }
        ],
        module: [
          { required: true,message: '请选择所属模块！', trigger: 'change' }
        ],
        fileList: [
          { required: !this.item.id,message: '请选择文件！', trigger: 'change' }
        ]
      },
      headers: {
        token: authToken.token,
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
    },
    isDisabled: {
      default: false,
      type: Boolean
    }
  },
  computed: {
    allUrl () {
      let param = {
        module: this.form.module,
        fileName: this.form.fileName
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
      let url = ''
      url =`${baseURL}/doc/upload/?${paramStr}`
      return url
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
          if(this.form.fileList.length>0) {
            this.$refs.upload.submit();
          } else if(this.item.id) {
            this.modifyFile()
          }
        }
      })
    },
    comfirmClose () {
      if(this.isDisabled){
        this.close()
        return
      }
      this.$confirm('关闭将丢失已编辑的内容，确认关闭？')
        .then(() => {
          this.close()
        })
        .catch(() => {})
    },
    changeFile (file, fileList) {
      this.form.fileList = fileList
    },
    beforeAvatarUpload (file) {
      console.log(55,file)
      // const isXlsx = file.type ===
      //   'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      // if (!isXlsx) {
      //   this.$notify.error({title: '只能上传 xlsx 格式的文件!'})
      // }
      // return isXlsx
    },
    successFn (response) {
      console.log(123,response)
      this.getListData()
      this.close()
      // this.form.id = response.id
      // this.$refs.upload.clearFiles()
    },
    errorFn (err) {
      const { message = `{}` } = err
      const errorObj = JSON.parse(message)
      this.$notify.error({title: errorObj.message || '上传失败'})
    },
    async modifyFile () {
      try {
        await modifyFile ({id: this.item.id,module: this.form.module,fileName: this.form.fileName,isFillData: this.item.isFillData})
        this.getListData()
        this.close()
      } catch (e) {
        console.log(e)
      }

    },
    Onremove () {
      this.form.fileList = []
    }
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
