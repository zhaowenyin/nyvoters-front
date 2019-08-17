<template>
  <div>
    <el-dialog
      title="重置密码"
      :visible="visible"
      :close-on-click-modal="false"
      width="700px"
      :before-close="comfirmClose">
      <el-form
        label-width="110px"
        :model="form"
        :rules="rules"
        ref="form"
        class="login-form">
        <el-form-item>
          您现在要对 用户：{{item.name}} 登录账号：{{item.account}}  重置登录密码
        </el-form-item>
        <el-form-item
          label="登录密码"
          prop="password">
          <el-input
            size="medium"
            placeholder="请输入新登录密码 （6位以上的字符）"
            class="item"
            type="password"
            :maxlength="20"
            v-model.trim="form.password" />
        </el-form-item>
        <el-form-item
          label="登录密码"
          prop="checkPass">
          <el-input
            size="medium"
            placeholder="请输入确认密码"
            class="item"
            autocomplete="off"
            :maxlength="20"
            type="password"
            v-model.trim="form.checkPass" />
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="footer">
        <el-button
          @click="submitForm()"
          size="medium"
          autocomplete="off"
          :loading="loading"
          type="primary">确定</el-button>
          <el-button
          @click="comfirmClose()"
          size="medium">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {modifySubmit,searchUser} from './service.js'
import { mapActions } from 'vuex'
import md5 from 'blueimp-md5'
export default {
  data () {
    let validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (value.length<6) {
          callback(new Error('请输入6位以上的字符'));
        }
        if (this.form.checkPass !== '') {
          this.$refs.form.validateField('checkPass');
        }
        callback();
      }
    };
    let validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入新密码'));
      } else if (value !== this.form.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      loading: false,
      form: {
        checkPass: '',
        password: ''
      },
      multipleSelection: [],
      rules: {
        password: [
          { validator: validatePass, trigger: 'blur',required: true },
          { min: 6, max: 20, message: '请输入6位以上的登录密码！', trigger: 'blur' },
          { max: 20, message: '登录密码最多支持20个字符！', trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur',required: true },
          { min: 6, max: 20, message: '请输入6位以上的登录密码！', trigger: 'blur' },
          { max: 20, message: '登录密码最多支持20个字符！', trigger: 'blur' }
        ],

      },
      params: {}
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
    }
  },
  components: {

  },
  created () {
    this.searchUser({id: this.item.id})
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
      await modifySubmit({password: md5(this.form.password), id: this.item.id,...this.params})
      this.close()
      this.getListData1()
      this.loading = false
    },
    comfirmClose () {
      this.$confirm('关闭将丢失已编辑的内容，确认关闭？')
        .then(() => {
          this.close()
        })
        .catch(() => {})
    },
    saveData (val) {
      this.form.precinct = val.name
      this.form.precinctId = val.id
    },
    async searchUser (val) {
      const {data} = await searchUser(val)
      this.itemL = data.content
      let params = {
        account: this.itemL.account,
        name: this.itemL.name,
        phoneNum: this.itemL.phoneNum,
        sort: this.itemL.sort,
        contactInformation: this.itemL.contactInformation,
        committeeId: this.itemL.committeeId
      }
      this.params = params
    },
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
