<template>
  <el-dialog
    title="处理"
    :visible="visible"
    width="500px"
    :before-close="comfirmClose">
    <el-form
      label-width="110px"
      :model="form"
      :rules="rules"
      ref="form"
      class="login-form">
      <el-form-item
        label="处理结论"
        prop="reason">
        <el-radio-group v-model="form.conclusion">
          <el-radio :label="1">接受</el-radio>
          <el-radio :label="2">驳回</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item
        label="处理意见"
        prop="reason">
        <el-input
          type="textarea"
          :rows="4"
          placeholder="请填写处理意见"
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
        reason: '',
        conclusion: ''
      },
      rules: {
        reason:[
          { required: true, message: '请填写处理意见', trigger: 'blur' }
        ],
        conclusion:[
          { required: true, message: '请选择处理结论', trigger: 'blur' }
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
    ...mapActions('votersAppealHome', [
      'getListData'
    ]),
    close () {
      this.$emit('update:visible', false)
    },
    submitForm () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.sumitData()
        }
      })
    },
    async sumitData () {
      this.loading = true
      let params = {
        id: this.id,
        pass: false,
        reason: this.form.reason,
        conclusion: this.form.conclusion
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
    }
  }
}
</script>
<style scoped>

</style>
<style>
  .table-obj .el-form-item {
    margin: 15px 0;
  }
</style>
