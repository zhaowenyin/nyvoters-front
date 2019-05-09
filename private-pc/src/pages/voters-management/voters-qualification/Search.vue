<template>
  <div class="search-box">
    <div class="left">
      <el-button size="medium" @click="through" type="primary">通过</el-button>
      <el-button size="medium" @click="notThrough" type="primary">不通过</el-button>
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
          <el-option label="姓名" :value="1"></el-option>
          <el-option label="身份证号码" :value="2"></el-option>
          <el-option label="手机号" :value="3"></el-option>
          <el-option label="登记日期" :value="4"></el-option>
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
        <el-date-picker
          v-model="searchForm.date"
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
import {throughTabel} from './service.js'

export default {
  data () {
    return {
      type: 1,
      searchForm: {
        name: '',
        idNum: '',
        phoneNum: '',
        date: []
      },
      createDialogVisible: false,
      id: null
    }
  },
  computed: {
    ...mapState('votersQualification', {
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
        date: []
      }
      this.searchForm = {...value}
    }
  },
  created () {
  },
  methods: {
    ...mapActions('votersQualification', [
      'getListData',
    ]),
    // 搜索
    submitForm () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          const params = JSON.parse(JSON.stringify(this.searchForm))
          params.pageNum = 1
          if (params.date && params.date.length > 0) {
            params.startTime = new Date(params.date[0]).getTime()
            params.endTime = new Date(params.date[1]).getTime()
          } else {
            params.startTime = ''
            params.endTime = ''
          }
          delete params.date
          this.getListData(params)
        }
      })
    },
    notThrough () {
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
    },
    through () {
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
      this.throughItem()

    },
    async throughItem() {
      let params = {
        id: this.multipleSelection[0].id,
        pass: true,
        reason: ''
      }
      await throughTabel(params)
      this.$notify({
        title: '',
        message: '登记成功！',
        type: 'success'
      })
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
