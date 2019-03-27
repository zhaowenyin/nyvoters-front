<template>
  <div class="search-box">
    <div class="left">
      <el-button size="medium" @click="create" type="primary" icon="el-icon-circle-plus-outline">新建</el-button>
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
          <el-option label="姓名" :value="1"></el-option>
          <el-option label="身份证" :value="2"></el-option>
          <el-option label="剥权时间" :value="3"></el-option>
          <el-option label="剥权恢复时间" :value="4"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        v-if="type === 1"
        prop="name">
        <el-input
          class="item"
          size="medium"
          placeholder="请输入姓名"
          v-model.trim="searchForm.name" />
      </el-form-item>
       <el-form-item
        v-if="type === 2"
        prop="idNum">
        <el-input
          class="item"
          size="medium"
          placeholder="请输入身份证"
          v-model.trim="searchForm.idNum" />
      </el-form-item>
      <el-form-item
        v-if="type === 3"
        prop="startTime">
         <el-date-picker
          v-model="searchForm.startTime"
          placeholder="请选择"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
           </el-date-picker>
      </el-form-item>
      <el-form-item
      v-if="type === 4"
      prop="endTime">
      <el-date-picker
        v-model="searchForm.endTime"
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

export default {
  data () {
    return {
      type: 1,
      searchForm: {
        name: '',
        startTime: [],
        endTime: [],
        idNum: ''

      },
      createDialogVisible: false,
      typeList: {
        0: '区县小组',
        1: '乡镇小组'
      }
    }
  },
  computed: {
    ...mapState('cutPower', {
      multipleSelection: state=>state.multipleSelection
    })
  },
  components: {
    CreateDialog
  },
  created () {
  },
  methods: {
    ...mapActions('cutPower', [
      'getListData',
    ]),
    // 搜索
    submitForm () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          const params = JSON.parse(JSON.stringify(this.searchForm))
          console.log(params.startTime)
          if(params.startTime !== null && params.startTime.length!==0){
            params.endTimeStart = new Date(params.startTime[0]).getTime()
            params.startTimeEnd = new Date(params.startTime[1]).getTime()
          } else {
            params.endTimeStart = ''
            params.startTimeEnd = ''
          }
          if(params.endTime !== null && params.endTime.length!==0){
            params.startTimeStart = new Date(params.endTime[0]).getTime()
            params.endTimeEnd = new Date(params.endTime[1]).getTime()
          } else {
            params.startTimeStart = ''
            params.endTimeEnd = ''
          }
          delete params.startTime
          delete params.endTime

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
