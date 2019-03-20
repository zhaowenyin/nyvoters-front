<template>
  <div>
    <el-dialog
      :title="item.id ? '修改' : '新建'"
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
          label="上级选委会"
          prop="parentId">
          <el-select
            size="medium"
            style="width: 100%;"
            class="item"
            v-model="form.parentId"
            clearable placeholder="请选择">
            <el-option
              v-for="(item, key) in parentList"
              :key="key"
              :label="item"
              :value="+key">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="选委会"
          prop="name">
          <el-input
            size="medium"
            placeholder="请输入选委会"
            class="item"
            v-model="form.name" />
        </el-form-item>
        <el-form-item
          label="选委会代码"
          prop="code">
          <el-input
            size="medium"
            placeholder="请输入选委会代码"
            class="item"
            v-model="form.code" />
        </el-form-item>
        <el-form-item
          label="对应行政区"
          prop="precinctId">
          <div :class="['select-input',{hasVal: form.precinct}]" @click="select">{{form.precinct ? form.precinct : '请选择对应行政区'}}</div>
        </el-form-item>
        <el-form-item
          label="联系人"
          prop="manager">
          <el-input
            size="medium"
            placeholder="请输入联系人"
            class="item"
            v-model="form.manager" />
        </el-form-item>
        <el-form-item
          label="手机号码"
          prop="phoneName">
          <el-input
            size="medium"
            placeholder="请输入手机号码"
            class="item"
            v-model="form.phoneName" />
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
     <PrecinctList
      @saveData="saveData"
      :item="item"
      v-if="createDialogVisible"
      :visible.sync='createDialogVisible'
      />
  </div>
</template>
<script>
import {setSubmit,modifySubmit} from './service.js'
import { mapActions } from 'vuex'
import PrecinctList from './PrecinctList'
export default {
  data () {
    return {
      loading: false,
      form: {
        parentId: '',
        name: '',
        code: '',
        precinctId: '',
        manager: '',
        phoneName: '',
        sort: '',
        precinct: ''
      },
      multipleSelection: [],
      rules: {
        name: [
          { required: true, message: '请输入选委会！', trigger: 'blur' }
        ],
        precinctId: [
          { required: true, message: '请选择对应行政区！', trigger: 'blur' }
        ],

      },
      parentList: {
        1: '11'
      },
      precinctList: {
        1: '9090'
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
    }
  },
  components: {
    PrecinctList
  },
  created () {
    const params = {
      precinct: this.item.precinct,
      parentId: this.item.parentId,
      name: this.item.name,
      code: this.item.code,
      precinctId: this.item.precinct,
      manager: this.form.manager,
      phoneName: this.item.phoneName,
      sort: this.item.sort,
    }
    this.form = {...this.form, ...params }
  },
  methods: {
    ...mapActions('committeeHome', [
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
      delete params.precinct
      return params
    },
    select () {
      this.createDialogVisible = true
    },
    saveData (val) {
      this.form.precinct = val.name
      this.form.precinctId = val.id
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
