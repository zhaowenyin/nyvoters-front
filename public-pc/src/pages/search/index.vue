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
          prop="userName">
          <el-input
           size="medium"
            placeholder="请输入用户名"
            :maxlength="18"
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
            type="primary"
            class="loginBtn"
            @click="submitForm()">查询</el-button>
        </el-form-item>
      </el-form>
    </div>

  </div>
</template>

<script>
import { searchSubmit,  getCode} from './service.js'

export default {
  data () {
    return {
      userLogin: {
        userName: '',
        idNum: '',
        captcha: '',
        captchaId: '',
      },
      rules: {
        userName: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        idNum: [
          { required: true, message: '请输入身份证号码', trigger: 'blur' }
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
    this.searchCode()
  },
  methods: {
    submitForm () {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading =  true
          searchSubmit(this.userLogin)
            .then(({data}) => {
              if(data) {
                this.$router.push({path:'/search-success',query: {type: 2,info: data.content.info,id:data.content.id}})
              }
              this.loading =  false

            })
        }
      })
    },
    change () {
      this.searchCode()
    },
    async searchCode () {
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
  }
  .login-form {
    width:100%;
    padding: 0 150px;
    border-radius:4px;
  }
  .item {
    width: 100%;
    border-radius: 4px;

  }
  .loginBtn {
    width: 200px;
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

</style>
<style>

</style>
