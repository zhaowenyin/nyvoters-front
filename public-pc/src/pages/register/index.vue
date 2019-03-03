<template>
  <div class="loginDiv">
    <div class="form">
      <el-form
        label-width="110px"
        :model="form"
        :rules="rules"
        ref="form"
        class="login-form">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item
              class="padding"
              label="姓名："
              prop="userName">
              <el-input
                size="medium"
                placeholder="请输入户姓名"
                class="item"
                v-model="form.userName" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="身份证号码："
                prop="idNum">
                <el-input
                  size="medium"
                  placeholder="请输入身份证号码"
                  :maxlength="18"
                  class="item"
                  v-model="form.idNum" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
            <el-form-item
              label="性别："
              prop="gender">
              <el-radio-group size="medium" v-model="form.gender">
                <el-radio :label="1">男</el-radio>
                <el-radio :label="2">女</el-radio>
              </el-radio-group>
              </el-form-item>
            </el-col>
          <el-col :span="12">
            <el-form-item
              label=" 民族："
              prop="nation">
               <el-select
               size="medium"
                style="width: 100%;"
                class="item"
                v-model="form.nation"
                clearable placeholder="请选择民族">
                <el-option
                  v-for="item in nationList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
           <el-col :span="12">
            <el-form-item
              label=" 手机号："
              prop="phoneNum">
              <el-input
                size="medium"
                placeholder="请输入电话号码"
                class="item"
                v-model="form.phoneNum" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="联系方式："
                prop="contactInformation">
                <el-input
                  size="medium"
                  placeholder="请输入联系方式"
                  class="item"
                  v-model="form.contactInformation" />
              </el-form-item>
            </el-col>
        </el-row>
        <el-form-item

          label="户籍地："
          prop="householdRegistration">
          <el-input
            size="medium"
            placeholder="请输入户籍地"
            class="item"
            v-model="form.householdRegistration" />
        </el-form-item>
        <el-form-item

          label="现居住地："
          prop="living">
          <el-input
            placeholder="请输入现居住地"
            class="item"
            v-model="form.living" />
        </el-form-item>
         <el-form-item
          class="padding"
          label="参选地类型："
          prop="candidateType">
          <el-select
            class="item1"
            v-model="form.candidateType"
            clearable placeholder="请选择参选地类型">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="有效验证码："
          class="out-valid">
          <div class="valid">
            <div class="out-img"><img class="img" src="../../assets/img/home.png"/></div>
            <div class="change" @click="change">[换一张]</div>
          </div>
        </el-form-item>
         <el-form-item
         prop="valid"
          label="验证码："
         class="padding">
          <el-input
              style="width: 200px;"
              placeholder="请输入验证码"
              :maxlength="18"
              class="item"
              v-model="form.valid" />
        </el-form-item>
        <el-form-item class="padding butSize">
            <el-button
            class="loginBtn"
            @click="cancelForm()">取消</el-button>
             <el-button
            type="primary"
            class="loginBtn"
            @click="submitForm()">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { registerSubmit } from './service.js'

export default {
  data () {
    return {
      form: {
        userName: '',
        idNum: '',
        householdRegistration: '',
        living: '',
        valid: '',
        candidateType: '',
        nation: '',
        gender: '',
        phoneNum: '',
        contact: '',
        type: 1
      },
      rules: {
        userName: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        idNum: [
          { required: true, message: '请输入身份证号', trigger: 'blur' }
        ],
        nation: [
          { required: true, message: '请选择民族', trigger: 'blur' }
        ],
        gender: [
          { required: true, message: '请选择性别', trigger: 'blur' }
        ],
        phoneNum: [
          { required: true, message: '请输入电话号码', trigger: 'blur' }
        ],
        householdRegistration: [
          { required: true, message: '请输入户籍地', trigger: 'blur' }
        ],
        living: [
          { required: true, message: '请输入现居住地', trigger: 'blur' }
        ],
        valid: [
          { required: true, message: '请输入验证码', trigger: 'blur' }
        ],
        candidateType: [
          { required: true, message: '请输入参选地址类型', trigger: 'blur' }
        ]
      },
      options: [{
        value: '1',
        label: '居住地'
      }, {
        value: '2',
        label: '外地'
      }],
      nationList: [{
        value: '1',
        label: '居住地'
      }, {
        value: '2',
        label: '外地'
      }]
    }
  },
  components: {
  },
  created () {

  },

  methods: {
    submitForm () {
      // this.$refs.form.validate((valid) => {
      //   if (valid) {
      this.loading = true
      registerSubmit(this.form)
        .then(() => {
          this.$router.push({path:'/register-success',query: {type: 1}})
          this.loading = false
        })
      //   }
      // })
    },
    cancelForm () {

    },
    change () {

    },
    handerParam(){

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
    overflow: auto;
    justify-content: center;
    align-items: center;
    background-color: #f4f4f4;
  }
  .form {
    display: flex;
    flex: 1;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    background-color: #f4f4f4;
  }
  .title {
    margin-top: 30px;
    height: 50px;
    line-height: 50px;
    padding-left: 100px;
    background-color: #d8d8d8;
    font-size: 16px;
  }
  /* .remind-info {
    font-size: 16px;
	color: #d02626;
    width: 960px;
    text-align: right;
    margin-bottom: 73px;
  } */
  .login-form {
    width: 960px;
    padding:0 60px;
    height: 100%;
    border-radius:4px;

  }
  .item {
    width: 100%;
    background-color: #ffffff;
    border-radius: 4px;
    border: solid 1px #b1b8c2;
  }
  .item1 {
    background-color: #ffffff;
    border-radius: 4px;
    border: solid 1px #b1b8c2;
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

  .out-valid {
    margin-bottom: 40px;
    & .valid {
      display: flex;
      padding-right:91px;
      & .change {
        font-size: 14px;
        color: #222222;
        cursor: pointer;
        margin-left: 20px;
      }
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
  }
  /* .padding {
    margin-bottom: 40px;
  } */
 .butSize {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
 }

</style>
<style>
.el-input--medium .el-input__inner {
   border: none;
}
</style>
