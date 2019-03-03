<template>
  <div class="loginDiv">
    <div class="form">
        <el-form
        label-width="110px"
        :model="userLogin"
        :rules="rules"
        ref="loginForm"
        class="login-form">
        <el-form-item
          class="padding"
          label="用户名："
          prop="username">
          <el-input
            placeholder="请输入用户名"
            :maxlength="18"
            class="item"
            v-model="userLogin.username" />
        </el-form-item>
        <el-form-item
          class="padding"
          label="身份证号码："
          prop="idNum">
          <el-input
            placeholder="请输入身份证号码"
            :maxlength="18"
            class="item"
            v-model="userLogin.idNum" />
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
            <div class="out-img"><img class="img" src="../../assets/img/guohui.png"/></div>
          </div>
          <div class="change" @click="change">[换一张]</div>
        </el-form-item>
        <el-form-item class="padding butSize">
          <el-button
            type="primary"
            class="loginBtn"
            @click="submitForm()">查询</el-button>
        </el-form-item>
      </el-form>
    </div>

  </div>
</template>

<script>
import { searchSubmit } from './service.js'

export default {
  data () {
    return {
      userLogin: {
        username: '',
        idNum: '',
        valid: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        idNum: [
          { required: true, message: '请输入身份证号码', trigger: 'blur' }
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

  },
  methods: {
    submitForm () {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading =  true
          searchSubmit(this.userLogin)
            .then(() => {
              this.$router.push({path:'/search-success',query: {type: 2}})
              this.loading =  false

            })
        }
      })
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
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

  }
  .form {
    width: 960px;
    display: flex;
    flex: 1;
    justify-content: center;
    padding-top: 80px;
  }
  .login-form {
    width:100%;
    padding: 0 150px;
    background:rgba(255,255,255,1);
    border-radius:4px;
  }
  .item {
    width: 100%;
    background-color: #ffffff;
    border-radius: 4px;
    border: solid 1px #b1b8c2;
  }
  .loginBtn {
    width: 200px;
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
    margin-bottom: 40px;
    & .change {
      position: absolute;
      right: 43px;
      top: 0px;
      font-size: 14px;
      color: #222222;
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

</style>
