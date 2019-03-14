<template>
  <div class="search-box">
    <div class="left">
      <el-button @click="upload" size="medium" type="primary" icon="el-icon-upload2">上传</el-button>
      <el-button @click="modify" size="medium" type="primary" icon="el-icon-edit">修改</el-button>
      <el-button @click="deleteI" size="medium" type="primary" icon="el-icon-delete">删除</el-button>
    </div>
    <el-form
      ref="form"
      :model="searchForm"
      :inline="true"
      class="from">
      <el-form-item
        label="文件名称"
        prop="">
        <el-input
          class="item"
          size="medium"
          placeholder="请输入关键字"
          v-model.trim="searchForm.fileName" />
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
import {deletetTabel} from './service.js'
import CreateDialog from './CreateDialog'


export default {
  data () {
    return {
      type: 1,
      searchForm: {
        fileName: ''
      },
      createDialogVisible: false,
      item: {}
    }
  },
  computed: {
    ...mapState('fileManage', {
      multipleSelection: state=>state.multipleSelection
    })
  },
  components: {
    CreateDialog

  },
  created () {
  },
  methods: {
    ...mapActions('fileManage', [
      'getListData',
    ]),
    // 搜索
    submitForm () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          const params = JSON.parse(JSON.stringify(this.searchForm))
          params.page = 1
          this.getListData(params)
        }
      })
    },
    upload () {
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
      this.createDialogVisible = true
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
      let idList = []
      for (let i of this.multipleSelection) {
        idList.push(i.id)
      }
      let params = {idList,status: "REVIEW_FAIL"}
      await deletetTabel(params)
      const param = JSON.parse(JSON.stringify(this.searchForm))
      param.page = 1
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
