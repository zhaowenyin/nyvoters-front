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
         <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item
              label="选区编码"
              prop="code">
              <el-input
                size="medium"
                placeholder="请输入选区编码"
                class="item"
                v-model="form.code" />
            </el-form-item>
          </el-col>
           <el-col :span="12">
              <el-form-item
              label="选区名称"
              prop="name">
              <el-input
                size="medium"
                placeholder="请输入选区名称"
                class="item"
                v-model="form.name" />
            </el-form-item>
          </el-col>
           <el-col :span="12">
             <el-form-item
              label="选区类型"
              prop="">
              <el-input
                :disabled="true"
                size="medium"
                class="item"
                v-model="form.typeName" />
            </el-form-item>
          </el-col>
           <el-col :span="12">
              <el-form-item
              label="对应行政区"
              prop="precinctId">
              <DistrictSelect
                :multiple="false"
                v-model="form.districtId"
                :item='item'
                :data="data"
                />
            </el-form-item>
          </el-col>
           <el-col :span="12">
             <el-form-item
              label="代表名额"
              prop="pnum">
              <el-input
                size="medium"
                placeholder="请输入代表名额"
                class="item"
                v-model="form.pnum" />
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
     <PrecinctList
     @saveData="saveData"
      v-if="createDialogVisible"
      :item="item"
      :visible.sync='createDialogVisible'
      />
  </div>
</template>
<script>
import {setSubmit, modifySubmit} from './service.js'
import { mapActions, mapState } from 'vuex'
import DistrictSelect from '../../../../components/DistrictSelect'
export default {
  data () {
    return {
      loading: false,
      form: {
        name: '',
        code: '',
        districtId: '',
        pnum: '',
        sort: '',
        distinct: '',
        type: '',
        typeName: '',
        parentId: ''
      },
      multipleSelection: [],
      rules: {
        name: [
          { required: true, message: '请输入选委会！', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请选择对应行政区！', trigger: 'change' }
        ],

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
      data: state => state.treeList,
      belongAreaId: state => state.belongAreaId
    })
  },
  created () {
    let params = {}
    if(this.item&&this.item.name) {
      params = {
        pnum: this.item.pnum,
        name: this.item.name,
        code: this.item.code,
        distinctId: this.item.distinctId,
        distinct: this.item.distinct,
        sort: this.item.sort,
        type: this.item.distinctId,
        typeName:(+this.item.distinctId)=== 0 ? '区县选区' : '乡镇选区'
      }
    } else if((+this.val) !== -1) {
      params.typeName = (+this.val)=== 0 ? '区县选区' : '乡镇选区'
      params.type = this.val
    }
    this.form = {...this.form, ...params }
    let id = ''
    if(this.item.id || this.item.id===0) {
      id = this.item.id
    }
    this.searchTree({type: 0, id})

  },
  methods: {
    ...mapActions('committeeHome', [
      'getListData'
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
      params.pnum = +params.pnum
      params.parentId = this.belongAreaId
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

</style>
<style>
  .table-obj .el-form-item {
    margin: 15px 0;
  }
</style>
