<template>
  <el-dialog
    :title="item.id ? (isDisabled ? '查看' : '修改') : '登记'"
    :visible="visible"
    width="820px"
    :close-on-click-modal="false"
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
             :disabled="isDisabled&&!enableItem.name"
              size="medium"
              placeholder="请输入姓名"
              :maxlength="20"
              class="item"
              v-model.trim="form.name" />
          </el-form-item>
        </el-col>
         <el-col :span="12">
          <el-form-item
            label="身份证号码"
            prop="idNum">
            <el-input
              :disabled="isDisabled&&!enableItem.idNum"
              size="medium"
              placeholder="请输入身份证号码"
              :maxlength="18"
              class="item"
              v-model.trim="form.idNum" />
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
              :maxlength="11"
              class="item"
              v-model.trim="form.phoneNum" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="联系方式"
            prop="contactInformation">
            <el-input
              :disabled="isDisabled"
              :maxlength="80"
              size="medium"
              placeholder="请输入"
              class="item"
              v-model.trim="form.contactInformation" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item
              label="户籍地"
              prop="householdRegistration">
              <el-input
                @change="housechange"
                :disabled="isDisabled&&!enableItem.householdRegistration"
                :maxlength="80"
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
                :disabled="isDisabled&&!enableItem.householdRegistrationDetail"
                :maxlength="150"
                size="medium"
                placeholder="详细地址"
                class="item"
                v-model.trim="form.householdRegistrationDetail" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="现居住地"
              prop="living">
            <el-input
              @change="livingChange"
              :disabled="isDisabled"
              :maxlength="80"
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
              :maxlength="150"
              size="medium"
              placeholder="详细地址"
              class="item"
              v-model.trim="form.livingDetail" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
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
         <el-col v-if="+form.candidateType !== 0" :span="12">
          <el-form-item
            label="持资格转移证明"
            prop="proveDocId">
            <el-radio-group  :disabled="isDisabled&&!enableItem.proveDocId" size="medium" v-model="form.proveDocId">
              <el-radio :label="1">是</el-radio>
              <el-radio :label="0">否</el-radio>
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
              :disabled="true"
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
                :maxlength="20"
                class="item"
                v-model.trim="form.registrar" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
     <el-dialog
      width="500px"
      :close-on-click-modal="false"
      title="提示"
      :visible.sync="innerVisible"
      :before-close="innerClose"
      append-to-body>
      <div>该选民已经在：{{handerdata.fromPrecinctName}}</div>
      <div style="padding-bottom:20px;">是否申请转入：{{handerdata.toPrecinctName}}？</div>
      <el-form
      label-width="60px"
      :model="innerForm"
      :rules="innerRules"
      ref="innerForm"
      class="login-form">
      <el-form-item
        label="原因"
        prop="reason">
        <el-input
          type="textarea"
          :rows="4"
          placeholder="请填写申请转移原因"
          :maxlength="100"
          v-model.trim="innerForm.reason">
        </el-input>
      </el-form-item>
    </el-form>
      <div slot="footer" class="dialog-footer">
      <el-button
          @click="handerSupply"
          size="medium"
          :loading="loading"
          type="primary">申请</el-button>
      <el-button @click="innerClose">取消</el-button>
    </div>
    </el-dialog>
    <div
      slot="footer"
      class="footer">
       <el-button
         v-if="+openMode === 1"
          @click="submitForm()"
          size="medium"
          :loading="loading"
          type="primary">确定</el-button>
          <el-button
           v-if="+openMode === 1"
          @click="comfirmClose()"
          size="medium">取消</el-button>
          <el-button
           v-if="+openMode === 2"
           type="primary"
            @click="comfirmClose()"
          size="medium">确定</el-button>
    </div>
  </el-dialog>
</template>
<script>
import {setSubmit,modifySubmit,supplyTransfer} from './service.js'
import {registrationTypeList, candidateTypeList} from '../../common-data/config.js'
import { mapActions,mapState } from 'vuex'
import {getSession} from '../../utils/session'
import {cardVali} from '../../utils/format'
import {phone_reg} from '../../../utils/validate'
export default {
  data () {
    const session = getSession()
    let validate = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入手机号'))
      } else {
        if (!phone_reg.test(value)) {
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
          { validator: validate,required: true, message: '请输入正确手机号！', trigger: 'blur' }
        ],
        householdRegistration: [
          { required: true, message: '请输入户籍地！', trigger: 'change' }
        ],
        living:[
          { required: true, message: '请输入现居地！', trigger: 'change' }
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
      innerForm: {
        reason: ''
      },
      innerRules: {
        reason:[
          { required: true, message: '请填写申请转移原因', trigger: 'blur' }
        ]
      },
      registrationTypeList,
      candidateTypeList,
      session,
      innerVisible: false,
      handerdata: {},
      livingDetail: false,
      living: false
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
    openMode: {
      default: 1,
      type: Number,
    },
    isDisabled: {
      default: false,
      type: Boolean
    },
    enableItem: {
      default: () => {},
      type: Object
    }
  },
  computed: {
    ...mapState('commonData', {
      nationList: state => state.nationList,
    })
  },
  created () {
    if(this.item.id) {
      this.form = {...this.form, ...this.item,registrationTime: this.item.registrationTime ? new Date(this.item.registrationTime) : '',proveDocId:this.item.proveDocId ? +this.item.proveDocId : ''}
    }
    this.form.registrationType = this.session.accountType
    this.form.registrar = this.session.name
    this.searchnation()
    console.log(this.enableItem)
    console.log(this.openMode)
  },
  methods: {
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
        let handerdata = null
        if(this.item.id) {
          const{data} = await modifySubmit(this.handerParams())
          handerdata = data
        } else {
          const{data} = await setSubmit(this.handerParams())
          handerdata = data
        }
        if(handerdata.code&&handerdata.code==='30200001') {
          this.handerdata = handerdata.content
          this.innerVisible = true
          return
        }
        this.$emit('getListData')
        this.close()
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
      if(+this.openMode===2){
        this.close()
        return
      }
      this.$confirm('关闭将丢失已编辑的内容，确认关闭？')
        .then(() => {
          this.close()
        })
        .catch(() => {})
    },
    handerParams () {
      let params = {...this.form,precinctId: this.belongAreaId}
      params.registrationTime = params.registrationTime.getTime()
      return params
    },
    cardVali,
    handerSupply(){
      this.$refs.innerForm.validate((valid) => {
        if (valid) {
          this.supplyTransfer()
        }
      })
    },
    async supplyTransfer() {
      const params = {
        idNum: this.handerdata.idNum,
        transferReason: this.innerForm.reason,
        fromPrecinctId: this.handerdata.fromPrecinctId,
        toPrecinctId: this.handerdata.toPrecinctId
      }
      await supplyTransfer(params)
      this.$emit('getListData')
      this.innerClose()
      this.close()
      this.$notify({
        title: '',
        message: '申请转移成功',
        type: 'success'
      });

    },
    innerClose () {
      this.innerVisible = false
    },
    housechange (val) {
      if(!this.living) {
        this.$nextTick(() => {
          this.form.living = val
        })
      }
    },
    detailchange(val) {
      if(!this.livingDetail) {
        this.$nextTick(() => {
          this.form.livingDetail = val
        })
      }

    },
    livingChange () {
      this.living = true
    },
    livingDetailChange () {
      this.livingDetail = true
    }
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
