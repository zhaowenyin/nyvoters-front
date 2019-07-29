<template>
  <el-dialog
    title=""
    :visible="visible"
    class="dialog2"
    :before-close="comfirmClose"
    :close-on-click-modal="false"
    width="800px">
    <el-steps
      :active="active"
      class="step"
      finish-status="success">
      <el-step title="选择文件"></el-step>
      <el-step title="数据导入"></el-step>
      <el-step title="数据对比"></el-step>
      <el-step title="导入完成"></el-step>
    </el-steps>
    <el-form
      :model="form"
      v-if="showForm&&active===0"
      ref="form"
      class="form">
       <el-form-item
        label=""
        class="complait-content"
        prop="id">
          <el-upload
            style="100%"
            :class="['commom1',{'uploadcomplait':fileList.length>0}]"
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
            :auto-upload="true">
            <div
            v-if="fileList.length===0"
            class="but">请选择需要导入的文件</div>
          </el-upload>
      </el-form-item>
    <div style="padding-top: 50px;">上传的excel表符合以下规范</div>
    <div>•  请使用标准模板导入数据</div>
    <div>• 文件大小不超过 x</div>
    <div>• 仅支持 *.xls 和 *.xlsx</div>
    </el-form>
    <div
    :class="{'load': active>0}"
    :element-loading-text="handerLoading()"
    element-loading-spinner="el-icon-loading"
    v-loading="loading">
    <ul class="info" v-if="active===4">
      <li><i style="color: green;margin-right: 15px;" class="el-icon-success"/>对比完成！</li>
      <li>成功<span style="color:green">{{data.successNum}}</span>条     失败<span style="color: red;">{{data.failNum}}</span>条</li>
    </ul>
    </div>
    <div v-if="active===4">说明：</div>
    <div v-if="active===4">失败数据，请在导入管理处进行修复上传</div>

    <div
      slot="footer"
      v-if="active===4"
      class="footer">
      <el-button
        v-if="+data.failNum>0"
        @click="submitForm()"
        size="medium"
        type="primary">导出失败数据</el-button>
        <el-button
        @click="comfirmClose()"
        size="medium">返回</el-button>
    </div>
  </el-dialog>
</template>
<script>
import {getProcessSate} from './service.js'
import { baseURL } from '../../../utils/api.js'
import { getSession } from '../../../utils/session.js'
import { mapActions } from 'vuex'
export default {
  data () {
    const authToken = getSession()
    return {
      loading: false,
      form: {
        id: ''
      },
      fileList: [],
      headers: {
        token: authToken.token,
      },
      active: 0,
      timer: null,
      showForm: true,
      data: {}
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
    lastId: {
      default: null,
      type: Number
    }
  },
  computed: {
    allUrl () {
      let param = {
        type: 0,
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
      return `${baseURL}/import/upload?${paramStr}`
    }
  },
  created () {
    clearInterval(this.timer)
    if (this.lastId) {
      this.active = +(this.lastId + 1)
      this.loading = true
      this.searchProcessSate({id: this.lastId})
    }

  },
  methods: {
    ...mapActions('voterRegisters', [
      'getListData'
    ]),
    close () {
      this.$emit('update:visible', false)
      this.getListData()
      clearInterval(this.timer)
    },
    submitForm () {

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
      return true
    },
    successFn (response) {
      // this.$notify.success({title: '上传成功'})
      this.active = 1
      this.form.id = response.content.id
      this.loading = true
      let sel = this
      clearInterval(this.timer)
      this.timer = setInterval(() => {
        sel.searchProcessSate({id:  this.form.id})
      }, 5000)
      this.showForm = false
      // this.form.id = response.data.content
      // this.$refs.upload.clearFiles()
    },
    errorFn (err) {
      const { message = `{}` } = err
      const errorObj = JSON.parse(message)
      this.$notify.error({title: errorObj.message || '上传失败'})
    },
    async searchProcessSate (val) {
      const {data} = await getProcessSate(val)
      try {
        this.data = data.content
        console.log(data.content.processState)
        if (data.content.processState === 2) {
          this.active = data.content.processState + 2
        } else {
          this.active = data.content.processState + 1
        }
        console.log(1,this.active)
        if(this.active === 4) {
          clearInterval(this.timer)
          this.loading = false
        }
      } catch (e) {
        console.log(e)
        clearInterval(this.timer)
        this.loading = false
      }

    },
    handerLoading () {
      let text = ""
      switch(this.active) {
      case 1:
        text = '导入中'
        break
      case 2:
        text = '对比排队中...'
        break
      default:
        text = ''
      }
      return text
    }

  }

}
</script>
<style scoped>

.step {
  padding-bottom: 50px;
}
.footer {
  text-align: center;
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
  .load {
    height: 200px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .info {
    font-size: 16px;
    & li {
      padding-bottom: 15px;
    }
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

.dialog2 .el-dialog__body {
    padding: 80px;
}
</style>
