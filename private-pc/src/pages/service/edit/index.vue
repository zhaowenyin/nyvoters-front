<template>
  <div class="view">
    <div class="top">
      <el-form :model="serviceBagEntity" :inline="true" class="top-form">
        <el-form-item>
          <el-input
            v-model="serviceBagEntity.name"
            readonly
            maxlength="16"
            style="width: 240px;"
            placeholder="请输入服务包名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-date-picker
            v-model="time"
            type="daterange"
            :picker-options="{disabledDate: disabledDate}"
            range-separator="至"
            start-placeholder="开始时间"
            style="width:380px;"
            end-placeholder="结束时间"></el-date-picker>
        </el-form-item>
        <el-form-item label="更新时间:">
          20181018 12:54
        </el-form-item>
        <el-form-item label="服务包类型:">
          <el-radio-group v-model="type">
            <el-radio :label="1">全民服务包</el-radio>
            <el-radio :label="2">签约服务包</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">保存</el-button>
          <el-button>返回</el-button>
        </el-form-item>
      </el-form>
    </div>
    <center></center>
  </div>
</template>
<script>
import Center from './center'
import {mapState} from 'vuex'
export default {
  props: {
    state: {
      type: String,
      default: 'off'
    }
  },
  components: {
    Center
  },
  data () {
    return {
      time: [],
      type: 1
    }
  },
  watch: {
    type (val) {
      this.serviceBagEntity.need_sign = val === 2
    },
    time (val) {
      if (val.length > 1) {
        this.serviceBagEntity.validity_begin = +val[0]
        this.serviceBagEntity.validity_end = +val[1]
      } else {
        this.serviceBagEntity.validity_begin = ''
        this.serviceBagEntity.validity_end = ''
      }
    }
  },
  computed: {
    ...mapState('service', {
      serviceBagEntity: state => state.serviceBagEntity
    })
  },
  methods: {
    disabledDate (val) {
      const time = val.getTime()
      const now = +new Date(new Date().toLocaleDateString())
      return now > time
    }
  }
}
</script>
<style scoped>
  .view {
    display: flex;
    flex-direction: column;
    padding: 20px;
    height: 100%;
  }
  .top {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  .top-form {
    width: 100%;
  }
</style>
