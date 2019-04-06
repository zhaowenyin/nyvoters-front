<template>
  <el-dialog
    title="审核"
    :visible="visible"
    width="200px"
    :before-close="comfirmClose">
    <el-form
      label-width="110px"
      :model="form"
      :rules="rules"
      ref="form"
      class="login-form">
      <el-form-item
        label="不通过原因"
        prop="phoneNum">
        <el-input
          placeholder="请填写电话号码"
          v-model="phoneNum">
        </el-input>
      </el-form-item>
    </el-form>
     <div
        slot="footer"
        class="footer">
        <el-button
          @click="bindPhone()"
          size="medium"
          :loading="loading"
          type="primary">确定</el-button>
      </div>
  </el-dialog>
</template>
<script>
import {bindPhone} from './service.js'
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      phoneNum: '',
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
    async bindPhone() {
      this.loading = true
      const {data} = await bindPhone({phoneNum: this.phoneNum})
      this.data = data.content
      this.loading = false
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
