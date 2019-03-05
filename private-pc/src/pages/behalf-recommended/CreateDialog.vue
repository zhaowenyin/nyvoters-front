<template>
  <el-dialog
    title="在线登记"
    :visible="visible"
    width="820px"
    :before-close="comfirmClose">
    <el-form
      label-width="100px"
      :model="formData"
      ref="loginForm"
      class="login-form">
      <el-form-item
        label="用户名："
        :rules="{
          required: true, message: '用户名不能为空', trigger: 'blur'
        }"
        prop="name">
        <el-input
          placeholder="请输入账号/手机号"
          :maxlength="18"
          class="item"
          v-model="formData.name" />
      </el-form-item>
    </el-form>
    <div
      slot="footer"
      class="footer">
      <el-button
        @click="submitForm()"
        size="medium"
        type="primary">确定</el-button>
    </div>
  </el-dialog>
</template>
<script>
export default {
  data () {
    return {
      formData: {
        name: ''
      }
    }
  },
  props:{
    visible: {
      default: false,
      type: Boolean
    }
  },
  created () {
  },
  methods: {
    close () {
      this.$emit('update:visible', false)
    },
    submitForm () {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          console.log(valid)
        }
      })
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

</style>
