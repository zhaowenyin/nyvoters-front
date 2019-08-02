<template>
  <el-dialog
    title="审核"
    :visible="visible"
    :close-on-click-modal="false"
    width="500px"
    :before-close="comfirmClose">
    <el-form
      label-width="110px"
      :model="form"
      :rules="rules"
      ref="form"
      class="login-form">
      <el-form-item
        label="不通过原因"
        prop="reason">
        <el-input
          type="textarea"
          :rows="4"
          placeholder="请填写审核不通过原因"
          v-model="form.reason">
        </el-input>
      </el-form-item>
    </el-form>
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
      form: {
        reason: ''
      },
      rules: {
        reason:[
          { required: true, message: '请填写审核不通过原因', trigger: 'blur' }
        ]
      },
      loading: false,
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
      if(!this.form.reason) {
        this.$notify({
          title: '',
          message: '请填写审核不通过原因！',
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
        pass: false,
        reason: this.form.reason
      }
      await throughTabel(params)
      this.close()
      this.getListData()
      this.loading = false
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
