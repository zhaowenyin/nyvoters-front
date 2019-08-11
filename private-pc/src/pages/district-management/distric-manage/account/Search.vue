<template>
  <div class="search-box">
    <div class="left">
    <el-dropdown style="margin-right: 10px;" @command="create">
        <el-button size="medium" type="primary" icon="el-icon-circle-plus-outline">新建</el-button>
      <el-dropdown-menu slot="dropdown">
        <!-- <el-dropdown-item command="3">选委会</el-dropdown-item> -->
        <el-dropdown-item command="4">选区管理员</el-dropdown-item>
        <el-dropdown-item command="5">工作人员</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
      <el-button size="medium"  @click="modify" type="primary" icon="el-icon-edit">修改</el-button>
      <el-button size="medium"  @click="reset" type="primary" icon="el-icon-setting">重置密码</el-button>
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
          style="width: 100px;"
          placeholder="请输入">
          <el-option label="姓名" :value="1"></el-option>
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
      :val="val"
      :visible.sync='createDialogVisible'
      />
      <Reset
      v-if="resetDialogVisible"
      :item='item'
      :visible.sync='resetDialogVisible'
      />
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import CreateDialog from './CreateDialog'
import Reset from './Reset'
import { deletetTabel} from './service.js'

export default {
  data () {
    return {
      type: 1,
      searchForm: {
        name: ''
      },
      createDialogVisible: false,
      resetDialogVisible: false,
      item: {}
    }
  },
  computed: {
    ...mapState('districtAccount', {
      multipleSelection: state=>state.multipleSelection
    })
  },
  components: {
    CreateDialog,
    Reset
  },
  created () {
  },
  methods: {
    ...mapActions('districtAccount', [
      'getListData1',
    ]),
    // 搜索
    submitForm () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          const params = JSON.parse(JSON.stringify(this.searchForm))
          params.pageNum = 1
          this.getListData1(params)
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
      this.item = this.multipleSelection[0]
      this.$emit('lookDetail',{val: this.item, isDisabled: false})
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
      if(this.multipleSelection.length !== 1) {
        this.$notify({
          title: '',
          message: '请选择一条数据删除！',
          type: 'warning'
        });
        return
      }
      this.$confirm('账号删除后将不可恢复，请确认是否删除？')
        .then(() => {
          this.deleteitem()
        })
        .catch(() => {})

    },
    async deleteitem () {
      await deletetTabel(this.multipleSelection[0].id)
      this.getListData1()
    },
    reset () {
      if(this.multipleSelection.length !== 1) {
        this.$notify({
          title: '',
          message: '请选择一条数据重置密码！',
          type: 'warning'
        });
        return
      }
      this.item = this.multipleSelection[0]
      this.resetDialogVisible = true
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
