<template>
  <div class="search-box">
  <el-checkbox-group
    v-model="checkedItem"
    @change="handleCheckedCitiesChange"
    class="left">
    <el-checkbox v-for="item in list" :label="item" :key="item">{{item}}</el-checkbox>
  </el-checkbox-group>
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
          <el-option label="原选区" :value="3"></el-option>
          <el-option label="转移选区" :value="4"></el-option>
          <el-option label="申请时间" :value="5"></el-option>
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
          v-model.trim="searchForm.fromPrecinctId" />
      </el-form-item>
      <el-form-item
        v-if="type === 4"
        prop="tel">
        <el-input
          class="item"
          size="medium"
          placeholder="请输入关键字"
          v-model.trim="searchForm.toPrecinctId" />
      </el-form-item>
      <el-form-item
        v-if="type === 5"
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
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import {typeList, candidateTypeList} from '../../../../common-data/config.js'

export default {
  data () {
    return {
      type: 1,
      searchForm: {
        name: '',
        idNum: '',
        phoneNum: '',
        candidateType: '',
        status: ''
      },
      typeList,
      candidateTypeList,
      createDialogVisible: false,
      list: ['发起申请记录','处理申请记录'],
      id: '',
      checkedItem: ['发起申请记录','处理申请记录']
    }
  },
  computed: {
    ...mapState('votersTransferHistory', {
      multipleSelection: state=>state.multipleSelection,
    })
  },
  components: {

  },
  created () {
  },
  methods: {
    ...mapActions('votersTransferHistory', [
      'getListData',
      'handerList'
    ]),
    // 搜索
    submitForm () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          const params = JSON.parse(JSON.stringify(this.searchForm))
          params.pageNum = 1
          if (params.date && params.date.length > 0) {
            params.applyTimeStart = new Date(params.date[0]).getTime()
            params.applyTimeEnd = new Date(params.date[1]).getTime()
          } else {
            params.applyTimeStart = ''
            params.applyTimeEnd = ''
          }
          this.getListData(params)
        }
      })
    },
    handleCheckedCitiesChange(val) {
      this.checkedItem = val
      this.handerList(val)
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
      display: flex;
      align-items: center;
      margin-bottom: 20px;
    }
    & .form {

    }
  }
  .item {
    width: 200px;
  }
</style>
