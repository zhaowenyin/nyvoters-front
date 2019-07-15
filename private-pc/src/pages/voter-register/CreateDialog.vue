<template>
  <el-dialog
    :title="item.id ? '修改' : '登记'"
    :visible="visible"
    width="820px"
    :before-close="comfirmClose">
    <el-form
      label-width="130px"
      :model="form"
      :rules="rules"
      ref="form"
      class="login-form">
      <el-row :gutter="20">
         <el-col :span="12">
          <el-form-item
            label="姓名"
            prop="name">
            <el-input
             :disabled="isDisabled"
              size="medium"
              placeholder="请输入姓名"
              class="item"
              v-model="form.name" />
          </el-form-item>
        </el-col>
         <el-col :span="12">
          <el-form-item
            label="身份证号码"
            prop="idNum">
            <el-input
              :disabled="isDisabled"
              size="medium"
              placeholder="请输入身份证号码"
              :maxlength="18"
              class="item"
              v-model="form.idNum" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="性别"
            prop="gender">
            <el-radio-group :disabled="isDisabled" size="medium" v-model="form.gender">
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
             :disabled="isDisabled"
              size="medium"
              style="width: 100%;"
              class="item"
              v-model="form.nation"
              clearable placeholder="请选择">
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
            label="手机号码"
            prop="phoneNum">
            <el-input
              :disabled="isDisabled"
              size="medium"
              placeholder="请输入"
              class="item"
              v-model="form.phoneNum" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="联系方式"
            prop="contactInformation">
            <el-input
              :disabled="isDisabled"
              size="medium"
              placeholder="请输入"
              class="item"
              v-model="form.contactInformation" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item
              label="户籍地"
              prop="householdRegistration">
              <el-input
                :disabled="isDisabled"
                size="medium"
                placeholder="请输入户籍地"
                class="item"
                v-model="form.householdRegistration" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
            label-width="0"
              label=""
              prop="householdRegistrationDetail">
              <el-input
                :disabled="isDisabled"
                size="medium"
                placeholder="详细地址"
                class="item"
                v-model="form.householdRegistrationDetail" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="现居住地"
              prop="living">
            <el-input
              :disabled="isDisabled"
              placeholder="请输入现居住地"
              class="item"
              v-model="form.living" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label=""
            label-width="0"
            prop="livingDetail">
            <el-input
              :disabled="isDisabled"
              size="medium"
              placeholder="详细地址"
              class="item"
              v-model="form.livingDetail" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
           <el-form-item
            class="padding"
            label="参选地类型"
            prop="candidateType">
            <el-select
              :disabled="isDisabled"
              class="item"
              size="medium"
              v-model="form.candidateType"
              clearable placeholder="请选择参选地类型">
              <el-option
                v-for="(item, key) in candidateTypeList"
                :key="key"
                :label="item"
                :value="+key">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
         <el-col v-if="+form.candidateType === 1" :span="12">
          <el-form-item
            label="持资格转移证明"
            prop="proveDocId">
            <el-radio-group  :disabled="isDisabled" size="medium" v-model="form.proveDocId">
              <el-radio :label="'1'">是</el-radio>
              <el-radio :label="'0'">否</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
           <el-form-item
            class="padding"
            label="登记方式"
            prop="registrationType">
            <el-select
              size="medium"
              class="item"
              :disabled="true"
              v-model="form.registrationType"
              clearable placeholder="请选择登记方式">
              <el-option
                v-for="(item,key) in registrationTypeList"
                :key="key"
                :label="item"
                :value="+key">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="登记日期"
            prop="registrationTime">
            <el-date-picker
              :disabled="isDisabled"
              class="item"
              v-model="form.registrationTime"
              type="date"
              placeholder="请选择">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="登记人"
            prop="registrar">
              <el-input
                :disabled="true"
                size="medium"
                placeholder="请输入登记人"
                :maxlength="18"
                class="item"
                v-model="form.registrar" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div
      slot="footer"
      class="footer">
       <el-button
         v-if="!isDisabled"
          @click="submitForm()"
          size="medium"
          :loading="loading"
          type="primary">确定</el-button>
          <el-button
           v-if="!isDisabled"
          @click="comfirmClose()"
          size="medium">取消</el-button>
          <el-button
           v-if="isDisabled"
           type="primary"
            @click="comfirmClose()"
          size="medium">确定</el-button>
    </div>
  </el-dialog>
