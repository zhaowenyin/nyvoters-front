<template>
  <el-dialog
    title="行政区"
    :visible="visible"
    width="600"
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
          placeholder="请输入行政区名"
          class="item"
          v-model="form.name" />
      </el-form-item>
       <el-form-item
        label="行政区代码"
        prop="code">
        <el-input
          size="medium"
          placeholder="请输入行政区代码"
          class="item"
          v-model="form.code" />
      </el-form-item>
      <el-form-item
        label="行政区级别"
        prop="level">
        <el-select
          size="medium"
          style="width: 100%;"
          class="item"
          v-model="form.level"
          clearable placeholder="请选择行政区级别">
          <el-option
            v-for="(item,key) in levelList"
            :key="key"
            :label="item"
            :value="key">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        label="人口数"
        prop="pnum">
        <el-input
          type="number"
          size="medium"
          placeholder="请输入人口数"
          class="item"
          v-model="form.pnum" />
      </el-form-item>
       <el-form-item
        label="排序码"
        prop="sort">
        <el-input
          type="number"
          size="medium"
          placeholder="请输入排序吗"
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
</template>
<script>
import {setSubmit,modifySubmit} from './service.js'
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
      levelList

    }

  },
  computed: {
    ...mapState('regionManage', {
      data: state => state.treeList,
      belongAreaId: state => state.belongAreaId
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
    // Tree
    DistrictSelect
  },
  created () {
    if(this.item.id) {
      this.form = {...this.form, ...this.item}
    } else {
      this.form.parentId = this.belongAreaId
    }

    this.searchDistrictTree({type: 0, id: ''})
  },
  methods: {
    ...mapActions('regionManage', [
      'getListData',
      'searchDistrictTree'
    ]),
    // func (list) {
    //   console.log(this.item.parentId)
    //   let defaultValue = this.item.parentId
    //   const re = (array, parentArr) => {
    //     if (!array || array.length === 0) return false
    //     for (let i = 0; i < array.length; i++) {
    //       const newArr = JSON.parse(JSON.stringify(parentArr))
    //       newArr.push(array[i].id)
    //       if (array[i].id === defaultValue) {
    //         this.form.parentId = newArr
    //         return true
    //       }
    //       const bol = re(array[i].children, newArr)
    //       if (bol) return true
    //     }
    //     return false
    //   }
    //   re(list, [])
    // },
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
      this.loading = true
      const params = {
        ...this.form,
        parentId: this.form.parentId[this.form.parentId.length-1]
      }
      params.sort = +params.sort
      params.pnum = +params.pnum
      await setSubmit(params)

      this.getListData()
      this.close()
      this.loading = false
    },
    async modifyData () {
      this.loading = true
      const params = {
        ...this.form,
        parentId: this.form.parentId[this.form.parentId.length-1]
      }
      params.sort = +params.sort
      params.pnum = +params.pnum
      delete params.path
      await modifySubmit(params)
      this.getListData()
      this.close()
      this.loading = false
    },
    comfirmClose () {
      this.$confirm('关闭将丢失已编辑的内容，确认关闭？')
        .then(() => {
          this.close()
        })
        .catch(() => {})
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
