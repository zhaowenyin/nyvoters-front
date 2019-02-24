<template>
  <el-dialog :visible="show" title="" :before-close="close">
    <el-form :model="form" label-width="90px" label-position="right">
      <el-form-item label="服务包名称:">
        <el-input maxlength="16"
                  v-model="form.name"
                  placeholder="请输入服务包名称" style="width: 200px;"></el-input>
      </el-form-item>
      <el-form-item label="服务包类型:">
        <el-radio-group v-model="form.type">
          <el-radio :label="1">全民服务包</el-radio>
          <el-radio :label="2">签约服务包</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="时间范围:">
        <el-date-picker
          v-model="time"
          type="daterange"
          range-separator="至"
          start-placeholder="开始时间"
          :picker-options="{disabledDate: disabledDate}"
          end-placeholder="结束时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="toEdit">{{type === 'create' ? '创建并进入编辑页面' : '复制并进入编辑页面'}}</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'create'
    }
  },
  data () {
    return {
      time: [],
      form: {
        name: '',
        type: '',
        startTime: '',
        endTime: ''
      }
    }
  },
  watch: {
    time (val) {
      if (val.length > 1) {
        this.form.startTime = val[0]
        this.form.endTime = val[1]
      }
    }
  },
  methods: {
    disabledDate (val) {
      const time = val.getTime()
      const now = +new Date(new Date().toLocaleDateString())
      return now > time
    },
    close () {
      this.$emit('update:show', false)
    },
    toEdit () {
      this.$router.push('/service/edit')
    }
  }
}
</script>
