<template>
  <div class="loginDiv">
    <div class="title">在线登记</div>
    <div class="remind-info">欢迎您在线自助提交选民登记信息，请确保所填信息的准确性，以免影响登记审核结果</div>
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
                placeholder="请输入户姓名"
                class="item"
                v-model="form.userName" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                class="padding"
                label="身份证号码："
                prop="no_id">
                <el-input
                  placeholder="请输入身份证号码"
                  :maxlength="18"
                  class="item"
                  v-model="form.no_id" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
            <el-form-item
              class="padding"
              label="性别："
              prop="gender">
              <el-radio-group v-model="form.gender">
                <el-radio :label="1">男</el-radio>
                <el-radio :label="2">女</el-radio>
              </el-radio-group>
              </el-form-item>
            </el-col>
          <el-col :span="12">
            <el-form-item
              class="padding"
              label=" 民族："
              prop="nation">
               <el-select
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
              class="padding"
              label=" 手机号："
              prop="phone">
              <el-input
                placeholder="请输入电话号码"
                class="item"
                v-model="form.phone" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                class="padding"
                label="联系方式："
                prop="contact">
                <el-input
                  placeholder="请输入联系方式"
                  class="item"
                  v-model="form.contact" />
              </el-form-item>
            </el-col>
        </el-row>
        <el-form-item
          class="padding"
          label="户籍地："
          prop="domicile">
          <el-input
            placeholder="请输入户籍地"
            class="item"
            v-model="form.domicile" />
        </el-form-item>
        <el-form-item
          class="padding"
          label="现居住地："
          prop="current_address">
          <el-input
            placeholder="请输入现居住地"
            class="item"
            v-model="form.current_address" />
        </el-form-item>
         <el-form-item
          class="padding"
          label="参选地类型："
          prop="address_type">
          <el-select
            class="item1"
            v-model="form.address_type"
            clearable placeholder="请选择">
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
import { login } from './service.js'

export default {
  data () {
    return {
      form: {
        userName: '',
        no_id: '',
        domicile: '',
        current_address: '',
        valid: '',
        address_type: '',
        nation: '',
        gender: '',
        phone: '',
        contact: ''
      },
      rules: {
        userName: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        no_id: [
          { required: true, message: '请输入身份证号', trigger: 'blur' }
        ],
        nation: [
          { required: true, message: '请选择民族', trigger: 'blur' }
        ],
        gender: [
          { required: true, message: '请选择性别', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入电话号码', trigger: 'blur' }
        ],
        domicile: [
          { required: true, message: '请输入户籍地', trigger: 'blur' }
        ],
        current_address: [
          { required: true, message: '请输入现居住地', trigger: 'blur' }
        ],
        valid: [
          { required: true, message: '请输入验证码', trigger: 'blur' }
        ],
        address_type: [
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
    document.addEventListener('keydown', this.enterSubmit, false)
  },
  destroyed () {
    document.removeEventListener('keydown', this.enterSubmit, false)
  },
  methods: {
    submitForm () {
      this.$refs.form.validate((valid) => {
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
    cancelForm () {

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

  }
  .form {
    display: flex;
    flex: 1;
    align-items: center;
    flex-direction: column;
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
  .remind-info {
    color: red;
    padding: 15px;
    margin: 5px 0 30px 0;
    padding-left: 100px;
  }
  .login-form {
    padding: 0 15%;;
    height: 100%;
    background:rgba(255,255,255,1);
    border-radius:4px;
    overflow: auto;
  }
  .item {
    width: 100%;
    background-color: #ffffff;
    border-radius: 2px;
    border: solid 1px #cccccc;
  }
  .item1 {
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
    border-radius: 2px;
    margin-right: 40px;

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
        font-size: 12px;
        cursor: pointer;
        margin-left: 20px;
      }
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
  }
  .padding {
    margin-bottom: 40px;
  }
 .butSize {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
 }

</style>
