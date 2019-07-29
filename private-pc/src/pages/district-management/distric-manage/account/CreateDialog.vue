<template>
  <div>
    <el-dialog
      :title="(item.id || item.id===0) ? '修改' : '新建'"
      :visible="visible"
      width="60%"
      :close-on-click-modal="false"
      :before-close="comfirmClose">
      <el-form
        label-width="110px"
        :model="form"
        :rules="rules"
        ref="form"
        class="login-form">
         <el-form-item
            v-if="val === 5 || +itemL.accountRole===5"
            label="帐号类型"
            prop="accountType">
            <el-radio-group :disabled="isDisabled" size="medium" v-model="form.accountType">
              <el-radio
                v-for="(i, key) in registrationTypeList"
                :key="key"
                :label="+key">{{i}}</el-radio>
            </el-radio-group>
          </el-form-item>
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
            :disabled='!!(item.id || item.id===0)&&isDisabled'
            placeholder="请输入登录密码"
            class="item"
            :maxlength="20"
            v-model="form.password" />
        </el-form-item>
        <el-form-item
          label="管理选区"
          prop="managePrecinctIds">
          <DistrictSelect
          :disabled="isDisabled"
          :multiple="true"
          v-model="form.managePrecinctIds"
          :item='item'
          :data="data"
          />
        </el-form-item>
        <el-form-item
          label="排序码"
          prop="sort">
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
import {setSubmit,modifySubmit,getTree,searchUser} from './service.js'
import { mapActions,mapState } from 'vuex'
import {registrationTypeList} from '../../../../common-data/config.js'
import DistrictSelect from '../../../../components/DistrictSelect'
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
        account: '',
        name: '',
        password: '',
        sort: '',
        accountType: '',
        precinctId: '',
        managePrecinctIds: [],
        accountRole: ''
      },
      multipleSelection: [],
      data: [],
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
        accountType: [
          { required: this.val===2 , message: '请选择帐号类型！' ,trigger: 'change' }
        ],
        managePrecinctIds: [
          { required: true, message: '请选择管理选区！', trigger: 'change' }
        ],
      },
      registrationTypeList,
      itemL: {}
    }
  },
  computed: {
    ...mapState('commonData', {
      belongAreaId: state => state.belongAreaId,
      belongAreaItem: state => state.belongAreaItem,
    }),
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
    val: {
      default: null,
      type: Number
    },
    isDisabled: {
      default: false,
      type: Boolean
    }
  },
  components: {
    DistrictSelect
  },
  created () {
    let params = {}
    if(this.item.id) {
      this.searchUser({id: this.item.id})
    } else {
      this.form.accountRole=this.val
      this.form.precinctId = this.belongAreaId
    }
    if(this.belongAreaItem.children) {
      this.searchTree({type: 2, id: this.belongAreaId})
    } else {
      this.data=[this.belongAreaItem]
    }
    this.form = {...this.form, ...params}
  },
  methods: {
    ...mapActions('districtAccount', [
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
      try {
        this.loading = true
        if(this.item.id || this.item.id===0) {
          await modifySubmit(this.handerParams())
        } else {
          await setSubmit(this.handerParams())
        }
        this.close()
        this.getListData1()
      } catch (e) {
        console.log(e)
      }finally{
        this.loading = false
      }


    },
    async searchUser (val) {
      const {data} = await searchUser(val)
      this.itemL = data.content
      let params = {
        account: this.itemL.account,
        precinctId: this.itemL.precinctId,
        name: this.itemL.name,
        password: '......',
        sort: this.itemL.sort,
        accountType: this.itemL.accountType,
        accountRole: this.itemL.accountRole,
        managePrecinctIds: this.itemL.managePrecinctIds
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
        params.id = this.item.id
      } else {
        params.password=md5(this.item.password)
      }
      params.precinctId = this.belongAreaId
      return params
    },
    async searchTree (val) {
      const{data} = await getTree(val)
      this.data = [data.content]
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
