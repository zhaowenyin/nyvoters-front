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
import { getSession } from '../../../utils/session.js'

export default {
  data () {
    const authToken = getSession()
    return {
      type: 1,
      createDialogVisible: false,
      authToken
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
    async download () {
      try {
        output({url: '/doc/download', param: {fileName: '选民登记', module: 1,token:this.authToken.token}})
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
