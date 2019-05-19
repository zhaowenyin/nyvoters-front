<template>
  <div>
    <el-dialog
      :title="item.id ? '修改' : '新建'"
      :visible="visible"
      width="60%"
      :before-close="comfirmClose">
      <el-form
        label-width="110px"
        :model="form"
        :rules="rules"
        ref="form"
        class="login-form">
        <el-form-item
          label="小组名称"
          prop="name">
          <el-input
            size="medium"
            placeholder="请输入小组名称"
            class="item"
            v-model="form.name" />
        </el-form-item>
         <el-row :gutter="20">
           <el-col :span="12">
            <el-form-item
              label="所属选区"
              prop="precinctId">
                <DistrictSelect
                :multiple="false"
                v-model="form.precinctId"
                :item='item'
                :data="data"
                />
            </el-form-item>
          </el-col>
           <el-col :span="12">
            <el-form-item
              label="类型">
              <el-select class="item" size="medium" v-model.trim="form.type" placeholder="请选择类型">
                <el-option
                  v-for="(item, key) in typeList"
                  :key="key"
                  :label="item"
                  :value="key">
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
                class="item"
                placeholder="请输入组长"
                v-model="form.manager" />
            </el-form-item>
          </el-col>
           <el-col :span="12">
             <el-form-item
              label="组长联系电话"
              :maxlength="11"
              prop="managerPhone">
              <el-input
                size="medium"
                placeholder="请输入代表名额"
                class="item"
                v-model="form.managerPhone" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
             <el-form-item
              label="召集人"
              prop="convener">
              <el-input
                size="medium"
                placeholder="请输入召集人"
                class="item"
                v-model="form.convener" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
             <el-form-item
              label="召集人联系电话"
              prop="convenerPhone">
              <el-input
                :maxlength="11"
                size="medium"
                placeholder="召集人联系电话"
                class="item"
                v-model="form.convenerPhone" />
            </el-form-item>
          </el-col>
           <el-col :span="12">
            <el-form-item
              label="排序码"
              prop="sort	">
              <el-input
                size="medium"
                placeholder="请输入排序码"
                class="item"
                v-model="form.sort" />
            </el-form-item>
          </el-col>
        </el-row>
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
import {setSubmit, modifySubmit} from './service.js'
import DistrictSelect from '../../../components/DistrictSelect'
import { mapActions,mapState } from 'vuex'
export default {
  data () {
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
        distinct: ''
      },
      multipleSelection: [],
      rules: {
        // name: [
        //   { required: true, message: '请输入选委会！', trigger: 'blur' }
        // ],

      },
      typeList: {
        0: '区县小组',
        1: '乡镇小组'
      },
      createDialogVisible: false,
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
    val: {
      default: null,
      type: Number
    }
  },
  components: {
    DistrictSelect
  },
  computed: {
    ...mapState('commonData', {
      data: state => state.treeList
    })
  },
  created () {
    this.form = {...this.form, ...this.item }
    let id = ''
    if(this.item.id || this.item.id===0) {
      id = this.item.id
    }
    this.searchTree({type: 0, id})
  },
  methods: {
    ...mapActions('commonData', [
      'searchTree',
    ]),
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
      this.close()
      this.getListData()
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
      delete params.distinct
      delete params.typeName
      return params
    },
    select () {
      this.createDialogVisible = true
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
