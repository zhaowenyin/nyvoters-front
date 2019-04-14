<template>
  <div class="search-box">
    <div class="left">
      <el-button @click="upload" size="medium" type="primary" icon="el-icon-upload2">导入</el-button>
      <div class="down">模板下载：<span class="label" @click="download">选民登记</span></div>
    </div>
    <CreateDialog
      v-if="createDialogVisible"
      :visible.sync='createDialogVisible'
      />
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import CreateDialog from './CreateDialog'
import  output from '../../../utils/output.js'

export default {
  data () {
    return {
      type: 1,
      createDialogVisible: false
    }
  },
  computed: {
    ...mapState('voterRegisters', {
      multipleSelection: state=>state.multipleSelection
    })
  },
  components: {
    CreateDialog
  },
  created () {
  },
  methods: {
    ...mapActions('voterRegisters', [
      'getListData',
    ]),
    // 搜索
    upload () {
      this.createDialogVisible = true
    },
    async download (item) {
      try {
        output({url: '/doc/download', params: {id: item, module: 1}})
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
      margin-bottom: 22px;
      display: flex;
      justify-content:space-between;
      align-items: center;
    }
    & .form {

    }
  }
  .down {
    & .label {
      text-decoration:underline;
      color: blue;
      cursor: pointer;
    }
  }
</style>
