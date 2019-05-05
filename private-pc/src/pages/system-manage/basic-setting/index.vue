<template>
  <div v-loading="loading" class="basic">
     <el-button size="medium" @click="setting">系统参数设置</el-button>
     <span class="text">余：<span class="num">{{info.canRegisterDays}}</span>  天可登记</span>
     <CreateDialog
      v-if="createDialogVisible"
      :item='item'
      :visible.sync='createDialogVisible'
      />
  </div>
</template>
<script>
import CreateDialog from './CreateDialog'
import {getinfo} from './service.js'

export default {
  data () {
    return {
      createDialogVisible: false,
      item: {},
      info: {}
    }
  },
  computed: {

  },
  components: {
    CreateDialog,
  },
  created () {
    this.getinfo()
  },
  methods: {
    setting(){
      this.createDialogVisible = true
    },
    async getinfo () {
      this.loading = true
      const {data} = await getinfo()
      this.info = data.content
      this.loading = false
    },
  }
}
</script>
<style scoped>
  .basic{
    background: #f8f8f8;
    padding: 16px 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    & .text {
      padding-top: 40px;
       font-size: 18px;
      & .num {
        font-size: 24px;
        color: #fecb6e;
      }
    }
  }
</style>
