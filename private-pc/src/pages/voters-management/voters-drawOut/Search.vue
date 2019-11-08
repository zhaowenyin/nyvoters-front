<template>
  <div class="search-box">
    <div class="left">
      <el-button size="medium" @click="drawOutI" type="primary" icon="el-icon-delete">划出</el-button>
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
          <el-option label="身份证号码" :value="2"></el-option>
          <el-option label="手机号" :value="3"></el-option>
          <el-option label="参选地类型" :value="4"></el-option>
          <el-option label="选民状态" :value="5"></el-option>
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
        prop="idNum">
        <el-input
          class="item"
          size="medium"
          placeholder="请输入关键字"
          v-model.trim="searchForm.idNum" />
      </el-form-item>
      <el-form-item
        v-if="type === 3"
        prop="phoneNum">
        <el-input
          class="item"
          size="medium"
          placeholder="请输入关键字"
          v-model.trim="searchForm.phoneNum" />
      </el-form-item>
      <el-form-item
        v-if="type === 4"
        prop="dacandidateTypete">
        <el-select  size="medium" v-model.trim="searchForm.candidateType">
          <el-option
            v-for="(item, key) in candidateTypeList"
            :key="key"
            :label="item"
            :value="key">
          </el-option>
        </el-select>
      </el-form-item>
        <el-form-item
        v-if="type === 5"
        prop="status">
        <el-select  size="medium" v-model.trim="searchForm.status">
          <el-option
            v-for="(item, key) in statusList"
            :key="key"
            :label="item"
            :value="key">
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
import { drawOut} from './service.js'
import {typeList, candidateTypeList, statusList} from '../../../common-data/config.js'

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
      id: '',
      statusList
    }
  },
  computed: {
    ...mapState('votersOut', {
      multipleSelection: state=>state.multipleSelection
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
        candidateType: '',
        status: ''
      }
      this.searchForm = {...value}
    }
  },
  created () {
  },
  methods: {
    ...mapActions('votersOut', [
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
    drawOutI () {
      if(this.multipleSelection.length === 0) {
        this.$notify({
          title: '',
          message: '请勾选数据后再操作！',
          type: 'warning'
        });
        return
      }
      this.$confirm('确认将勾选的选民划出当前所在选区么？')
        .then(() => {
          this.drawOutItem()
        })
        .catch(() => {})

    },
    async drawOutItem() {
      let ids = []
      for (let i of this.multipleSelection) {
        ids.push(i.id)
      }
      let params = {ids}
      await drawOut(params)
      const param = JSON.parse(JSON.stringify(this.searchForm))
      param.pageNum = 1
      this.getListData(param)
      this.$notify({
        message: '划出成功！',
        type: 'success'
      })
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
