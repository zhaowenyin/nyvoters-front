<template>
  <div class="loginDiv">
    <img style="width: 530px; margin-top: 120px;" src="../../assets/img/login-icon.png"/>
    <div class="loginBox">
      <el-form
        label-width="80px"
        :model="userLogin"
        :rules="rules"
        ref="loginForm"
        class="login-form">
        <el-form-item
          class="padding"
          label="用户名："
          prop="username">
          <el-input
            placeholder="请输入账号/手机号"
            :maxlength="18"
            class="item"
            v-model="userLogin.username" />
        </el-form-item>
        <el-form-item
         class="padding"
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
          <div class="change" @click="change">换一张</div>
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
import { login } from './service.js'
import { verifyArr } from './config.js'

export default {
  data () {
    return {
      userLogin: {
        username: '',
        password: '',
        valid: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入身份证号/手机号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        valid: [
          { required: true, message: '请输入验证码', trigger: 'blur' }
        ]
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
    change () {

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
    padding: 58px 0 63px 0;
  }
  .login-form {

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
    width: 100%;
    height: 40px;
    background-color: #d41c1a;
    border-radius: 2px;
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
  }

</style>
