<template>
  <div class="loginDiv">
    <div class="title">在线申诉</div>
    <div class="form">
        <el-form
        label-width="120px"
        :model="userLogin"
        :rules="rules"
        ref="loginForm"
        class="login-form">
        <el-form-item
          class="padding"
          label="申诉人："
          prop="username">
          <el-input
            placeholder="请输入申诉人"
            class="item"
            v-model="userLogin.username" />
        </el-form-item>
        <el-form-item
          class="padding"
          label="身份证号码："
          prop="id_no">
          <el-input
            placeholder="请输入身份证号码"
            :maxlength="18"
            class="item"
            v-model="userLogin.username" />
        </el-form-item>
        <el-form-item
          class="padding"
          label="联系电话："
          prop="phone">
          <el-input
            placeholder="请输入身份证号码"
            :maxlength="11"
            class="item"
            v-model="userLogin.phone" />
        </el-form-item>
         <el-form-item
          class="padding"
          label="申诉书："
          prop="fileList">
            <el-upload
              style="100%"
              :class="['commom',{'uploadcomplait':userLogin.fileList.length>0}]"
              :headers="headers"
              action="https://jsonplaceholder.typicode.com/posts/"
              ref="upload"
              :on-change="changeFile"
              :on-success="successFn"
              :on-error="errorFn"
              :on-remove="changeFile"
              :multiple="false"
              :before-upload="beforeAvatarUpload"
              :limit="1"
              :file-list="userLogin.fileList"
              :auto-upload="false">
              <div
              v-if="userLogin.fileList.length===0"
              class="but">请上传申请书</div>
            </el-upload>
        </el-form-item>
        <el-form-item
        class="padding"
         label=""
        >
             请根据<span class="down" @click="download">《公民申诉书》</span>模板，填写相应内容后，上传文件
        </el-form-item>
        <el-form-item
          label="验证码："
          class="out-valid"
          prop="valid">
          <div class="valid">
            <el-input
              placeholder="请输入验证码"
              :maxlength="18"
              class="item"
              v-model="userLogin.valid" />
            <div class="out-img"><img class="img" src="../../assets/img/home.png"/></div>
          </div>
          <div class="change" @click="change">[换一张]</div>
        </el-form-item>
        <el-form-item class="padding butSize">
          <el-button
            type="primary"
            class="loginBtn"
            @click="submitForm()">提交</el-button>
            <el-button
            class="loginBtn"
            @click="cancelForm()">取消</el-button>
        </el-form-item>
      </el-form>
    </div>

  </div>
</template>

<script>
import { setSession } from '../../utils/session'
import {taskDownload,login} from './service.js'
import output from '../../utils/output.js'

export default {
  data () {
    return {
      userLogin: {
        username: '',
        id_no: '',
        phone: '',
        valid: '',
        fileList: []
      },
      rules: {
        username: [
          { required: true, message: '请输入身份证号/手机号', trigger: 'blur' }
        ],
        id_no: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入身份证号/手机号', trigger: 'blur' }
        ],
        valid: [
          { required: true, message: '请输入验证码', trigger: 'blur' }
        ],
        fileList:[{ required: true, message: '请输入申诉书', trigger: 'blur' }]
      },
      headers: {
        // Authorization: authToken.token,
        // AuthID: authToken.id
      }
    }

  },
  components: {

  },
  created () {
    document.addEventListener('keydown', this.enterSubmit, false)
  },
  destroyed () {
    document.removeEventListener('keydown', this.enterSubmit, false)
  },
  methods: {
    submitForm () {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          login(this.userLogin)
            .then(({ data }) => {
              setSession(data)
              this.$router.push({ path: '/' })
            })
        }
      })
    },
    enterSubmit (event) {
      if (event.keyCode === 13) this.submitForm()
    },
    change () {

    },
    cancelForm () {

    },
    submit () {
      if (this.userLogin.fileList.length === 0) {
        this.$notify.error({title: '上传文件不能为空'})
        return
      }
      this.$emit('upload', {ref: 'upload'})
      this.$refs.upload.submit()
    },
    changeFile (file, fileList) {
      this.userLogin.fileList = fileList
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
    async download (item) {
      try {
        const { data = {} } = await taskDownload({id: item.result_id,citizen_name: item.citizen_name,operate_name: item.name,doctor_name: item.doctor_name})
        output({ data: data.data, download: data.filename, type: data.type })
      } catch (err) {
        console.log(err)
      }
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .loginDiv{
    height:100%;
    width: 100%;
    display: flex;
    flex-direction: column;
  }
  .form {
    display: flex;
    flex: 1;
    padding-top: 100px;
    justify-content: center;
  }
  .title {
    margin-top: 30px;
    height: 50px;
    line-height: 50px;
    padding-left: 100px;
    background-color: #d8d8d8;
    font-size: 16px;
  }
  .login-form {
    width: 800px;
    background:rgba(255,255,255,1);
    border-radius:4px;
  }
  .item {
    width: 100%;
    background-color: #ffffff;
    border-radius: 2px;
    border: solid 1px #cccccc;
  }
  h1 {
    text-align: center;
    font-size: 24px;
    color:#324057;
    margin-bottom: 20px;
  }
  .loginBtn {
    width: 100px;
    height: 40px;
    margin-right: 30px;
  }
  .forget-btn {
    width: 100%;
    margin-left: 0;
  }
  .valid {
    display: flex;
    padding-right:91px;
    & .item {
      flex: 1;
    }
    & .out-img {
    width: 116px;
    height: 40px;
    margin-left: 13px;
    & .img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .out-valid {
    position: relative;
    padding-left: 82px;
    margin-bottom: 40px;
    & .change {
      position: absolute;
      right: 43px;
      top: 8px;
      font-size: 12px;
      cursor: pointer;
    }
  }
  .padding {
    padding: 0 91px 0 82px;
    margin-bottom: 40px;
  }
  .butSize {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
 }


.but {
    width: 100%;
    border: 1px solid #d8d8d8;
    color: #999;
    padding-left: 15px;

  }
  .uploadcomplait {
    border: 1px solid #d8d8d8;
  }
  .down {
    cursor: pointer;
    color: blue;
  }
</style>
<style>
.commom .el-upload {
  width: 100%;
  text-align: left;
}
.commom .el-upload-list__item:first-child {
  margin: 8px 0;
}
.uploadcomplait .el-upload{
  display: none;
}
</style>
