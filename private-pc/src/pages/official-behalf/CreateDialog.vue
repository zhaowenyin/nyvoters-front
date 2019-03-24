<template>
  <el-dialog
    title=""
    :visible="visible"
    width="700px"
    :before-close="comfirmClose">
    <div class="view">
      <div class="view-left">
        <div class="text">待选</div>
        <ul class="content">
        <el-input
           style="padding: 10px;"
          placeholder="输入关键字进行过滤"
          v-model="filterText">
          </el-input>
          <li
            @click="select(i)"
            :key="key"
            class="item"
            v-for="(i,key) in filterList">
            <div>{{i.name}}</div>
            <div>{{i.precinct}}</div>
          </li>
        </ul>

      </div>
      <div class="row-ccontent"><div class="row"/></div>
      <div class="view-content">
        <div class="text">已选</div>
        <ul class="content">
          <li
            :key="key"
            class="item"
            v-for="(i,key) in selectedList">
            <div>{{i.name}}</div>
            <div>{{i.precinct}}</div>
            <i @click="deleteI(i)" class="el-icon-circle-close"></i>
          </li>
        </ul>
      </div>
    </div>
    <div
      slot="footer"
      class="footer">
      <el-button
      @click="submitForm()"
      size="medium"
      :loading="loading"
      type="primary">确定</el-button>
      <el-button
      @click="comfirmClose()"
      size="medium">取消</el-button>
    </div>
  </el-dialog>
</template>
<script>
import {getCandidate,setSubmit} from './service.js'
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      loading: false,
      list: [],
      filterList: [],
      filterText: '',
      selectItem: {},
      selectedList: []

    }

  },
  props:{
    visible: {
      default: false,
      type: Boolean
    },
    item: {
      default: () => {},
      type: Object
    },
  },
  watch: {
    filterText(val) {
      let value = val.replace(/(^\s*)|(\s*$)/g, '')
      let list = JSON.parse(JSON.stringify(this.list))
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        if (value) {
          this.filterList = list.filter(i => {
            return i.name.indexOf(value) >= 0
          })
        } else {
          this.filterList = list
        }
      }, 100)
    }
  },
  created () {
    this.searchCandidate()
  },
  components: {

  },
  methods: {
    ...mapActions('officialBehalf', [
      'getListData',
    ]),
    close () {
      this.$emit('update:visible', false)
    },
    submitForm () {
      if(this.selectedList.length === 0) {
        this.$notify({
          title: '',
          message: '请选择候选人！',
          type: 'warning'
        })
        return
      }
      this.$confirm('确认将已选人员作为正式代表？')
        .then(() => {
          this.sumitData()
        })
        .catch(() => {})

    },

    async searchCandidate () {
      this.loading = true
      const {data} = await getCandidate()
      this.list = data.content
      this.filterList = JSON.parse(JSON.stringify(this.list))
      this.loading = false
    },
    async sumitData () {
      this.loading = true
      let idList = []
      for (let i of this.selectedList) {
        idList.push(i.precinctId)
      }
      let params = {idList}
      await setSubmit(params)
      this.getListData()
      this.close()
      this.loading = false
    },
    comfirmClose () {
      this.$confirm('关闭将丢失已编辑的内容，确认关闭？')
        .then(() => {
          this.close()
        })
        .catch(() => {})
    },
    select(data) {
      this.selectedList.push(data)
    },
    deleteI(val) {
      this.selectedList = this.selectedList.filter(i => {
        return i.precinctId!==val.precinctId
      })

    }
  }

}
</script>
<style scoped>
.view{
    display: flex;
    height: 100%;
  }
  .view-left {
    flex: 1;
    background-color: #ffffff;
  }
  .view-content {
    flex: 1;
  }
  .content {
    height: 350px;
    border: 1px solid #ccc;
    padding: 10px;
    overflow: auto;
  }
  .item {
    display: flex;
    justify-content: space-between;
    padding: 15px;
    cursor: pointer;
  }
  .row-ccontent {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 50px;
  }
  .row {
      width:0;
      height:0;
      border-left:25px solid #fff;
      border-top:15px solid transparent;
      border-bottom:15px solid transparent;
      position: relative;
      &:after{
        content: '';
        display: block;
        position: absolute;
        top: -12px;
        left: -25px;
        border-left:25px solid #444;
        border-top:15px solid transparent;
        border-bottom:15px solid transparent;
      }
    }
    .text {
      font-weight: bold;
      font-size: 16px;
    }
</style>
<style>
  .table-obj .el-form-item {
    margin: 15px 0;
  }
</style>
