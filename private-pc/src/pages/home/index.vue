<template>
  <div class="view">
    <ul class="top-info">
      <li>
        <div class="small-text">总人口数</div>
        <div class="number">11,029,850</div>
      </li>
       <li>
        <div class="small-text">已登记选民数</div>
        <div class="number">11,029,850</div>
      </li>
      <li class="last">
        <div class="small-text">正式选民数</div>
        <div class="number">11,029,850</div>
      </li>
    </ul>
    <div class="content-title">南阳选民统计图</div>
    <CenbterChart style="height: 280px;"/>
    <el-row :gutter="20">
      <el-col :span="8" class="pie"><Pie/></el-col>
      <el-col :span="8" class="pie"> <Pie/></el-col>
      <el-col :span="8" class="pie"> <Pie/></el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12" class="pie"><Pie/></el-col>
      <el-col :span="12" class="pie"><Pie/></el-col>
    </el-row>
  </div>
</template>
<script>
import { mapMutations } from 'vuex'
import { formatDate } from '../../utils/format.js'
import CenbterChart from './CenbterChart'
import Pie from './Pie'

export default {
  data () {
    return {
      list: []
    }
  },
  computed: {

  },
  components: {
    CenbterChart,
    Pie
  },
  created () {
    // 初始化清除数据
    this.clearState()
  },
  methods: {
    ...mapMutations('taskManage', [
      'clearState'
    ]),
    formatDate
  }
}
</script>
<style scoped>
  .view{
    padding: 24px 23px;
    height:100%;
    width: 100%;
    color: #000000;
    & .top-info {
      display: flex;
      & li {
        height: 183px;
        border: solid 1px #dddddd;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        flex: 1;
        margin-right: 51px;
      }
      & .last {
         margin-right: 0px;
      }
    }
  }
  .small-text {
    font-size: 20px;
    line-height: 25px;
    margin-bottom: 25px;
  }
  .number {
    font-size: 36px;
    line-height: 25px;

  }
  .content-title {
    font-size: 20px;
	line-height: 25px;
    padding: 34px 0 24px 0;
    text-align: center;
  }
  .pie {
    height:300px;
  }
</style>
