<template>
  <div>
    <el-dialog
      title="资格不通过原因："
      :visible="visible"
      width="500px"
      :before-close="comfirmClose">
      <el-row :gutter="20">
        <el-col
          class="list"
          v-for="(i,key) in list"
          :key="key"
          :span="key>1 ? 8 : 12">
          <div @click="clickItem(i)" :class="['item',{'key':key>1},{'active': i===selectItem}]">{{i}}</div>
        </el-col>
      </el-row>
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
  </div>
</template>
<script>
import {throughTabel} from './service.js'
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      loading: false,
      list: ['不能行使选举权','被剥夺政治权利', '死亡','迁出','其他'],
      selectItem: ''
    }

  },
  props:{
    visible: {
      default: false,
      type: Boolean
    },
    id: {
      default: '',
      type: String
    }
  },
  components: {

  },
  created () {

  },
  methods: {
    ...mapActions('votersTransfer', [
      'getListData'
    ]),
    close () {
      this.$emit('update:visible', false)
    },
    submitForm () {
      if(!this.selectItem) {
        this.$notify({
          title: '',
          message: '资格不通过原因！',
          type: 'warning'
        })
        return
      }
      this.sumitData()
    },
    async sumitData () {
      this.loading = true
      let params = {
        id: this.id,
        pass: '不通过',
        reason: this.selectItem
      }
      await throughTabel(params)
      this.close()
      this.getListData()
      this.loading = false
    },
    clickItem (val) {
      this.selectItem = val
    },
    comfirmClose () {
      this.$confirm('关闭将丢失已编辑的内容，确认关闭？')
        .then(() => {
          this.close()
        })
        .catch(() => {})
    }
  }
}
</script>
<style scoped>
.left {
  margin: 10px 0;
}
.list {
  display: flex;
  justify-content: center;
  cursor: pointer;
 & .item {
   border: 1px solid #ccc;
   padding: 10px;
   width: 150px;
   text-align: center;
   border-radius: 4px;
   margin-bottom: 30px;

   &.key{
    width: 70px;
   }
  &.active {
    background-color: #D41C1A;
    color: #fff;
  }
 }

}

</style>
<style>
  .table-obj .el-form-item {
    margin: 15px 0;
  }
</style>
