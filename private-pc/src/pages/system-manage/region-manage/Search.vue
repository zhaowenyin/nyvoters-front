<template>
  <div class="search-box">
    <div class="left">
      <el-button size="medium" @click="create" type="primary" icon="el-icon-circle-plus-outline">新建</el-button>
      <el-button size="medium"  @click="modify" type="primary" icon="el-icon-edit">修改</el-button>
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
          <el-option label="行政区名" :value="1"></el-option>
          <el-option label="行政区代码" :value="2"></el-option>
          <el-option label="级别" :value="3"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        v-if="type === 1"
        prop="name">
        <el-input
          class="item"
          size="medium"
          placeholder="请输入行政区名"
          v-model.trim="searchForm.name" />
      </el-form-item>
      <el-form-item
        v-if="type === 2"
        prop="code">
        <el-input
          class="item"
          size="medium"
          placeholder="请输入行政区代码"
          v-model.trim="searchForm.code" />
      </el-form-item>
      <el-form-item
        v-if="type === 3"
        prop="level">
         <el-select  size="medium" v-model.trim="searchForm.level" placeholder="请选择推荐方式">
        <el-option
          v-for="(item, key) in levelList"
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
      :item='item'
      :visible.sync='createDialogVisible'
      />
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import CreateDialog from './CreateDialog'
import {deletetTabel} from './service.js'
import {levelList} from '../../../common-data/config.js'

export default {
  data () {
    return {
      type: 1,
      searchForm: {
        name: '',
        code: '',
        level: ''
      },
      createDialogVisible: false,
      levelList
    }
  },
  computed: {
    ...mapState('regionManage', {
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
        code: '',
        level: ''
      }
      this.searchForm = {...value}
    }
  },
  created () {
  },
  methods: {
    ...mapActions('regionManage', [
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
          message: '请勾选数据进提交！',
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
    async deleteI () {
      if(this.multipleSelection.length === 0) {
        this.$notify({
          title: '',
          message: '请勾选数据进删除！',
          type: 'warning'
        });
        return
      }
      if(this.multipleSelection.length !== 1) {
        this.$notify({
          title: '',
          message: '请勾选一条数据进行删除！',
          type: 'warning'
        });
        return
      }
      let idList = []
      for (let i of this.multipleSelection) {
        idList.push(i.id)
      }
      let params = {id: idList[0]}
      await deletetTabel(params)
      this.$emit('searchDistrictTree',{type: 0, id: ''})
      this.getListData()
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
