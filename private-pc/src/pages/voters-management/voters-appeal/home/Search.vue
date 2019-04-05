<template>
  <div class="search-box">
    <div class="left">
      <el-button size="medium" @click="handel" type="primary">处理</el-button>
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
          <el-option label="申诉人" :value="1"></el-option>
          <el-option label="申诉时间" :value="2"></el-option>
          <el-option label="审核人" :value="3"></el-option>
          <el-option label="审核时间" :value="4"></el-option>
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
        prop="">
         <el-date-picker
          v-model="searchForm.applyTime"
          size="medium"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期" />
      </el-form-item>
        <el-form-item
        v-if="type === 3"
        prop="">
        <el-input
          class="item"
          size="medium"
          placeholder="请输入关键字"
          v-model.trim="searchForm.auditer" />
      </el-form-item>
      <el-form-item
        v-if="type === 4"
        prop="">
        <el-date-picker
          v-model="searchForm.auditTime"
          size="medium"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期" />
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
      :id="id"
      />
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import CreateDialog from './CreateDialog'

export default {
  data () {
    return {
      type: 1,
      searchForm: {
        name: '',
        auditer: '',
        applyTime: [],
        auditTime: []
      },
      createDialogVisible: false,
      id: null
    }
  },
  computed: {
    ...mapState('votersAppealHome', {
      multipleSelection: state=>state.multipleSelection
    })
  },
  components: {
    CreateDialog
  },
  created () {
  },
  methods: {
    ...mapActions('votersAppealHome', [
      'getListData',
    ]),
    // 搜索
    submitForm () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          const params = JSON.parse(JSON.stringify(this.searchForm))
          params.pageNum = 1
          if (params.applyTime && params.daapplyTimete.length > 0) {
            params.applyTimeStart = new Date(params.applyTime[0]).getTime()
            params.applyTimeEnd = new Date(params.applyTime[1]).getTime()
          } else {
            params.applyTimeStart = ''
            params.applyTimeEnd = ''
          }
          if (params.auditTime && params.auditTime.length > 0) {
            params.auditTimeStart = new Date(params.auditTime[0]).getTime()
            params.auditTimeEnd = new Date(params.auditTime[1]).getTime()
          } else {
            params.auditTimeStart = ''
            params.auditTimeEnd = ''
          }
          delete params.auditTime
          delete params.applyTime
          this.getListData(params)
        }
      })
    },
    handel () {
      if(this.multipleSelection.length === 0) {
        this.$notify({
          title: '',
          message: '请勾选数据后再操作！',
          type: 'warning'
        });
        return
      }
      if(this.multipleSelection.length > 1) {
        this.$notify({
          title: '',
          message: '只能勾选一条！',
          type: 'warning'
        })
        return
      }
      this.id = this.multipleSelection[0].id
      this.createDialogVisible = true
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
