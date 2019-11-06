<template>
  <div class="loginDiv">
    <div class="form">
      <el-form
        label-width="130px"
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
                placeholder="请输入姓名"
                class="item"
                v-model.trim="form.userName" />
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
                  v-model.trim="form.idNum" />
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
                  v-for="(item, key) in nationList"
                  :key="key"
                  :label="item.desc"
                  :value="item.stringCode">
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
                placeholder="请输入手机号"
                class="item"
                v-model.trim="form.phoneNum" />
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
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item
              label="户籍地："
              prop="householdRegistration">
              <el-input
                size="medium"
                placeholder="请输入户籍地"
                class="item"
                v-model.trim="form.householdRegistration" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label-width="0px"
              label=""
              prop="householdRegistrationDetail">
              <el-input
                @change="detailchange"
                :disabled="isDisabled"
                size="medium"
                placeholder="详细地址"
                class="item"
                v-model.trim="form.householdRegistrationDetail" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="现居住地："
              prop="living">
              <el-input
                placeholder="请输入现居住地"
                class="item"
                v-model.trim="form.living" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label=""
              label-width="0px"
              prop="livingDetail">
              <el-input
                @change="livingDetailChange"
                :disabled="isDisabled"
                size="medium"
                placeholder="详细地址"
                class="item"
                v-model.trim="form.livingDetail" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="60">
          <el-col :span="12">
            <el-form-item
            class="padding"
            label="参选地类型："
            prop="candidateType">
            <el-select
              class="item"
              v-model="form.candidateType"
              clearable placeholder="请选择参选地类型">
              <el-option
                v-for="(item,key) in candidateTypeList"
                :key="key"
                :label="item"
                :value="key">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
         <el-col v-if="+form.candidateType !== 0" :span="12">
          <el-form-item
            label="持资格转移证明"
            prop="isProve">
            <el-radio-group size="medium" v-model="form.isProve">
              <el-radio :label="1">是</el-radio>
              <el-radio :label="0">否</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        </el-row>
        <el-form-item
          prop="captcha"
          label="有效验证码："
          class="out-valid">
          <div class="valid">
             <el-input
              style="width: 208px;"
              placeholder="请输入验证码"
              maxlength="18"
              class="item3"
              v-model.trim="form.captcha" />
            <div class="out-img"><img class="img" :src="captchaImg"/></div>
            <div class="change" @click="change">[换一张]</div>
          </div>
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
import { registerSubmit, getCode } from './service.js'
import {candidateTypeList} from '../../common-data/config.js'
import { mapActions,mapState } from 'vuex'
import{cardVali} from '../../utils/format'

export default {
  data () {
    let validate = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入手机号'))
      } else {
        if (!/^1[34578]\d{9}$/.test(value)) {
          callback(new Error('请输入正确手机号'))
        }
        callback()
      }
    }
    const validate1 = (rule, value, callback) => {
      let val = this.cardVali(value)
      if (val.status !== 1) {
        callback(new Error(val.message))
      } else {
        callback()
      }
    }
    return {
      form: {
        userName: '',
        idNum: '',
        householdRegistration: '',
        living: '',
        candidateType: '',
        nation: '',
        gender: '',
        phoneNum: '',
        contactInformation: '',
        type: 1,
        captcha: '',
        captchaId: '',
        isProve: ''
      },
      rules: {
        userName: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        idNum: [
          { validator: validate1,required: true, trigger: 'blur' }
        ],
        nation: [
          { required: true, message: '请选择民族', trigger: 'change' }
        ],
        gender: [
          { required: true, message: '请选择性别', trigger: 'change' }
        ],
        phoneNum: [
          { validator: validate,required: true, trigger: 'blur'  }
        ],
        householdRegistration: [
          { required: true, message: '请输入户籍地', trigger: 'blur' }
        ],
        living: [
          { required: true, message: '请输入现居住地', trigger: 'blur' }
        ],
        captcha: [
          { required: true, message: '请输入验证码', trigger: 'blur' }
        ],
        candidateType: [
          { required: true, message: '请输入参选地址类型', trigger: 'blur' }
        ],
        isProve: [
          { required: true, message: '请选择持资格转移证明!', trigger: 'change' }
        ],
      },
      candidateTypeList,
      captchaImg: ''
    }
  },
  components: {
  },
  created () {
    this.searchCode()
    this.searchnation()
  },
  computed: {
    ...mapState('commonData', {
      nationList: state => state.nationList,
    })
  },

  methods: {
    ...mapActions('commonData', [
      'searchnation'
    ]),
    submitForm () {
      if(this.form.candidateType === 0) {
        this.$refs.form.clearValidate('candidateType')
        this.form.isProve=""
      }
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.loading = true
          registerSubmit(this.form)
            .then(({data}) => {
              const content = data
              if(data.content) {
                this.$router.push({path:'/register-success',query: {type: 1, info: content.info}})
              }else {
                this.$notify({
                  title: '',
                  message: data.message,
                  type: 'error'
                })
                this.searchCode()
              }
              this.loading =  false
            }).catch(()=> {
              console.log(888)
              this.searchCode()
              this.loading =  false
            })
        }
      })
    },
    cancelForm () {

    },
    change () {
      this.searchCode()

    },
    handerParam(){

    },
    async searchCode () {
      const {data} = await getCode()
      this.captchaImg = 'data:imagepng;base64,'+ data.content.captcha
      this.form.captchaId = data.content.captchaId
    },
    cardVali

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
  .login-form {
    width: 960px;
    padding:0 60px;
    height: 100%;
    border-radius:4px;

  }
  .item {
    width: 100%;
    border-radius: 4px;
  }
  .item3 {
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
</style>
