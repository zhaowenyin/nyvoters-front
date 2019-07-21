<template>
  <div class="search-box">
    <div class="left">
      <el-button size="medium" @click="create" type="primary" icon="el-icon-circle-plus-outline">划入</el-button>
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
          style="width: 120px;"
          placeholder="请选择">
          <el-option label="姓名" :value="1"></el-option>
          <el-option label="身份证号码" :value="2"></el-option>
          <el-option label="手机号" :value="3"></el-option>
          <el-option label="参选地类型" :value="4"></el-option>
           <el-option label="类型" :value="5"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        v-if="type === 1"
        prop="name">
        <el-input
          class="item"
          size="medium"
          placeholder="请输入关键字"
          v-model.trim="searchForm.name" />
      </el-form-item>
      <el-form-item
        v-if="type === 2"
        prop="card">
        <el-input
          class="item"
          size="medium"
          placeholder="请输入关键字"
          v-model.trim="searchForm.idNum" />
      </el-form-item>
      <el-form-item
        v-if="type === 3"
        prop="tel">
        <el-input
          class="item"
          size="medium"
          placeholder="请输入关键字"
          v-model.trim="searchForm.phoneNum" />
      </el-form-item>
      <el-form-item
        v-if="type === 4"
        prop="date">
        <el-select  size="medium" v-model.trim="searchForm.candidateType">
          <el-option
            v-for="(item, key) in candidateTypeList"
            :key="key"
            :label="item"
            :value="key">
          </el-option>
        </el-select>
      </el-form-item>
        <el-form-item
        v-if="type === 5"
        prop="date">
        <el-select  size="medium" v-model.trim="searchForm.type">
          <el-option
            v-for="(item, key) in typeList"
            :key="key"
            :label="item"
            :value="key">
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
      :visible.sync='createDialogVisible'
      :ids="ids"
      />
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import CreateDialog from './CreateDialog'
import { deletetTabel} from './service.js'
import {typeList, candidateTypeList} from '../../../common-data/config.js'

export default {
  data () {
    return {
      type: 1,
      searchForm: {
        name: '',
        idNum: '',
        phoneNum: '',
        candidateType: '',
        type: ''
      },
      createDialogVisible: false,
      typeList,
      candidateTypeList,
      id: ''
    }
  },
  computed: {
    ...mapState('votersInput', {
      multipleSelection: state=>state.multipleSelection
    })
  },
  components: {
    CreateDialog
  },
  watch: {
    type () {
      let value={
        name: '',
        idNum: '',
        phoneNum: '',
        candidateType: '',
        type: ''
      }
      this.searchForm = {...value}
    }
  },
  created () {
  },
  methods: {
    ...mapActions('votersInput', [
      'getListData',
    ]),
    // 搜索
    submitForm () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          const params = JSON.parse(JSON.stringify(this.searchForm))
          params.pageNum = 1
          this.getListData({...params})
        }
      })
    },
    create () {
      if(this.multipleSelection.length === 0) {
        this.$notify({
          title: '',
          message: '请勾选数据后再操作！',
          type: 'warning'
        });
        return
      }
      const ids = []
      for (let i of this.multipleSelection) {
        ids.push(i.id)
      }
      this.ids = ids
      this.createDialogVisible = true
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
      this.$confirm('删除后将不可恢复，请确认是否删除？')
        .then(() => {
          this.delectItem()
        })
        .catch(() => {})

    },
    async delectItem() {
      let ids = []
      for (let i of this.multipleSelection) {
        ids.push(i.id)
      }
      await deletetTabel({ids})
      const param = JSON.parse(JSON.stringify(this.searchForm))
      param.pageNum = 1
      this.getListData(param)
    }
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
