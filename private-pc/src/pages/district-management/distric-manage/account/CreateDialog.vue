<template>
  <div>
    <el-dialog
      :title="(item.id || item.id===0) ? '修改' : '新建'"
      :visible="visible"
      width="600px"
      :before-close="comfirmClose">
      <el-form
        label-width="110px"
        :model="form"
        :rules="rules"
        ref="form"
        class="login-form">
         <el-form-item
            label="帐号类型"
            prop="gender">
            <el-radio-group size="medium" v-model="form.registrationType">
              <el-radio
                v-for="(i, key) in registrationTypeList"
                :key="+key"
                :label="+key">{{i}}</el-radio>
            </el-radio-group>
          </el-form-item>
         <el-form-item
          label="姓名"
          prop="name">
          <el-input
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
            placeholder="请输入登录密码"
            class="item"
            :maxlength="20"
            v-model="form.password" />
        </el-form-item>
        <el-form-item
          label="管理选区"
          prop="precinctId">
          <DistrictSelect
          :labels="form.precinct"
          :multiple="true"
          @setData="setData"
          @clear="clear"
          v-model="form.precinctId"
          :item='item'
          :data="data"
          />
        </el-form-item>
        <el-form-item
          label="排序码"
          prop="sort	">
          <el-input
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
          @click="submitForm()"
          size="medium"
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
import {setSubmit} from './service.js'
import { mapActions,mapState } from 'vuex'
import {registrationTypeList} from '../../../../common-data/config.js'
import DistrictSelect from '../../../../components/DistrictSelect'
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
        sort: '',
        registrationType: '',
        precinctId: [],
        precinct: []
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
        registrationType: [
          { required: true, message: '请选择帐号类型！' ,trigger: 'change' }
        ]
      },
      registrationTypeList
    }

  },
  computed: {
    ...mapState('commonData', {
      data: state => state.treeList
    })
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
    DistrictSelect
  },
  created () {
    let params = {}
    if(this.item.id || this.item.id===0) {
      params = {
        account: this.item.account,
        committeeId: this.item.committeeId,
        name: this.item.name,
        password: this.item.password,
        sort: this.item.sort,
        registrationType: this.item.registrationType
      }
    }
    let id = ''
    if(this.item.id || this.item.id===0) {
      id = this.item.id
    }
    this.searchTree({type: 0, id})
    this.form = {...this.form, ...params}
  },
  methods: {
    ...mapActions('committeeAcccount', [
      'getListData1'
    ]),
    ...mapActions('commonData', [
      'searchTree',
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
      await setSubmit(this.handerParams())
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
    handerParams () {
      let params = {...this.form}
      return params
    },
    setData (val) {
      this.form.precinct = val
    },
    clear (val) {
      this.form.precinct = val
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
