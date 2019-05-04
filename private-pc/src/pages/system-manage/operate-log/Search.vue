<template>
  <div class="search-box">
    <div class="left">

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
          <el-option label="操作人" :value="1"></el-option>
          <el-option label="时间" :value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        v-if="type === 1"
        prop="name">
        <el-input
          class="item"
          size="medium"
          placeholder="请输入关键字"
          v-model.trim="searchForm.userName" />
      </el-form-item>
      <el-form-item
        v-if="type === 2"
        prop="startTime">
         <el-date-picker
          v-model="searchForm.date"
          placeholder="请选择时间"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
           </el-date-picker>
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
import {mapActions } from 'vuex'

export default {
  data () {
    return {
      type: 1,
      searchForm: {
        userName: '',
        date: [],

      },
    }
  },
  computed: {

  },
  components: {

  },
  created () {
  },
  methods: {
    ...mapActions('log', [
      'getListData',
    ]),
    // 搜索
    submitForm () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          const params = JSON.parse(JSON.stringify(this.searchForm))
          console.log(params.startTime)
          if(params.date !== null && params.date.length!==0){
            params.startDate = new Date(params.date[0]).getTime()
            params.endDate = new Date(params.date[1]).getTime()
          } else {
            params.startDate = ''
            params.endDate = ''
          }
          delete params.date
          params.pageNum = 1
          this.getListData(params)
        }
      })
    },
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
