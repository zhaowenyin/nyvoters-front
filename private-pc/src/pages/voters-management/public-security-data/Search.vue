<template>
  <div class="search-box">
    <div class="left">
      <div class="down">模板下载：<span class="label" @click="download">公安数据模板.xlsx</span></div>
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
          <el-option label="选民状态" :value="5"></el-option>
        </el-select>
      </el-form-item>
        <el-form-item
        v-if="type === 1"
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
import {pubilcData} from '../../../common-data/config.js'
import  output from '../../../utils/output'
import { getSession } from '../../../utils/session.js'

export default {
  data () {
    const authToken = getSession()
    return {
      type: 1,
      searchForm: {
        status: ''
      },
      pubilcData,
      authToken
    }
  },
  computed: {
    ...mapState('commonData', {
      belongAreaId: state => state.belongAreaId
    })
  },
  components: {

  },
  watch: {
  },
  created () {
  },
  methods: {
    ...mapActions('publicsecuritydata', [
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
    async download () {
      try {
        output({url: '/doc/download', param: {fileName: '公安数据模板.xlsx', token:this.authToken.token,belongAreaId: this.belongAreaId}})
      } catch (err) {
        console.log(err)
      }
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
  .down {
    & .label {
      text-decoration:underline;
      color: blue;
      cursor: pointer;
    }
  }
</style>
