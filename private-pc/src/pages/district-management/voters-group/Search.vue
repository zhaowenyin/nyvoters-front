<template>
  <div class="search-box">
    <div class="left">
      <el-button size="medium" @click="create" type="primary" icon="el-icon-circle-plus-outline">新建</el-button>
      <el-button size="medium" @click="modify" type="primary" icon="el-icon-edit">修改</el-button>
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
          <el-option label="小组名称" :value="1"></el-option>
          <el-option label="组长" :value="2"></el-option>
          <el-option label="类型" :value="3"></el-option>
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
        prop="code">
        <el-input
          class="item"
          size="medium"
          placeholder="请输入关键字"
          v-model.trim="searchForm.manager" />
      </el-form-item>
      <el-form-item
        v-if="type === 3"
        prop="type">
        <el-select  size="medium" v-model.trim="searchForm.type">
          <el-option
            v-for="(item, key) in typeList"
            :key="key"
            :label="item"
            :value="+key">
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <CreateDialog
      v-if="createDialogVisible"
      :item='item'
      :visible.sync='createDialogVisible'
      :val="val"
      />
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import CreateDialog from './CreateDialog'
import { deletetTabel} from './service.js'

export default {
  data () {
    return {
      type: 1,
      searchForm: {
        name: '',
        manager: '',
        type: ''
      },
      createDialogVisible: false,
      typeList: {
        0: '区县小组',
        1: '乡镇小组'
      }
    }
  },
  computed: {
    ...mapState('voterGroup', {
      multipleSelection: state=>state.multipleSelection
    })
  },
  components: {
    CreateDialog
  },
  created () {
  },
  methods: {
    ...mapActions('voterGroup', [
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
    create (val) {
      this.val = +val
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
      this.val = -1
      this.item = this.multipleSelection[0]
      this.createDialogVisible = true
    },
    deleteI () {
      if(this.multipleSelection.length === 0) {
        this.$notify({
          title: '',
          message: '请勾选数据进删除！',
          type: 'warning'
        });
        return
      }
      this.$confirm('选区删除后将不可恢复，请确认是否删除？')
        .then(() => {
          this.delectItem()
        })
        .catch(() => {})

    },
    async delectItem() {
      let idList = []
      for (let i of this.multipleSelection) {
        idList.push(i.id)
      }
      let params = {idList}
      await deletetTabel(params)
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