</template>
<script>
import {setSubmit,modifySubmit} from './service.js'
import {registrationTypeList, candidateTypeList} from '../../common-data/config.js'
import { mapActions,mapState } from 'vuex'
import {getSession} from '../../utils/session'
import {cardVali} from '../../utils/format'
export default {
  data () {
    const session = getSession()
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
      loading: false,
      form: {
        name: '',
        idNum: '',
        gender: '',
        nation: '',
        phoneNum: '',
        contactInformation: '',
        householdRegistration: '',
        householdRegistrationDetail: '',
        living: '',
        livingDetail: '',
        candidateType: '',
        registrationType: '',
        registrationTime: '',
        registrar: '',
        proveDocId: ''
      },
      multipleSelection: [],
      rules: {
        name: [
          { required: true, message: '请输入姓名！', trigger: 'blur' }
        ],
        idNum:  [
          { validator: validate1,required: true, trigger: 'blur' }
        ],
        gender: [
          { required: true, message: '请选择性别！', trigger: 'change' }
        ],
        nation: [
          { required: true, message: '请选择民族！', trigger: 'change' }
        ],
        phoneNum: [
          { validator: validate,required: true, message: '请输入电话号码！', trigger: 'blur' }
        ],
        householdRegistration: [
          { required: true, message: '请输入户籍地！', trigger: 'blur' }
        ],
        householdRegistrationDetail: [
          { required: true, message: '请输入详细地址！', trigger: 'blur' }
        ],
        living:[
          { required: true, message: '请输入现居地！', trigger: 'blur' }
        ],
        livingDetail:[
          { required: true, message: '请输入详细地址！', trigger: 'blur' }
        ],
        candidateType:[
          { required: true, message: '请选择参选地类型！', trigger: 'change' }
        ],
        registrationType:[
          { required: true, message: '请选择登记方式！', trigger: 'change' }
        ],
        registrationTime:[
          { required: true, message: '请选择登记日期！', trigger: 'change' }
        ],
        registrar:[
          { required: true, message: '请输入登记人!', trigger: 'blur' }
        ],
        proveDocId: [
          { required: true, message: '请选择持资格转移证明!', trigger: 'change' }
        ],
      },
      registrationTypeList,
      candidateTypeList,
      session
    }

  },
  props:{
    visible: {
      default: false,
      type: Boolean
    },
    item: {
      default: () => {},
      type: Object
    },
    belongAreaId: {
      default: '',
      type: String,
    },
    isDisabled: {
      default: false,
      type: Boolean
    }
  },
  computed: {
    ...mapState('commonData', {
      nationList: state => state.nationList,
    })
  },
  created () {
    if(this.item.id) {
      this.form = {...this.form, ...this.item,registrationTime: this.item.registrationTime ? new Date(this.item.registrationTime) : ''}
    }
    this.form.registrationType = this.session.accountType
    this.form.registrar = this.session.name
    this.searchnation()
  },
  methods: {
    ...mapActions('voterRegister', [
      'getListData'
    ]),
    ...mapActions('commonData', [
      'searchnation'
    ]),
    close () {
      this.$emit('update:visible', false)
    },
    submitForm () {
      if(this.form.candidateType === 0) {
        this.$refs.form.clearValidate('candidateType')
        this.form.proveDocId=""
      }
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.sumitData()
        }
      })
    },
    async sumitData () {
      try {
        this.loading = true
        if(this.item.id) {
          await modifySubmit(this.handerParams())
        } else {
          await setSubmit(this.handerParams())
        }
        this.close()
        this.getListData()
        this.$notify({
          title: '',
          message: '数据保存成功',
          type: 'success'
        });
      } catch (error) {
        console.log(error)
      }finally{
        this.loading = false
      }


    },
    comfirmClose () {
      this.close()
    },
    handerParams () {
      let params = {...this.form,precinctId: this.belongAreaId}
      params.registrationTime = params.registrationTime.getTime()
      return params
    },
    cardVali
  }

}
</script>
<style scoped>
.left {
  margin: 10px 0;
}
.item {
  width: 100%;
}
</style>
<style>
  .table-obj .el-form-item {
    margin: 15px 0;
  }
</style>
