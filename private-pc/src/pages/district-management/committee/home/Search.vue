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
          <el-option label="选委会" :value="1"></el-option>
          <el-option label="选委会编码" :value="2"></el-option>
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
          v-model.trim="searchForm.code" />
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
import { deletetTabel} from './service.js'

export default {
  data () {
    return {
      type: 1,
      searchForm: {
        name: '',
        code: ''
      },
      createDialogVisible: false,
      item: {}
    }
  },
  computed: {
    ...mapState('committeeHome', {
      multipleSelection: state=>state.multipleSelection
    }),
    ...mapState('commonCommittee', {
      belongAreaId: state => state.belongAreaId
    })
  },
  components: {
    CreateDialog
  },
  watch: {
    type () {
      let value={
        name: '',
        code: ''
      }
      this.searchForm = {...value}
    }
  },
  created () {
  },
  methods: {
    ...mapActions('committeeHome', [
      'getListData',
    ]),
    ...mapActions('commonCommittee', [
      'searchTree',
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
      this.$emit('lookDetail',{val:this.multipleSelection[0],isDisabled: false})
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
      if(this.multipleSelection.length !== 1) {
        this.$notify({
          title: '',
          message: '请勾选一条数据进行修改！',
          type: 'warning'
        });
        return
      }
      this.$confirm('删除选举机构后，将影响该机构下的所有选民、账号信息不可用，且不可恢复，请确认？')
        .then(() => {
          this.delectItem()
        })
        .catch(() => {})

    },
    async delectItem() {
      await deletetTabel({id: this.multipleSelection[0].id})
      this.searchTree({type: 0, id: ''})
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
