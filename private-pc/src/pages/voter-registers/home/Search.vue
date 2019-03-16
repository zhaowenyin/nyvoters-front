<template>
  <div class="search-box">
    <div class="left">
      <el-button @click="upload" size="medium" type="primary" icon="el-icon-upload2">上传</el-button>
      <div class="down">模板下载：<span class="label">选民登记</span></div>
    </div>
    <CreateDialog
      v-if="createDialogVisible"
      :item='item'
      :visible.sync='createDialogVisible'
      />
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import CreateDialog from './CreateDialog'
import { output } from '../../../utils/output.js'

export default {
  data () {
    return {
      type: 1,
      searchForm: {
        recommendedPerson: '',
        recommendType: '',
        type: '',
        item: {}
      },
      createDialogVisible: false
    }
  },
  computed: {
    ...mapState('behalfCommended', {
      multipleSelection: state=>state.multipleSelection
    })
  },
  components: {
    CreateDialog
  },
  created () {
  },
  methods: {
    ...mapActions('behalfCommended', [
      'getListData',
    ]),
    // 搜索
    submitForm () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          const params = JSON.parse(JSON.stringify(this.searchForm))
          params.page = 1
          this.getListData(params)
        }
      })
    },
    upload () {
      this.item = {}
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
