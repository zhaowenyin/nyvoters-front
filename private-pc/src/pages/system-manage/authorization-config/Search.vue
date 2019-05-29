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
          style="width: 100px;"
          placeholder="请输入">
          <el-option label="姓名" :value="1"></el-option>
           <el-option label="角色" :value="2"></el-option>
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
        prop="name">
         <el-select  size="medium" v-model.trim="searchForm.type" placeholder="请选择角色">
          <el-option
            v-for="(item,key) in typeList"
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
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      type: 1,
      searchForm: {
        name: '',
        type: ''
      },
    }
  },
  computed: {

  },
  components: {

  },
  watch: {
    type () {
      let value={
        name: '',
        type: ''
      }
      this.searchForm = {...value}
    }
  },
  created () {
  },
  methods: {
    ...mapActions('districtAccount', [
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
