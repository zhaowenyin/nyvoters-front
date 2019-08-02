<template>
  <div class="search-box">
  <el-checkbox-group
    v-model="checkedItem"
    @change="handleCheckedCitiesChange"
    class="left">
    <el-checkbox v-for="(item, key) in list" :label="+key" :key="+key">{{item}}</el-checkbox>
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
          style="width: 120px;"
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
          range-separator="-"
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
import { mapState, mapActions, mapMutations } from 'vuex'

export default {
  data () {
    return {
      type: 1,
      searchForm: {
        name: '',
        idNum: '',
        phoneNum: '',
        type: 0,
        date: []
      },
      createDialogVisible: false,
      list: {1: '发起申请记录',2:'处理申请记录'},
      id: '',
      checkedItem: [1,2]
    }
  },
  computed: {
    ...mapState('votersTransferHistory', {
      multipleSelection: state=>state.multipleSelection,
    })
  },
  components: {

  },
  watch: {
    type () {
      let value={
        name: '',
        idNum: '',
        phoneNum: '',
        type: 0,
        date: []
      }
      this.searchForm = {...value}
    }
  },
  created () {
  },
  methods: {
    ...mapActions('votersTransferHistory', [
      'getListData'
    ]),
    ...mapMutations('votersTransferHistory', [
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
          delete params.date
          this.getListData(params)
        }
      })
    },
    handleCheckedCitiesChange(val) {
      if(val.length === 0 || val.length === 2) {
        this.searchForm.type=0
      } else {
        this.searchForm.type = val[0]
      }
      this.checkedItem = val
      this.getListData({type: this.searchForm.type})
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
