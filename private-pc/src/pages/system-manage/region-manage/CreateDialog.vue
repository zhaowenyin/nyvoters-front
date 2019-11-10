<template>
  <el-dialog
    title="行政区"
    :visible="visible"
    width="600"
    :close-on-click-modal="false"
    :before-close="comfirmClose">
    <el-form
      label-width="110px"
      :model="form"
      :rules="rules"
      ref="form"
      class="login-form">
       <el-form-item
        label="上级行政区"
        prop="parentId">
        <!-- <Tree
        :options="treeList"
        v-model="form.parentId"
        /> -->
        <DistrictSelect
          :disabled="true"
          :multiple="false"
          v-model="form.parentId"
          :item='item'
          :data="data"
        />
      </el-form-item>
      <el-form-item
        label="行政区名"
        prop="name">
        <el-input
          size="medium"
          :disabled="isDisabled"
          :maxlength="20"
          placeholder="请输入行政区名"
          class="item"
          v-model.trim="form.name" />
      </el-form-item>
       <el-form-item
        label="行政区代码"
        prop="code">
        <el-input
          size="medium"
          type="number"
          :disabled="isDisabled"
          placeholder="请输入行政区代码"
          class="item"
          v-model.trim="form.code" />
      </el-form-item>
      <el-form-item
        label="行政区级别"
        prop="level">
        <el-select
          :disabled="true"
          size="medium"
          style="width: 100%;"
          class="item"
          v-model="form.level"
          clearable placeholder="请选择行政区级别">
          <el-option
            v-for="(item,key) in levelList"
            :key="key"
            :label="item"
            :value="+key">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        label="人口数"
        prop="pnum">
        <el-input
         :disabled="isDisabled"
          type="number"
          size="medium"
          placeholder="请输入人口数"
          class="item"
          v-model.trim="form.pnum" />
      </el-form-item>
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
</template>
<script>
import {setSubmit,modifySubmit,getTree,getNextSort} from './service.js'
import {levelList} from '../../../common-data/config.js'
import { mapActions,mapState } from 'vuex'
// import Tree from './common-tree'
import DistrictSelect from '../../../components/DistrictSelect'
export default {
  data () {
    return {
      loading: false,
      form: {
        code: '',
        level: '',
        name: '',
        parentId: '',
        pnum: '',
        sort: ''
      },
      multipleSelection: [],
      rules: {
        code: [
          { required: true, message: '请输入行政区代码！', trigger: 'blur' }
        ],
        level:  [
          { required: true, message: '请选择level！', trigger: 'change' }
        ],
        name:  [
          { required: true, message: '请输入行政区名称！', trigger: 'blur' }
        ],
        parentId:  [
          { required: true, message: '请选择级行政区！', trigger: 'change' }
        ],
        pnum:  [
          { required: true, message: '请输入人口数！', trigger: 'blur' }
        ],
        sort:  [
          { required: true, message: '请输入排序码！', trigger: 'blur' }
        ],
      },
      treeList: [],
      levelList,
      data: []

    }

  },
  computed: {
    ...mapState('regionManage', {
      belongAreaId: state => state.belongAreaId,
      level: state => state.level
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
    }
  },
  components: {
    // Tree
    DistrictSelect
  },
  created () {
    if(this.item.id) {
      this.form = {...this.form, ...this.item}
    } else {
      this.form.parentId = this.belongAreaId
      this.form.level = this.level?this.level+1:1
      this.getNextSort1(this.belongAreaId)
    }
    this.searchDistrictTree1({type: 1, id: this.item.id?this.item.id:this.belongAreaId})
  },
  methods: {
    ...mapActions('regionManage', [
      'getListData',
      'searchDistrictTree'
    ]),
    close () {
      this.$emit('update:visible', false)
    },
    submitForm () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          if(this.item.parentId) {
            this.modifyData()
          } else {
            this.sumitData()
          }
        }
      })
    },
    async sumitData () {
      try {
        this.loading = true
        const params = {
          ...this.form
        }
        params.sort = +params.sort
        params.pnum = +params.pnum
        await setSubmit(params)

        this.getListData()
        this.searchDistrictTree({type: 0, id: ''})
        this.close()
      } finally{
        this.loading = false
      }

    },
    async modifyData () {
      try {
        this.loading = true
        const params = {
          ...this.form

        }
        params.sort = +params.sort
        params.pnum = +params.pnum
        params.level = +params.level
        await modifySubmit(params)
        this.getListData()
        this.searchDistrictTree({type: 0, id: ''})
        this.close()
      } finally{
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
    async searchDistrictTree1(val) {
      const{data} = await getTree(val)
      this.data = [data.content]
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

</style>
<style>
  .table-obj .el-form-item {
    margin: 15px 0;
  }
</style>
