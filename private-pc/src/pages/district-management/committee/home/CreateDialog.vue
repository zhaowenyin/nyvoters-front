<template>
  <div>
    <el-dialog
      :title="item.id ? (isDisabled ? '查看' : '修改') : '新建'"
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
          label="上级选委会"
          prop="parentId">
          <DistrictSelect
            :disabled="true"
            :multiple="false"
            :noallow="true"
            v-model="form.parentId"
            :item='item'
            :data="treeList"
          />
        </el-form-item>
        <el-form-item
          label="选委会"
          prop="name">
          <el-input
            :disabled="isDisabled"
            size="medium"
            placeholder="请输入选委会"
            :maxlength="20"
            class="item"
            v-model.trim="form.name" />
        </el-form-item>
        <el-form-item
          label="选委会编码"
          prop="code">
          <el-input
            :disabled="isDisabled"
            size="medium"
            placeholder="请输入选委会编码"
            :maxlength="20"
            class="item"
            v-model.trim="form.code" />
        </el-form-item>
        <el-form-item
          label="对应行政区"
          prop="districtId">
          <DistrictSelect
            :disabled="isDisabled"
            :multiple="false"
            :noallow="true"
            v-model="form.districtId"
            :item='item'
            @change="changeId"
            :data="data"
          />
        </el-form-item>
        <el-form-item
          label="联系人"
          prop="manager">
          <el-input
            :maxlength="20"
            :disabled="isDisabled"
            size="medium"
            :placeholder="isDisabled?'':'请输入联系人'"
            class="item"
            v-model.trim="form.manager" />
        </el-form-item>
        <el-form-item
          label="手机号码"
          prop="phoneName">
          <el-input
            :disabled="isDisabled"
            size="medium"
            :maxlength="11"
            placeholder="请输入手机号码"
            class="item"
            v-model.trim="form.phoneName" />
        </el-form-item>
        <el-form-item
          label="排序码"
          prop="sort">
          <el-input-number
            :disabled="isDisabled"
            size="medium"
            placeholder="请输入排序码"
            :max="9999"
            class="item"
            v-model.trim="form.sort" />
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
import {setSubmit,modifySubmit,getTree,getNextSort} from './service.js'
import { mapActions,mapState } from 'vuex'
import DistrictSelect from '../../../../components/DistrictSelect'
import {phone_reg} from '../../../../utils/validate'
export default {
  data () {
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
    let validate1 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请选择行政区！'))
      } else {
        callback()
      }
    }
    return {
      loading: false,
      form: {
        parentId: '',
        name: '',
        code: '',
        districtId: '',
        manager: '',
        phoneName: '',
        sort: '',
      },
      multipleSelection: [],
      rules: {
        name: [
          { required: true, message: '请输入选委会！', trigger: 'blur' }
        ],
        districtId: [
          { required: true, validator: validate1 }
        ],
        code: [
          { required: true, message: '请输入选委会编码！', trigger: 'blur' }
        ],
        phoneName: [
          { required: true,  validator: validate,  trigger: 'blur' }
        ]

      },
      createDialogVisible: false,
      data: []
    }

  },
  computed: {
    ...mapState('commonCommittee', {
      committeeId: state => state.belongAreaId,
      belongArea: state => state.belongArea,
      belongItem: state => state.belongItem,
      treeList: state => state.treeList,
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
    },
    isDisabled: {
      default: false,
      type: Boolean
    },

  },
  components: {
    DistrictSelect
  },
  created () {
    this.form.parentId = this.committeeId
    let params = {}
    if (this.item.id) {
      params =  {
        parentId: this.item.parentId,
        name: this.item.name,
        code: this.item.code,
        districtId: this.item.districtId,
        manager: this.item.manager,
        phoneName: this.item.phoneName,
        sort: this.item.sort,
      }
      this.form = {...this.form, ...params }
      this.searchTree1({id: this.item.parentId})
    } else {
      this.searchTree1({id: this.committeeId})
      this.getNextSort1(this.committeeId)
    }
  },

  methods: {
    ...mapActions('committeeHome', [
      'getListData'
    ]),
    ...mapActions('commonCommittee', [
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
        this.getListData()
        this.searchTree({type: 0, id: ''})

        this.close()
      } catch (error) {
        console.log(error)
      }finally{
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
      delete params.precinct
      return params
    },
    select () {
      this.createDialogVisible = true
    },
    async searchTree1 (val) {
      const {data} = await getTree(val)
      this.data = data.content
    },
    changeId() {
      if(this.form.districtId) {
        this.$refs.form.clearValidate('districtId')
      }
    },
    async getNextSort1(val){
      const{data} = await getNextSort(val)
      console.log(data)
      this.form.sort = data.content
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
