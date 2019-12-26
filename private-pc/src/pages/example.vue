<template>
  <div class="view-wrapper">
    <Pie1 :data="data"/>
    <div class="bottom-text">登记率=已登记人数/总选民数</div>
    <Pie2 :data="data2"/>
  </div>
</template>

<script>
import Pie1 from '../components/chart/Pie1'
import Pie2 from '../components/chart/Pie2'

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
      }]
    }
  },
  components: {
    Pie1,
    Pie2
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
