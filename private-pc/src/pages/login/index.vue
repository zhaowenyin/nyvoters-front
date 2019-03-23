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
            placeholder="请输入账号/手机号"
            :maxlength="18"
            class="item"
            v-model="userLogin.username" />
        </el-form-item>
        <el-form-item
          label="密码："
          prop="password">
          <el-input
            placeholder="请输入密码"
            type="password"
            :maxlength="18"
            class="item"
            v-model="userLogin.password" />
        </el-form-item>
        <el-form-item
          label="验证码："
          prop="valid">
          <div class="valid">
            <el-input
              placeholder="请输入验证码"
              :maxlength="18"
              class="item"
              v-model="userLogin.valid" />
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

export default {
  data () {
    return {
      userLogin: {
        username: '',
        password: '',
        captcha: '',
        captchaId: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入身份证号/手机号', trigger: 'blur' }
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
          login({...this.userLogin})
            .then(({ data }) => {
              data.verifyArr = verifyArr
              setSession(data)
              this.$router.push({ path: '/' })
            })
        }
      })
    },
    enterSubmit (event) {
      if (event.keyCode === 13) this.submitForm()
    },
    async getCode () {
      const {data} = await getCode()
      this.captchaImg = data.content.captcha
      this.captchaId = data.content.captchaId
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
