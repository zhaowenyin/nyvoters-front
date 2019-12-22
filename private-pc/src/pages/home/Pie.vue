<template>
    <div style="height:100%;" ref="myChart"></div>
</template>

<script>
export default {
  name: "BarChart",
  data() {
    return {
      titles:[],
      arr1:[],
      arr2:[],
      y1Max:0,
      y2Max:0,
      isEmpty:true,
      emptyClassName:''
    }
  },
  props: {
    colors: {
      default: ()=>[],
      type: Array
    },
    name: {
      default: '',
      type: String
    },
    list: {
      default: ()=>[],
      type: Array
    },
    yTitles:{
      default:()=>['',''],
      type: Array
    }
  },
  watch:{
    list(){
      this.echarts();
    }
  },
  created(){
  },
  mounted () {
    // 基于准备好的dom，初始化echarts实例
    this.myChart = echarts.init(this.$refs.myChart);
    window.onresize = this.myChart.resize;
    this.echarts()
  },
  methods:{

    echarts () {
      let option ={
        legend: {
          bottom: 10,
          left: "center",
          itemGap: 76,
          itemWidth: 10,
          itemHeight: 5,
          color: '#545454',
          fontSize: 10
        },
        tooltip: {},
        dataset: {
          dimensions: ['product', '2015', '2016', '2017'],
          source: [
            {product: 'Matcha Latte', '2015': 43.3, '2016': 85.8, '2017': 93.7},
            {product: 'Milk Tea', '2015': 83.1, '2016': 73.4, '2017': 55.1},
            {product: 'Cheese Cocoa', '2015': 86.4, '2016': 65.2, '2017': 82.5},
            {product: 'Walnut Brownie', '2015': 72.4, '2016': 53.9, '2017': 39.1}
          ]
        },
        xAxis: {
          type: 'category',
          axisLine: {
            lineStyle: {
              color: '#ff9c5a',
            }
          },
          splitLine: {
            lineStyle: {
              color: '#ff9c5a',
            },
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            color: ' #8b8b8b',
            fontSize: 10
          }
        },
        yAxis: {
          splitLine: {
            lineStyle: {
              color: '#ff9c5a',
            }
          },
          axisTick: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: '#ff9c5a',
            }
          },
          axisLabel: {
            color: ' #8b8b8b',
            fontSize: 10
          }
        },
        series: [
          {
            type: 'bar',
            barWidth: 5,
            color: new echarts.graphic.LinearGradient(
              0, 0, 0, 1,
              [{offset: 1, color: '#24108b'},{offset: 0.5, color: '#302f9b'},{offset: 0, color: '#3c4dab'}]
            ),
            itemStyle:{
              barBorderRadius: 2
            },
            barGap: 1
          },
          {
            type: 'bar',
            barWidth: 5,
            color: new echarts.graphic.LinearGradient(
              0, 0, 0, 1,
              [{offset: 1, color: '#f14294'},{offset: 0.5, color: '#ed7398'},{offset: 0, color: '#e8a39b'}]
            ),
            itemStyle:{
              barBorderRadius: 2
            },
            barGap: 1
          },
          {
            type: 'bar',
            barWidth: 5,
            color: new echarts.graphic.LinearGradient(
              0, 0, 0, 1,
              [{offset: 1, color: '#fbc34b'},{offset: 0, color: '#ff7b18'}]
            ),
            itemStyle:{
              barBorderRadius: 2
            },
            barGap: 1
          }
        ]
      };
      this.myChart.setOption(option)
    },
  }
}
</script>

<style scoped>

</style>
