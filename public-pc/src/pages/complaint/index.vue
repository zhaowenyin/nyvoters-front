<template>
  <div class="loginDiv">
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
          prop="userName">
          <el-input
            size="medium"
            placeholder="请输入申诉人"
            class="item"
            v-model="userLogin.userName" />
        </el-form-item>
        <el-form-item
          class="padding"
          label="身份证号码："
          prop="idNum">
          <el-input
            size="medium"
            placeholder="请输入身份证号码"
            :maxlength="18"
            class="item"
            v-model="userLogin.idNum" />
        </el-form-item>
         <el-form-item
          class="padding "
          label="申诉书："
          prop="id">
            <el-upload
              style="100%"
              :class="['commom',{'uploadcomplait':fileList.length>0}]"
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
              class="but">请上传申请书</div>
            </el-upload>
        </el-form-item>

        <el-form-item
        class="padding complait-content"
         label=""
        >
          请根据<span class="down" @click="download">《公民申诉书》</span>模板，填写相应内容后，上传文件
        </el-form-item>
         <el-form-item
          class="padding"
          label="联系电话："
          prop="phoneNum">
          <el-input
            placeholder="请输入联系电话"
            :maxlength="11"
            class="item"
            size="medium"
            v-model="userLogin.phoneNum" />
        </el-form-item>
        <el-form-item
          label="验证码："
          class="out-valid"
          prop="captcha">
          <div class="valid">
            <el-input
              size="medium"
              placeholder="请输入验证码"
              :maxlength="18"
              class="item"
              v-model="userLogin.captcha" />
            <div class="out-img"><img class="img" :src="captchaImg"/></div>
          </div>
          <div class="change" @click="change">[换一张]</div>
        </el-form-item>
        <el-form-item class="padding butSize">
          <el-button
           size="medium"
          class="loginBtn"
          @click="cancelForm()">取消</el-button>
          <el-button
           size="medium"
          type="primary"
          class="loginBtn"
          @click="submitForm()">提交</el-button>
        </el-form-item>
      </el-form>
    </div>

  </div>
</template>

<script>
import {complaitSubmit,getCode} from './service.js'
import output from '../../utils/output.js'
import { baseURL } from '../../utils/api.js'

export default {
  data () {
    return {
      userLogin: {
        userName: '',
        idNum: '',
        phoneNum: '',
        id: '',
        captcha: '',
        captchaId: '',
        type: 1
      },
      rules: {
        userName: [
          { required: true, message: '请输入申诉人', trigger: 'blur' }
        ],
        idNum: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        phoneNum: [
          { required: true, message: '请输入联系电话', trigger: 'blur' }
        ],
        captcha: [
          { required: true, message: '请输入验证码', trigger: 'blur' }
        ],
        id:[{ required: true, message: '请上传申诉书', trigger: '' }]
      },
      headers: {
        // Authorization: authToken.token,
        // AuthID: authToken.id
      },
      loading: false,
      captchaImg: '',
      fileList: []
    }

  },
  components: {

  },
  computed: {
    allUrl () {
      let param = {
        module: 4
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
    this.searchCode()
  },

  methods: {
    submitForm () {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading = true
          complaitSubmit(this.userLogin)
            .then((data) => {
              let content = data.content
              this.$router.push({path:'/complaint-success',query: {type: 3,info: content.info}})
            })
          this.loading = false
        }
      })
    },
    change () {
      this.searchCode()
    },
    cancelForm () {

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
      this.userLogin.id = 1
    },
    errorFn (err) {
      const { message = `{}` } = err
      const errorObj = JSON.parse(message)
      this.$notify.error({title: errorObj.message || '上传失败'})
    },
    async download () {
      try {
        output({url: '/doc/download', param: {module: 4,fileName: '公民申诉书'}})
      } catch (err) {
        console.log(err)
      }
    },
    async searchCode () {
      const {data} = await getCode()
      this.captchaImg = 'data:imagepng;base64,'+data.content.captcha
      this.userLogin.captchaId = data.content.captchaId
    }
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
    align-items: center;
  }
  .form {
    display: flex;
    flex: 1;
    width: 960px;
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
    width: 100%;
    border-radius:4px;
    padding: 0 150px;
  }
  .item {
    width: 100%;
    border-radius: 4px;
  }
  .loginBtn {
    width: 80px;
    height: 40px;
    border-radius: 4px;
    margin-right: 19px;
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
    margin-left: 6px;
    & .img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .out-valid {
    position: relative;
    padding-left: 82px;
    margin-bottom: 20px;
    & .change {
      position: absolute;
      right: 30px;
      top: 0px;
      font-size: 14px;
      color: #222222;
      cursor: pointer;
    }
  }
  .padding {
    padding: 0 91px 0 82px;
  }
  .butSize {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
 }


.but {
    width: 100%;
    background: #fff;
    color: #999;
    padding-left: 15px;
    height: 36px;
   line-height: 36px;

  }
  .uploadcomplait {
    background: #fff;
  }
  .down {
    cursor: pointer;
    color: #d02626;
  }
  .complait-content {
    color: #333333;
    font-size: 14px;
  }
   .but:after {
    content: "";
    display: inline-block;
    background: url("../../assets/img/folder.png") center center no-repeat;
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
.commom .el-upload {
  background: #fff;
  width: 100%;
  text-align: left;
}
.commom .el-upload-list__item:first-child {
  margin: 8px 0;
}
.uploadcomplait .el-upload{
  display: none;
}
.complait-content .el-form-item__content {
  line-height: 10px;
}
</style>
