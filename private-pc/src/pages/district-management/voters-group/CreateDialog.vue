<template>
  <div>
    <el-dialog
      :title="item.id ? (isDisabled ? '查看' : '修改') : '新建'"
      :visible="visible"
      width="60%"
      :close-on-click-modal="false"
      :before-close="comfirmClose">
      <el-form
        label-width="130px"
        :model="form"
        :rules="rules"
        ref="form"
        class="login-form">
        <el-form-item
          label="小组名称"
          prop="name">
          <el-input
            :disabled="isDisabled"
            size="medium"
            placeholder="请输入小组名称"
            :maxlength="20"
            class="item"
            v-model.trim="form.name" />
        </el-form-item>
         <el-row :gutter="20">
           <el-col :span="12">
            <el-form-item
              label="所属选区"
              prop="precinctId">
                <DistrictSelect
                :multiple="false"
                :disabled="true"
                v-model="form.precinctId"
                :data="data"
                />
            </el-form-item>
          </el-col>
           <el-col :span="12">
            <el-form-item
              label="类型">
              <el-select  :disabled="true" class="item" size="medium" v-model.trim="form.type" placeholder="请选择类型">
                <el-option
                  v-for="(item, key) in typeList"
                  :key="key"
                  :label="item"
                  :value="+key">
                </el-option>
            </el-select>
            </el-form-item>
          </el-col>
           <el-col :span="12">
             <el-form-item
              label="组长"
              prop="manager">
              <el-input
                size="medium"
                :disabled="isDisabled"
                class="item"
                :placeholder="isDisabled?'':'请输入组长'"
                :maxlength="20"
                v-model.trim="form.manager" />
            </el-form-item>
          </el-col>
           <el-col :span="12">
             <el-form-item
              label="组长联系电话"
              :maxlength="11"
              prop="managerPhone">
              <el-input
                :disabled="isDisabled"
                size="medium"
                placeholder="请输入组长联系电话"
                class="item"
                v-model.trim="form.managerPhone" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
             <el-form-item
              label="召集人"
              prop="convener">
              <el-input
                :disabled="isDisabled"
                size="medium"
                :placeholder="isDisabled?'':'请输入召集人'"
                :maxlength="20"
                class="item"
                v-model.trim="form.convener" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
             <el-form-item
              label="召集人联系电话"
              prop="convenerPhone">
              <el-input
                :disabled="isDisabled"
                :maxlength="11"
                size="medium"
                placeholder="召集人联系电话"
                class="item"
                v-model.trim="form.convenerPhone" />
            </el-form-item>
          </el-col>
           <el-col :span="12">
            <el-form-item
              label="排序码"
              prop="sort">
              <el-input-number
                :disabled="isDisabled"
                type="number"
                size="medium"
                placeholder="请输入排序码"
                :max="9999"
                class="item"
                v-model.trim="form.sort" />
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
  </div>
</template>
<script>
import {setSubmit, modifySubmit,getTree,getNextSort} from './service.js'
import DistrictSelect from '../../../components/DistrictSelect'
import { mapActions,mapState } from 'vuex'
export default {
  data () {
    let validate = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入组长联系电话！'))
      } else {
        if (!/^1[34578]\d{9}$/.test(value)) {
          callback(new Error('请输入正确组长联系电话！'))
        }
        callback()
      }
    }
    let validate1 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入召集人联系电话！'))
      } else {
        if (!/^1[34578]\d{9}$/.test(value)) {
          callback(new Error('请输入正确召集人联系电话！'))
        }
        callback()
      }
    }
    return {
      loading: false,
      form: {
        convener: '',
        convenerPhone: '',
        manager: '',
        managerPhone: '',
        sort: '',
        precinctId: '',
        type: '',
        name: '',
      },
      multipleSelection: [],
      rules: {
        name: [
          { required: true, message: '请输入小组名称！', trigger: 'blur' }
        ],
        precinctId: [
          { required: true, message: '请选择所属选区', trigger: 'change' }
        ],
        convenerPhone:[{ required: true,validator: validate1, trigger: 'blur' }],
        managerPhone:[{ required: true, validator: validate,  trigger: 'blur' }]

      },
      typeList: {
        0: '区县小组',
        1: '乡镇小组'
      },
      data: []
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
  components: {
    DistrictSelect
  },
  computed: {
    ...mapState('commonData', {
      belongAreaId: state => state.belongAreaId,
      belongAreaItem:state => state.belongAreaItem
    })
  },
  created () {
    if(this.item.id || this.item.id===0) {
      this.form = {...this.form, ...this.item }
    } else {
      this.getNextSort({id: this.belongAreaId})
      this.form.precinctId = this.belongAreaId
      // 新建时根据选区类型确定小组类型
      if(this.belongAreaItem.level === 1){
        this.form.type = 0
      }else if(this.belongAreaItem.level === 2){
        this.form.type = 1
      }
    }

    this.searchTree({type: 0, id: ''})
  },
  methods: {
    ...mapActions('voterGroup', [
      'getListData'
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
      if(this.item.name) {
        await modifySubmit(this.handerParams())
      }else {
        await setSubmit(this.handerParams())
      }
      this.$notify({
        title: '',
        message: '保存成功！',
        type: 'success'
      })
      this.close()
      this.getListData({ precinctId: this.belongAreaId })
      this.loading = false
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
      return params
    },
    async searchTree (val) {
      const{data} = await getTree(val)
      this.data = [data.content]
    },
    async getNextSort (val) {
      const {data} = await getNextSort(val)
      this.form.sort = data.content
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
.select-input {
  border: solid 1px #DCDFE6;
  background: #fff;
  color: #c0c4cb;
  height: 40px;
  padding-left: 15px;
  display: flex;
  & i:after {
    content: "";
    display: inline-block;
    background: url("../../../assets/img/icon-close.png") center center no-repeat;
    background-size: 100% 100%;
    width: 20px;
    height: 20px;
    margin-right: 4px;
    transform: translateY(4px);
  }
  &.hasVal {
    color: #333;
  }
}
</style>
<style>
  .table-obj .el-form-item {
    margin: 15px 0;
  }
</style>
