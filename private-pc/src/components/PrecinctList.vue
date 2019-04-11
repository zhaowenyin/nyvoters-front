<template>
  <el-dialog
    :modal='false'
    ref="dia"
    class="dia"
    title=""
    :visible="visible"
    width="750px"
    :before-close="comfirmClose">
    <div class="view">
      <div class="view-left">
        <div>待选</div>
        <div class="content">
          <CommonTree
            :hasSearch="true"
            :data="data"
            @node-click="handleNodeClick" />
        </div>

      </div>
      <div class="row-ccontent"><div class="row"/><div class="row up"/></div>
      <div class="view-content">
          已选
        <ul class="content">
          <li
            v-for="(i, key) in nameList"
            :key="key">{{i}}</li>
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
import {getTree} from '../common-data/service.js'
import CommonTree from './common-tree'
export default {
  data () {
    return {
      loading: false,
      data: [],
      filterText: '',
      selectList: [],
      nameList: []
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
    multiple: {
      default: false,
      type: Boolean
    },
    value: {
      default: null,
      type: [String, Array,Number]
    },
    labels: {
      default: null,
      type: [String, Array]
    },
  },
  watch: {
    filterText(val) {
      this.$refs.tree2.filter(val)
    }
  },
  created () {
    let val = {}
    if(this.item.id) {
      val = {
        id: this.item.id,
        type: 2
      }
    } else {
      val = {
        type: 2
      }
    }
    this.searchTree(val)
    if (this.multiple) {
      this.nameList = JSON.parse(JSON.stringify(this.labels))
    } else {
      this.nameList.push(this.labels)
    }
  },
  components: {
    CommonTree
  },
  mounted () {
    this.$refs.dia.style.Color="red"
  },
  methods: {
    close () {
      this.$emit('update:visible', false)
    },
    submitForm () {
      let val = null
      if (this.multiple) {
        val = this.selectList
      } else {
        val = this.selectList[0]
      }
      this.$emit('saveData', val)
      this.close()
    },

    async searchTree () {
      const {data} = await getTree()
      this.data = data.content
    },
    comfirmClose () {
      this.close()
    },
    handleNodeClick(data) {
      if(!this.multiple) {
        this.selectList = []
        this.nameList = []
      }
      let isSimilar = false
      for(let i of this.selectList) {
        if(i.id === data.id) {
          isSimilar = true
        }
      }
      if(!isSimilar) {
        this.selectList.push(data)
        this.nameList.push(data.name)
      }

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
  }
  .row-ccontent {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 50px;
  }
  .row {
    margin-bottom: 20px;
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
       &.up{
        transform: rotate(180deg);
      }
    }
</style>
<style>
  .table-obj .el-form-item {
    margin: 15px 0;
  }
</style>
