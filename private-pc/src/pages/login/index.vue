<template>
  <div class="loginDiv">
    <img style="width: 530px; margin-top: 120px;" src="../../assets/img/login-icon.png"/>
    <div class="loginBox">
      <el-form
        label-width="148px"
        :model="userLogin"
        :rules="rules"
        ref="loginForm"
        class="login-form">
        <el-form-item
          label="用户名："
          prop="username">
          <el-input
            placeholder="请输入用户名"
            class="item"
            v-model="userLogin.userName" />
        </el-form-item>
        <el-form-item
          label="密码："
          prop="password">
          <el-input
            placeholder="请输入密码"
            type="password"
            class="item"
            v-model="userLogin.password" />
        </el-form-item>
        <el-form-item
          label="验证码："
          prop="captcha">
          <div class="valid">
            <el-input
              placeholder="请输入验证码"
              class="item"
              v-model="userLogin.captcha" />
            <div class="out-img"><img class="img" :src="captchaImg"/></div>
            <div class="change" @click="getCode">换一张</div>
          </div>
        </el-form-item>
        <el-form-item class="padding">
          <el-button
            type="primary"
            class="loginBtn"
            @click="submitForm()">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { setSession } from '../../utils/session'
import { login, getCode} from './service.js'
import { verifyArr } from './config.js'
import md5 from 'blueimp-md5'

export default {
  data () {
    return {
      userLogin: {
        userName: '',
        password: '',
        captcha: '',
        captchaId: ''
      },
      rules: {
        userName: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        captcha: [
          { required: true, message: '请输入验证码', trigger: 'blur' }
        ]
      },
      captchaImg: ''
    }
  },
  components: {
  },
  created () {
    this.getCode()
    document.addEventListener('keydown', this.enterSubmit, false)
  },
  destroyed () {
    document.removeEventListener('keydown', this.enterSubmit, false)
  },
  methods: {
    submitForm () {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          login({...this.userLogin,password: md5(this.userLogin.password)})
            .then(({ data }) => {
              let param = {}
              param.verifyArr = verifyArr
              param = {...param,...data.content}
              setSession(param)
              this.$router.push({ path: '/' })
            }).catch(()=>{
              console.log(888)
              this.getCode()
            })
        }
      })
    },
    enterSubmit (event) {
      if (event.keyCode === 13) this.submitForm()
    },
    async getCode () {
      const {data} = await getCode()
      this.captchaImg = 'data:imagepng;base64,' + data.content.captcha
      this.userLogin.captchaId = data.content.captchaId
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .loginDiv{
    height:100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    background: url("../../assets/img/login-bg.jpg") top left no-repeat;
    background-size: cover;
  }
  .loginBox {
    width: 546px;
    margin-top: 52px;
    background-color: #ffffff;
    box-shadow: 0px 0px 6px 0px
		rgba(34, 24, 21, 0.38);
    padding: 58px 0 43px 0;
  }
  .item {
    width: 307px;
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
    height: 40px;
    background-color: #d41c1a;
    border-radius: 2px;
    width: 307px;
  }
  .forget-btn {
    width: 100%;
    margin-left: 0;
  }
  .valid {
    display: flex;
    width: 100%;
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
    & .change {
      width: 90px;
      padding-left: 20px;
      cursor: pointer;
    }
  }

</style>
