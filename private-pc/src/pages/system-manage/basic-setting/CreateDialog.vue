<template>
  <el-dialog
    title="系统参数设置"
    :visible="visible"
    width="600px"
    :close-on-click-modal="false"
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
        <el-select
          filterable
          size="medium"
          style="width: 100%;"
          class="item"
          v-model="form.sessionNum"
          clearable placeholder="请选择">
          <el-option
            v-for="(item,key) in sessionList"
            :key="key"
            :label="item"
            :value="item">
          </el-option>
        </el-select>
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
        label="登记开始日期"
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
        prop="loginBackgroudId">
          <el-upload
            style="100%"
            :class="['commom1',{'uploadcomplait':fileList.length>0}]"
            :headers="headers"
            :action="url"
            ref="upload"
            :on-change="changeFile"
            :on-success="successFn"
            :on-error="errorFn"
            :on-remove="changeFile"
            :multiple="false"
            :before-upload="beforeAvatarUpload"
            :limit="1"
            :file-list="fileList"
            accept="image/jpeg,image/gif,image/png"
            :auto-upload="false">
            <div
            v-if="fileList.length===0"
            class="but">
            <span style="color: #606266" v-if="fileName">{{fileName}}</span>
            <span v-else>请上传登录背景地址</span>
            </div>
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
import {setSubmit,getConfig,getName} from './service.js'
import { baseURL } from '../../../utils/api.js'
import { getSession } from '../../../utils/session.js'
export default {
  data () {
    const authToken = getSession()
    return {
      loading: false,
      form: {
        loginBackgroudId: '',
        registerEndDate:'',
        registerStartDate: '',
        sessionNum: null,
        voteDate: ''
      },
      fileList: [],
      sessionList: {
        1: '一',
        2: '二',
        3: '三',
        4: '四',
        5: '五',
        6: '六',
        7: '七',
        8: '八',
        9: '九',
        10: '十',
        11: '十一',
        12: '十二',
        13: '十三',
        14: '十四',
        15: '十五',
        16: '十六',
        17: '十七',
        18: '十八',
        19: '十九',
        20: '二十',
        21: '二十一',
        22: '二十二',
        23: '二十三',
        24: '二十四',
        25: '二十五',
        26: '二十六',
        27: '二十七',
        28: '二十八',
        29: '二十九',
        30: '三十',
        31: '三十一',
        32: '三十二',
        33: '三十三',
        34: '三十四',
        35: '三十五',
        36: '三十六',
        37: '三十七',
        38: '三十八',
        39: '三十九',
        40: '四十',
        41: '四十一',
        42: '四十二',
        43: '四十三',
        44: '四十四',
        45: '四十五',
        46: '四十六',
        47: '四十七',
        48: '四十八',
        49: '四十九',
        50: '五十'
      },
      multipleSelection: [],
      data: [],
      rules: {
        registerEndDate: [
          { required: true, message: '请选择登记截止日期！', trigger: 'change' }
        ],
        registerStartDate: [
          { required: true, message: '请选择登记开始日期！', trigger: 'change' }
        ],
        sessionNum: [
          { required: true, message: '请输入选举届数！', trigger: 'blur' }
        ],
        voteDate: [
          { required: true, message: '请选择选举日！', trigger: 'change' }
        ],
        loginBackgroudId: [
          { required: true, message: '请上传背景！', trigger: 'blur' }
        ]
      },
      headers: {
        token: authToken.token,
      },
      fileName: '',
      url: '',
      obj: {}
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

  },
  created () {
    this.getConfig()
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
    async getConfig () {
      this.loading = true
      const{data} = await getConfig()
      this.data = data.content
      const content = data.content
      let obj = {}
      for(let i of content) {
        obj[i.key] = i.value
      }
      this.obj = obj
      this.form = {
        sessionNum: obj.sessionNum,
        voteDate: new Date(+obj.voteDate),
        registerStartDate: new Date(+obj.registerStartDate),
        registerEndDate: new Date(+obj.registerEndDate),
        loginBackgroudId: obj.loginBackgroudId,
      }
      if(this.form.loginBackgroudId) {
        this.getName(this.form.loginBackgroudId)
      }
      this.allUrl('')
      this.loading = false
    },
    async sumitData () {
      try{
        this.loading = true
        let param = {...this.form}
        param.registerEndDate = param.registerEndDate.getTime()
        param.registerStartDate = param.registerStartDate.getTime()
        param.voteDate = param.voteDate.getTime()
        await setSubmit(param)
        this.$emit('updateConfig')
        this.close()
        this.loading = false
      }finally{
        this.loading = false
      }
    },
    async getName (val) {
      const {data} = await getName({id: val})
      this.fileName = data.content.fileName
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
      if(file.name){
        this.allUrl(file.name)
        setTimeout(()=>{
          this.$refs.upload.submit()
        },1000)
      }
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
      // this.$notify.success({title: '上传成功'})
      if(this.obj.loginBackgroudId) {
        this.form.loginBackgroudId = this.obj.loginBackgroudId
      } else {
        this.form.loginBackgroudId = response.content
      }

      // this.form.id = response.data.content
      // this.$refs.upload.clearFiles()
    },
    errorFn (err) {
      const { message = `{}` } = err
      const errorObj = JSON.parse(message)
      this.$notify.error({title: errorObj.message || '上传失败'})
    },
    allUrl (val) {
      let param = {
        module: 6,
        isFillData: 0,
        fileName: val
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
      if(this.obj.loginBackgroudId) {
        url=`${baseURL}/doc/modify/?${paramStr}&id=${this.obj.loginBackgroudId}`
      } else {
        url =`${baseURL}/doc/upload/?${paramStr}`
      }
      this.url= url
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
