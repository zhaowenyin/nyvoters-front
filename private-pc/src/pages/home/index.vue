<template>
  <div class="view">
    <ul class="top-info">
      <li>
        <div class="small-text">总人口数</div>
        <div class="number">{{data.peopleNum}}</div>
      </li>
       <li>
        <div class="small-text">已登记选民数</div>
        <div class="number">{{data.regVotersNum	}}</div>
      </li>
      <li class="last">
        <div class="small-text">正式选民数</div>
        <div class="number">{{data.votersNum}}</div>
      </li>
    </ul>
    <div class="content-title">南阳选民统计图</div>
    <CenbterChart :data="data.votersCounts" height="300px"/>
    <Tabel/>
    <div class="content-title">XX选区登记情况综合统计</div>
    <el-row :gutter="20">
      <el-col :span="8" class="pie">
        <div class="text">登记类型</div>
        <Pie :data="data.registerTypeGraphs"/>
      </el-col>
      <el-col :span="8" class="pie">
        <div class="text">参选地</div>
        <Pie :data="data.candidateTypeGraphs"/>
      </el-col>
      <el-col :span="8" class="pie">
        <div class="text">采集方式</div>
        <Pie :data="data.idTypeGraphs"/>
      </el-col>
    </el-row>
    <el-row :gutter="20">
        <el-col :span="12" class="pie">
          <div class="text">对比不通过人次</div>
          <Pie :data="data.verifyFailGraphs"/>
        </el-col>
        <el-col :span="12" class="pie">
          <div class="text">未通过资格审查</div>
          <Pie :data="data.reviewFailGraphs"/>
        </el-col>
    </el-row>
  </div>
</template>
<script>
import { mapMutations } from 'vuex'
import CenbterChart from './CenbterChart'
import Tabel from './Tabel'
import Pie from './Pie'
import {getList} from './service.js'
export default {
  data () {
    return {
      list: [],
      data: {}

    }
  },
  computed: {

  },
  components: {
    CenbterChart,
    Pie,
    Tabel
  },
  created () {
    // 初始化清除数据
    this.clearState()
    this.Searchlist()
  },
  methods: {
    ...mapMutations('home', [
      'clearState'
    ]),
    async Searchlist() {
      const {data} = await getList()
      this.data = data.content
      console.log(this.data)
    }
  }
}
</script>
<style scoped>
  .view{
    padding: 24px 23px;
    /* height:100%; */
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
    /* height:400px; */
  }
  .text {
    text-align: center;
    font-size: 20px;
    margin: 10px;
  }
</style>
