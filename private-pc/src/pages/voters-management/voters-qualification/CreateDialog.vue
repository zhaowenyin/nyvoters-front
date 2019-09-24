<template>
  <el-dialog
    title="资格不通过原因："
    :visible="visible"
    width="500px"
    :close-on-click-modal="false"
    :before-close="comfirmClose">
    <el-row :gutter="20">
      <el-col
        class="list"
        v-for="(i,key) in list"
        :key="key"
        :span="+key>3 ? 8 : 12">
        <div @click="clickItem(key)" :class="['item',{'key':key>3},{'active': key===selectItem}]">{{i}}</div>
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
</template>
<script>
import {throughTabel} from './service.js'
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      loading: false,
      list: {2:'不能行使选举权',3:'被剥夺政治权利', 4:'迁出',5: '死亡',6:'其他',8:'暂停行使选举权利',9:'长期外出下落不明',10:'无资格转移证明'},
      selectItem: ''
    }

  },
  props:{
    visible: {
      default: false,
      type: Boolean
    },
    ids: {
      default: ()=>[],
      type: Array
    }
  },
  components: {

  },
  created () {

  },
  methods: {
    ...mapActions('votersQualification', [
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
        ids: this.ids,
        pass: false,
        reason: +this.selectItem
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
    },
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
