<template>
  <div>
    <el-dialog
      :title="(item.id || item.id===0) ? '修改' : '新建'"
      :visible="visible"
      width="600px"
      :close-on-click-modal="false"
      :before-close="comfirmClose">
      <el-form
        label-width="110px"
        :model="form"
        :rules="rules"
        ref="form"
        class="login-form">
         <el-form-item
          label="姓名"
          prop="name">
          <el-input
            :disabled="isDisabled"
            :maxlength="20"
            size="medium"
            placeholder="请输入姓名"
            class="item"
            v-model="form.name" />
        </el-form-item>
        <el-form-item
          label="登录账号"
          prop="account">
          <el-input
            size="medium"
            :disabled="isDisabled"
            placeholder="请输入登录账号"
            class="item"
            :maxlength="20"
            v-model="form.account" />
        </el-form-item>
        <el-form-item
          label="登录密码"
          prop="password">
          <el-input
            size="medium"
            type='password'
            :disabled="item.id&&isDisabled"
            placeholder="请输入登录密码"
            class="item"
            :maxlength="20"
            v-model="form.password" />
        </el-form-item>
        <el-form-item
          label="手机号码"
          prop="phoneNum">
          <el-input
            size="medium"
            :disabled="isDisabled"
            :maxlength="11"
            placeholder="请输入手机号码"
            class="item"
            v-model="form.phoneNum" />
        </el-form-item><el-form-item
          label="联系电话"
          :maxlength="20"
          prop="contactInformation">
          <el-input
            :disabled="isDisabled"
            size="medium"
            placeholder="请输入联系电话"
            class="item"
            v-model="form.contactInformation" />
        </el-form-item>
        <el-form-item
          label="排序码"
          prop="sort	">
          <el-input
            :disabled="isDisabled"
            size="medium"
            placeholder="请输入排序码"
            class="item"
            v-model="form.sort" />
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
  </div>
</template>
<script>
import {setSubmit,modifySubmit,searchUser} from './service.js'
import { mapActions,mapState } from 'vuex'
import md5 from 'blueimp-md5'
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
    return {
      loading: false,
      form: {
        committeeId: '',
        account: '',
        name: '',
        password: '',
        phoneNum: '',
        sort: '',
        contactInformation: ''
      },
      multipleSelection: [],

      rules: {
        name: [
          { required: true, message: '请输入姓名！', trigger: 'blur' }
        ],
        account: [
          { required: true, message: '请输入登录账号！', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码！', trigger: 'blur' }
        ],
        phoneNum: [
          { validator: validate,required: true, trigger: 'blur' }
        ],

      },
      itemL: {}
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
    },
  },
  components: {

  },
  computed: {
    ...mapState('commonCommittee', {
      belongAreaId: state => state.belongAreaId
    })
  },
  created () {
    if(this.item.id || this.item.id===0) {
      this.searchUser({id: this.item.id})
    } else {
      this.form.committeeId = this.belongAreaId
    }

  },
  methods: {
    ...mapActions('committeeAcccount', [
      'getListData1'
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
      this.loading = true
      if(this.item.id || this.item.id===0) {
        await modifySubmit({...this.handerParams(),id: this.item.id})
      } else {
        await setSubmit(this.handerParams())
      }
      this.close()
      this.getListData1()
      this.loading = false
    },
    async searchUser (val) {
      const {data} = await searchUser(val)
      this.itemL = data.content
      let params = {
        account: this.itemL.account,
        name: this.itemL.name,
        password: '......',
        phoneNum: this.itemL.phoneNum,
        sort: this.itemL.sort,
        contactInformation: this.itemL.contactInformation,
        committeeId: this.itemL.committeeId
      }
      this.form = {...this.form,...params}
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
      if(this.item.id || this.item.id===0) {
        params.password = this.item.password
      } else {
        params.password=md5(this.item.password)
      }
      return params
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
