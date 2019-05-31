<template>
  <div class="search-box">
    <el-form
      ref="form"
      :model="searchForm"
      :inline="true"
      class="from">
      <el-form-item
        label="姓名"
        prop="name">
        <el-input
          class="item"
          size="medium"
          placeholder="请输入姓名"
          v-model.trim="searchForm.name" />
      </el-form-item>
      <el-form-item
        label="身份证号码"
        prop="idNum">
        <el-input
          class="item"
          :maxlength="18"
          size="medium"
          placeholder="请输入身份证号码"
          v-model.trim="searchForm.idNum" />
      </el-form-item>
       <el-form-item
       label="登记方式"
        prop="registrationType">
        <el-select
        size="medium"
        placeholder="请选择登记方式"
        v-model.trim="searchForm.registrationType">
          <el-option
            v-for="(item, key) in registrationTypeList"
            :key="key"
            :label="item"
            :value="key">
          </el-option>
        </el-select>
      </el-form-item>
       <el-form-item
       label="状态"
        prop="type">
        <el-select
        size="medium"
        placeholder="请选择状态"
        style="width: 200px;"
        v-model.trim="searchForm.status">
          <el-option
            v-for="(item, key) in status"
            :key="key"
            :label="item"
            :value="key">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item class="submit">
      <el-button
        @click="submitForm()"
        size="medium"
        type="primary">搜索</el-button>
      <el-button
        @click="reset()"
        size="medium">重置</el-button>
    </el-form-item>
    </el-form>

  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import {registrationTypeList, typeList,status} from '../../common-data/config.js'

export default {
  data () {
    return {
      type: 1,
      searchForm: {
        name: '',
        idNum: '',
        registrationType: '',
        status: null
      },
      createDialogVisible: false,
      item: {},
      registrationTypeList,
      typeList,
      status
    }
  },
  computed: {
    ...mapState('voterInfo', {
      multipleSelection: state=>state.multipleSelection
    })
  },
  components: {

  },
  created () {
  },
  methods: {
    ...mapActions('voterInfo', [
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
    reset () {
      this.$refs.form.resetFields()
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
  .submit {
    display: flex;
    justify-content: center;
  }
</style>
