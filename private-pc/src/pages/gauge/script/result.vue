<template>
  <div class="center-view">
    <el-card class="card">
      <el-form :model="renderTree">
        <el-form-item
          prop="name"
          :rules="{
            required: true, validator: nameVali, trigger: 'blur'
          }">
          <el-input
            @input="nameInput"
            v-model="renderTree.script_name"
            placeholder="请输入脚本名称"
            maxlength="16"></el-input>
        </el-form-item>
        <el-form-item prop="script" :rules="{required: true, message: '请输入脚本'}">
          <el-input
            v-model="renderTree.script"
            placeholder="请输入脚本"
            type="textarea" :rows="28"></el-input>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>
import {mapState} from 'vuex'
export default {
  data () {
    return {}
  },
  computed: {
    ...mapState('gauge', {
      renderTree: state => state.renderTree
    })
  },
  methods: {
    nameInput (value) {
      setTimeout(() => {
        this.renderTree.script_name = value.replace(/\s/g, '')
      })
    },
    nameVali (rule, value, callback) {
      if (!value.length) {
        callback(new Error('脚本名称不能为空'))
      } else if (/select|update|delete|exec|count|'|"|=|;|>|<|%/gi.test(value)) {
        callback(new Error('请勿输入非法字符和SQL关键字！'))
      } else {
        callback()
      }
    }
  }
}
</script>
<style scoped>
  .center-view{
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  .card {
    height: 100%;
    overflow: auto;
  }
  .option-box {
    margin-bottom: 10px;
  }
</style>
