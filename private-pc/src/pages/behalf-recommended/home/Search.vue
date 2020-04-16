<template>
  <div class="search-box">
    <div class="left">
      <el-button size="medium" @click="create" type="primary" icon="el-icon-circle-plus-outline">登记</el-button>
      <el-button size="medium"  @click="modify" type="primary" icon="el-icon-edit">修改</el-button>
      <el-button size="medium" @click="submit" type="primary" icon="el-icon-circle-check-outline">提交</el-button>
      <el-button size="medium" @click="deleteI" type="primary" icon="el-icon-delete">删除</el-button>
    </div>
    <el-form
      ref="form"
      :model="searchForm"
      :inline="true"
      class="from">
      <el-form-item
        prop="state">
        <el-select
          v-model="type"
          size="medium"
          style="width: 108px;"
          placeholder="请选择">
          <el-option label="被推荐人" :value="1"></el-option>
          <el-option label="推荐方式" :value="2"></el-option>
          <el-option label="推荐类型" :value="3"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        v-if="type === 1"
        prop="recommendedPerson">
        <el-input
          class="item"
          size="medium"
          placeholder="请输入关键字"
          v-model.trim="searchForm.recommendedPerson" />
      </el-form-item>
      <el-form-item
        v-if="type === 2"
        prop="recommendType">
         <el-select  size="medium" v-model.trim="searchForm.recommendType" placeholder="请选择推荐方式">
        <el-option
          v-for="item in methodList"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      </el-form-item>
      <el-form-item
        v-if="type === 3"
        prop="type">
        <el-select  size="medium" v-model.trim="searchForm.type" placeholder="请选择推荐类型">
          <el-option
            v-for="item in typeList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button
          @click="submitForm()"
          size="medium"
          icon="el-icon-search"
          type="primary"></el-button>
      </el-form-item>
    </el-form>
    <CreateDialog
      v-if="createDialogVisible"
      :item='item'
      :visible.sync='createDialogVisible'
      />
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import CreateDialog from './CreateDialog'
import {submitTabel, deletetTabel} from './service.js'

export default {
  data () {
    return {
      type: 1,
      searchForm: {
        recommendedPerson: '',
        recommendType: '',
        type: ''
      },
      methodList: [
        {
          value: 1,
          label: '团体推荐'
        },
        {
          value: 2,
          label: '选民联名推荐'
        }
      ],
      typeList: [
        {
          value: 1,
          label: '区县代表'
        },
        {
          value: 2,
          label: '乡镇代表'
        }
      ],
      createDialogVisible: false,
      item: {}
    }
  },
  computed: {
    ...mapState('behalfCommended', {
      multipleSelection: state=>state.multipleSelection
    })
  },
  components: {
    CreateDialog
  },
  watch: {
    type () {
      let value={
        recommendedPerson: '',
        recommendType: '',
        type: '',
      }
      this.searchForm = {...value}
    }
  },
  created () {
  },
  methods: {
    ...mapActions('behalfCommended', [
      'getListData',
    ]),
    // 搜索
    submitForm () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          const params = JSON.parse(JSON.stringify(this.searchForm))
          params.pageNum = 1
          this.getListData(params)
        }
      })
    },
    create () {
      this.item = {}
      this.createDialogVisible = true
    },
    modify () {
      if(this.multipleSelection.length !== 1) {
        this.$notify({
          title: '',
          message: '请勾选一条数据进行修改！',
          type: 'warning'
        });
        return
      }
      this.item = this.multipleSelection[0]
      this.$emit('lookDetail',{val: this.item, isDisabled: false})
    },
    submit() {
      if(this.multipleSelection.length === 0) {
        this.$notify({
          title: '',
          message: '请勾选数据进行提交！',
          type: 'warning'
        });
        return
      }
      this.$confirm('确认将该选民提交到资格审核阶段？')
        .then(() => {
          this.submitData()
        })
        .catch(() => {})
    },
    async submitData() {
      let idList = []
      for (let i of this.multipleSelection) {
        idList.push(i.id)
      }
      let params = {idList,status: "REVIEW_SUCCESS"}
      await submitTabel(params)
      const param = JSON.parse(JSON.stringify(this.searchForm))
      param.page = 1
      this.getListData(param)
      this.$notify({
        title: '',
        message: '提交成功',
        type: 'success'
      })
    },
    deleteI () {
      if(this.multipleSelection.length === 0) {
        this.$notify({
          title: '',
          message: '请选择数据后再删除！',
          type: 'warning'
        });
        return
      }
      if(this.multipleSelection.length > 1) {
        this.$notify({
          title: '',
          message: '请勾选一条数据进行操作！',
          type: 'warning'
        });
        return
      }
      this.$confirm('删除后将不可恢复，请确认是否删除？')
        .then(() => {
          this.deleteitem()
        })
        .catch(() => {})
    },
    async deleteitem () {
      let idList = []
      for (let i of this.multipleSelection) {
        idList.push(i.id)
      }
      let params = {idList,status: "REVIEW_FAIL"}
      await deletetTabel(params)
      const param = JSON.parse(JSON.stringify(this.searchForm))
      param.page = 1
      this.getListData(param)
    },
  }
}
</script>
<style scoped>
  .search-box{
    display: flex;
    margin-bottom: -8px;
    & .left {
      flex: 1;
    }
    & .form {

    }
  }
  .item {
    width: 200px;
  }
</style>
