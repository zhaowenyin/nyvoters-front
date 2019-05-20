<template>
  <el-dialog
    title=""
    :visible="visible"
    width="500px"
    :before-close="comfirmClose">
    <div class="view">
      <div class="view-left">
        <div class="text">排序调整</div>
         <draggable
          class="content"
          v-model="list1"
          :options="{draggable:'.list-group-item'}">
          <div
            @click="select(i,key)"
            :key="key"
            :class="['item',{'isclick':currentItem.id === i.id},'list-group-item']"
            v-for="(i,key) in list1">
            <div>{{i.recommendedPerson}}</div>
            <div>{{i.belongAreaName}}</div>
          </div>
        </draggable>
      </div>
      <div class="row">
        <div @click="up" class="up"/>
        <div @click="down" class="down"/>
      </div>
    </div>
    <div
      slot="footer"
      class="footer">
      <el-button
      @click="sumitData()"
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
import {setSubmit} from '../common-data/service.js'
import draggable from 'vuedraggable'
export default {
  data () {
    return {
      loading: false,
      currentItem: {},
      list1: [],
      index: -1
    }

  },
  props:{
    visible: {
      default: false,
      type: Boolean
    },
    list: {
      default: null,
      type: null
    },
    status: {
      default: null,
      type: null
    }
  },
  created () {
    this.list1 = JSON.parse(JSON.stringify(this.list))

  },
  components: {
    draggable
  },
  methods: {
    close () {
      this.$emit('update:visible', false)
    },
    async sumitData () {
      let id = []
      for(let i of this.list1) {
        id.push(i.id)
      }
      let params={
        status: this.status,
        id
      }
      this.loading = true
      await setSubmit(params)
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
    up () {
      if(this.index<0 ) {
        this.$notify({
          title: '',
          message: '请先点击选择！',
          type: 'warning'
        })
        return
      }
      this.upGo(this.list1,this.index)
    },
    down () {
      if(this.index<0 ) {
        this.$notify({
          title: '',
          message: '请先点击选择！',
          type: 'warning'
        })
        return
      }
      this.downGo(this.list1,this.index)
    },
    select (i,index) {
      this.currentItem = i
      this.index = index
    },
    upGo(fieldData=[],index) {
      if (index!==0) {
        fieldData[index] = fieldData.splice(index-1, 1, fieldData[index])[0]
      } else {
        fieldData.push(fieldData.shift())
      }
    },
    downGo(fieldData=[],index) {
      if(index!==fieldData.length-1){
        fieldData[index] = fieldData.splice(index+1, 1, fieldData[index])[0]
      }else{
        fieldData.unshift(fieldData.splice(index,1)[0])
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
.down {
  width:0;
  height:0;
  border-top:25px solid #fff;
  border-left:15px solid transparent;
  border-right:15px solid transparent;
  position: relative;
  &:after{
    content: '';
    display: block;
    position: absolute;
    top: -12px;
    left: -25px;
    border-top:25px solid #444;
    border-left:15px solid transparent;
    border-right:15px solid transparent;
  }
}
.down {
  cursor: pointer;
  width:0;
  height:0;
  border-top:25px solid #fff;
  border-left:15px solid transparent;
  border-right:15px solid transparent;
  position: relative;
  &:after{
    content: '';
    display: block;
    position: absolute;
    top: -12px;
    left: -25px;
    border-top:25px solid #444;
    border-left:15px solid transparent;
    border-right:15px solid transparent;
  }
}
.up {
  margin-bottom: 20px;
  cursor: pointer;
  width:0;
  height:0;
  border-bottom:25px solid #fff;
  border-left:15px solid transparent;
  border-right:15px solid transparent;
  position: relative;
  &:after{
    content: '';
    display: block;
    position: absolute;
    top: -12px;
    left: -25px;
    border-bottom:25px solid #444;
    border-left:15px solid transparent;
    border-right:15px solid transparent;
  }
}
.text {
  font-weight: bold;
  font-size: 16px;
}
.row {
  width: 50px;
  margin-left: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.list-group-item {
  cursor: move;
}
.isclick {
  background-color: #ccc;
}
</style>
<style>
  .table-obj .el-form-item {
    margin: 15px 0;
  }
</style>
