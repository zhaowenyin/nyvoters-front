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
                :disabled="isDisabled"
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
               :disabled="isDisabled"
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
                :disabled="isDisabled"
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
                :disabled="isDisabled"
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
                :disabled="isDisabled"
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
import {setSubmit, modifySubmit,getTree,getTreeList} from './service.js'
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
        type: '',
        typeName: '',
        parentId: ''
      },
      multipleSelection: [],
      rules: {
        name: [
          { required: true, message: '选区名称', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '选区编码', trigger: 'change' }
        ],

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
  computed: {
    ...mapState('commonData', {
      belongAreaId: state => state.belongAreaId,
      belongAreaItem: state => state.belongAreaItem
    })
  },
  created () {
    let params = {}
    this.form.parentId = this.belongAreaId
    if(this.item&&this.item.id) {
      params = {
        pnum: this.item.pnum,
        name: this.item.name,
        code: this.item.code,
        districtId: this.item.districtId,
        sort: this.item.sort,
        type: this.item.type,
        parentId: this.item.parentId,
        typeName:(+this.item.type)=== 0 ? '区县选区' : '乡镇选区'
      }
    }
    if((+this.val) !== -1) {
      params.typeName = (+this.val)=== 0 ? '区县选区' : '乡镇选区'
      params.type = this.val
      this.form.parentId = this.belongAreaId
    }
    this.form = {...this.form, ...params }
    if (this.val=== 0) {
      this.searchList({id: this.belongAreaId})
    } else {
      this.searchTree({id: this.belongAreaId})

    }


  },
  methods: {
    ...mapActions('distictHome', [
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
      if(this.item.id) {
        await modifySubmit({...this.handerParams(),id: this.item.id})
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
      params.parentType = 1
      delete params.typeName

      return params
    },
    async searchTree (val) {
      const {data} = await getTree(val)
      this.data = data.content
    },
    async searchList (val) {
      const {data} = await getTreeList(val)
      this.data = data.content
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
