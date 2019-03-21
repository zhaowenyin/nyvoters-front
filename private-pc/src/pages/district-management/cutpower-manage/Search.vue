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
    ...mapState('voterGroup', {
      multipleSelection: state=>state.multipleSelection
    })
  },
  components: {
    CreateDialog
  },
  created () {
  },
  methods: {
    ...mapActions('voterGroup', [
      'getListData',
    ]),
    // 搜索
    submitForm () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          const params = JSON.parse(JSON.stringify(this.searchForm))
          if( params.startTime !== null && params.startTime.length===0){
            params.endTimeStart = params.startTime[0].getTime()
            params.startTimeEnd = params.startTime[1].getTime()
          }
          if( params.endTime !== null && params.endTime.length===0){
            params.startTimeStart = params.endTime[0].getTime()
            params.endTimeEnd = params.endTime[1].getTime()
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
