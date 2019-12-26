<template>
  <div class="view-wrapper">
    <Pie1 :data="data"/>
    <div class="bottom-text">登记率=已登记人数/总选民数</div>
    <Pie2 :data="data2"/>
    <Pie3 :data="data3"/>
    <Pie4 :data="data4"/>
  </div>
</template>

<script>
import Pie1 from '../components/chart/Pie1'
import Pie2 from '../components/chart/Pie2'
import Pie3 from '../components/chart/Pie3'
import Pie4 from '../components/chart/Pie4'

export default {
  data () {
    return {
      data: [{
        value: 300,
        name: '已登记人数'
      },{
        value: 100,
        name: '未登记人数'
      }],
      data2: [{
        value: 300,
        name: '户籍地'
      },{
        value: 300,
        name: '现居地'
      },{
        value: 100,
        name: '单位'
      },{
        value: 100,
        name: '学校'
      },{
        value: 100,
        name: '其他'
      }],
      data3: [{
        value: 300,
        name: '男'
      },{
        value: 200,
        name: '女'
      }],
      data4: [{
        value: 300,
        name: '35岁以下'
      },{
        value: 200,
        name: '36-55岁'
      },{
        value: 100,
        name: '56岁以上'
      }]
    }
  },
  components: {
    Pie1,
    Pie2,
    Pie3,
    Pie4
  }
}
</script>
<style>
  body{
    background: #ddd
  }
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.bottom-text{
  text-align: center;
  font-size: 14px;
	color: #666666;
}
</style>
