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
          v-model.trim="searchForm.pageNum" />
      </el-form-item>
      <el-form-item
        v-if="type === 4"
        prop="date">
        <el-select  size="medium" v-model.trim="searchForm.candidateType">
          <el-option
            v-for="(item, key) in typeList"
            :key="key"
            :label="item"
            :value="+key">
          </el-option>
        </el-select>
      </el-form-item>
        <el-form-item
        v-if="type === 5"
        prop="date">
        <el-select  size="medium" v-model.trim="searchForm.type">
          <el-option
            v-for="(item, key) in candidateTypeList"
            :key="key"
            :label="item"
            :value="+key">
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
