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
              :label="item.name"
              :value="item.id">
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
           <DistrictSelect
              :labels="form.precinct"
              :multiple="false"
              @setData="setData"
              @clear="clear"
              v-model="form.precinctId"
              :item='item'
              :data="data"
            />
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
  </div>
</template>
<script>
import {setSubmit,modifySubmit,getTree,parentList} from './service.js'
import { mapActions } from 'vuex'
import DistrictSelect from '../../../../components/DistrictSelect'
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
          { required: true, message: '请选择对应行政区！', trigger: 'change' }
        ],

      },
      createDialogVisible: false,
      data: [],
      parentList: []
    }

  },
  computed: {

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
    const params = {
      precinct: this.item.precinct,
      parentId: this.item.parentId,
      name: this.item.name,
      code: this.item.code,
      precinctId: this.item.precinct,
      manager: this.item.manager,
      phoneName: this.item.phoneName,
      sort: this.item.sort,
    }
    this.form = {...this.form, ...params }
    this.searchTree({id: '',type: 0})
    if(this.item.parentId || this.item.parentId===0) {
      this.getParentList({parentId:this.item.parentId})
    }

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
    setData (val) {
      this.form.precinct = val
    },
    clear (val) {
      this.form.precinct = val
    },
    async searchTree () {
      const {data} = await getTree()
      this.data = data.content
    },
    async getParentList (val) {
      this.parentList = []
      const {data} = await parentList(val)
      this.parentList.push(data.content)
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
