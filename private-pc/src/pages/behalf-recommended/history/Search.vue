<template>
  <div class="search-box">
    <div class="left">
      <el-button @click="repeal" size="medium" type="primary" icon="el-icon-delete">撤销</el-button>
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
          <el-option label="被推荐人" :value="1"></el-option>
          <el-option label="推荐方式" :value="2"></el-option>
          <el-option label="推荐类型" :value="3"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        v-if="type === 1"
        prop="recommendedPerson">
        <el-input
          class="item"
          size="medium"
          placeholder="请输入关键字"
          v-model.trim="searchForm.recommendedPerson" />
      </el-form-item>
      <el-form-item
        v-if="type === 2"
        prop="recommendType">
         <el-select  size="medium" v-model.trim="searchForm.recommendType" placeholder="请选择推荐方式">
        <el-option
          v-for="item in methodList"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      </el-form-item>
      <el-form-item
        v-if="type === 3"
        prop="type">
        <el-select  size="medium" v-model.trim="searchForm.type" placeholder="请选择推荐类型">
          <el-option
            v-for="item in typeList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
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
import {repealTabel} from './service.js'

export default {
  data () {
    return {
      type: 1,
      searchForm: {
        recommendedPerson: '',
        recommendType: '',
        type: ''
      },
      methodList: [
        {
          value: 1,
          label: '团体推荐'
        },
        {
          value: 2,
          label: '选民联名推荐'
        }
      ],
      typeList: [
        {
          value: 1,
          label: '区县代表'
        },
        {
          value: 2,
          label: '乡镇代表'
        }
      ],
      createDialogVisible: false,
      item: {}
    }
  },
  computed: {
    ...mapState('behalfCommendedHistory', {
      multipleSelection: state=>state.multipleSelection
    })
  },
  components: {

  },
  watch: {
    type () {
      let value={
        recommendedPerson: '',
        recommendType: '',
        type: ''
      }
      this.searchForm = {...value}
    }
  },
  created () {
  },
  methods: {
    ...mapActions('behalfCommendedHistory', [
      'getListData',
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
      this.createDialogVisible = true
    },
    async repeal () {
      if(this.multipleSelection.length === 0) {
        this.$notify({
          title: '',
          message: '请勾选数据进行撤销！',
          type: 'warning'
        });
        return
      }
      let idList = []
      for (let i of this.multipleSelection) {
        if(i.status !== 'WAIT_REVIEW'){
          this.$notify({
            title: '',
            message: '只允许撤销【待资格审查】状态的数据！',
            type: 'warning'
          });
          return
        }
        idList.push(i.id)
      }
      let params = {idList,status: "REVIEW_SUCCESS"}
      await repealTabel(params)
      this.$notify({
        title: '',
        message: '撤销成功',
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
