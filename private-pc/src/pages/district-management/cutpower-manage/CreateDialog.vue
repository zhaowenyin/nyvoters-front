<template>
  <el-dialog
    v-loading="loading"
    :title="item.id ? (isDisabled ? '查看' : '修改') : '新建'"
    :visible="visible"
    width="820px"
    :close-on-click-modal="false"
    :before-close="comfirmClose">
    <el-form
      label-width="110px"
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
              :disabled="isDisabled"
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
            <el-radio-group :disabled="true" size="medium" v-model="form.gender">
              <el-radio :label="1">男</el-radio>
              <el-radio :label="2">女</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="民族："
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
              :maxlength="11"
              size="medium"
              placeholder="请输入手机号"
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
              :placeholder="isDisabled?'':'请输入联系方式'"
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
                :disabled="isDisabled"
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
                :disabled="isDisabled"
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
              size="medium"
              placeholder="详细地址"
              class="item"
              v-model.trim="form.livingDetail" />
          </el-form-item>
        </el-col>
      </el-row>
       <el-form-item
       label="剥权时间"
        prop="startTime">
         <el-date-picker
          class="item"
          :disabled="isDisabled"
          v-model="form.startTime"
          placeholder="请选择剥权时间"
          type="date"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
           </el-date-picker>
      </el-form-item>
       <el-form-item
       label="剥权恢复时间"
        prop="endTime">
        <el-date-picker
          :disabled="isDisabled"
          class="item"
          v-model="form.endTime"
          type="date"
           placeholder="请选择剥权恢复时间"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
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
import {cardVali} from '../../../utils/format'
import { mapActions, mapState } from 'vuex'
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
        if (value.substring(value.length-2, value.length-1) % 2 === 0) {
          //女
          this.form.gender = 2
        }else{
          //男
          this.form.gender = 1
        }
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
        startTime: null,
        endTime: null
      },
      multipleSelection: [],
      rules: {
        name: [
          { required: true, message: '请输入姓名！', trigger: 'blur' }
        ],
        idNum:  [
          {  validator: validate1,required: true, trigger: 'blur' }
        ],
        gender: [
          { required: true, message: '请选择性别！', trigger: 'change' }
        ],
        nation: [
          { required: true, message: '请选择民族！', trigger: 'change' }
        ],
        phoneNum: [
          { validator: validate,required: true, trigger: 'blur' }
        ],
        householdRegistration: [
          { required: true, message: '请输入户籍地！', trigger: 'blur' }
        ],
        living:[
          { required: true, message: '请输入现居地！', trigger: 'blur' }
        ],
        startTime:[
          { required: true, message: '请选择剥权时间！', trigger: 'change' }
        ],
        endTime:[
          { required: true, message: '请选择剥权恢复时间！', trigger: 'change' }
        ],
      }
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
      this.form = {...this.form, ...this.item,startTime: this.item.startTime ? new Date(this.item.startTime) : '',endTime: this.item.endTime ? new Date(this.item.endTime) : ''}
    }
    //this.form = {...this.form, ...this.item }
    this.searchnation()
  },
  methods: {
    ...mapActions('cutPower', [
      'getListData'
    ]),
    ...mapActions('commonData', [
      'searchnation'
    ]),
    close () {
      this.$emit('update:visible', false)
    },
    submitForm () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.sumitData()
        }
      })
    },
    async sumitData () {
      try {
        this.loading = true
        if(this.item.name) {
          await modifySubmit({...this.handerParams(), id: this.item.id})
          this.$notify({
            title: '',
            message: '修改成功',
            type: 'success'
          });
        }else {
          await setSubmit(this.handerParams())
          this.$notify({
            title: '',
            message: '新建成功',
            type: 'success'
          });
        }
        this.close()
        this.getListData()
      } finally{
        this.loading = false
      }
    },
    comfirmClose () {
      if(this.isDisabled){
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
      let params = {...this.form}
      if(params.startTime !==null) {
        params.startTime = params.startTime.getTime()
      }
      if(params.endTime !==null) {
        params.endTime = params.endTime.getTime()
      }
      return params
    },
    housechange (val) {
      if(!this.living) {
        this.form.living = val
      }
    },
    detailchange(val) {
      if(!this.livingDetail) {
        this.form.livingDetail = val
      }

    },
    livingChange () {
      this.living = true
    },
    livingDetailChange () {
      this.livingDetail = true
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
