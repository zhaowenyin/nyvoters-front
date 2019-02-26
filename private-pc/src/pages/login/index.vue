<template>
  <div class="loginDiv">
    <div class="loginBox">
      <el-form
        :model="userLogin"
        :rules="rules"
        ref="loginForm"
        class="login-form">
        <h1>登录</h1>
        <el-form-item prop="username">
          <el-input
            placeholder="请输入用户名"
            class="item"
            v-model="userLogin.username" />
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            placeholder="请输入密码"
            type="password"
            class="item"
            v-model="userLogin.password" />
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            class="loginBtn"
            @click="submitForm()">登录服务后台</el-button>
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
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
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
    background-size: cover;
    position: relative;
  }
  .loginBox {
    flex:1;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 50%;
    right: 120px;
    transform: translateY(-50%);
    width:300px;
    height:464px;
    background:rgba(255,255,255,1);
    box-shadow:0px 4px 10px 0px rgba(0,0,0,0.1);
    border-radius:4px;
    border:1px solid #eee;
  }
  .login-form {
    width: 300px;
    /*margin-left: 100px;*/
    margin: 0 30px;
  }
  .item {
    width: 100%;
  }
  h1 {
    text-align: center;
    font-size: 24px;
    color:#324057;
    margin-bottom: 20px;
  }
  .loginBtn {
    width: 100%;
  }
  .forget-btn {
    width: 100%;
    margin-left: 0;
  }
</style>
