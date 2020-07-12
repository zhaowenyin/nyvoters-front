<template>
  <div class="view-wrapper">
    <Pie1 :data="data"/>
    <Pie2 :data="data2"/>
    <Pie3 :data="data3"/>
    <Pie4 :data="data4"/>
    <canvas ref="myChart" width="500" height="500"></canvas>
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
        value: 200,
        name: '未登记人数'
      }],
      data4: [{
        value: 300,
        name: '户籍地'
      },{
        value: 301,
        name: '居住地'
      },{
        value: 99,
        name: '单位'
      },{
        value: 200,
        name: '学校'
      },{
        value: 300,
        name: '其他'
      }],
      data3: [{
        value: 601,
        name: '男'
      },{
        value: 399,
        name: '女'
      }],
      data2: [{
        value: 300,
        name: '35岁以下'
      },{
        value: 200,
        name: '36-55岁'
      },{
        value: 300,
        name: '56岁以上'
      }]
    }
  },
  components: {
    Pie1,
    Pie2,
    Pie3,
    Pie4
  },
  mounted() {
    let myChart = this.$refs.myChart
    console.log(myChart)
    let ctx = myChart.getContext('2d');
    ctx.beginPath();
    ctx.arc(75, 75, 50, 0, Math.PI / 2, false);
    ctx.stroke();
  }
}
</script>
<style>
  body{
    background: #fff
  }
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
