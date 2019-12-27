<template>
  <div style="height:100%;" ref="myChart"></div>
</template>

<script>
export default {
  data() {
    return {
      handerList: [],
      nameList: []
    }
  },
  props: {
    list: {
      default: ()=>[],
      type: Array
    }
  },

  watch:{
    list(){
      if(this.list.length>0) {
        this.handerData()
        this.echarts()
      }

    }
  },
  created(){

  },
  mounted () {
    // 基于准备好的dom，初始化echarts实例
    this.myChart = echarts.init(this.$refs.myChart);
    window.onresize = this.myChart.resize;
    if(this.list.length>0) {
      this.handerData()
      this.echarts()
    }


  },
  methods:{

    echarts () {
      let option ={
        grid: {
          top: '20',
          containLabel: true,
          bottom: '30',
          left: '20',
          right:'20'
        },
        legend: {
          bottom: 10,
          left: "center",
          itemGap: 40,
          itemWidth: 20,
          itemHeight: 10,
          color: '#545454',
          fontSize: '16',
          textStyle: {
            fontSize: '16',
            color:'#545454'
          }
        },
        tooltip: {},
        dataset: {
          dimensions: this.nameList,
          source: this.handerList
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
            fontSize: '16'
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
            fontSize: '16'
          }
        },
        series: [
          {
            type: 'bar',
            barWidth: 10,
            color: new echarts.graphic.LinearGradient(
              0, 0, 0, 1,
              [{offset: 1, color: '#24108b'},{offset: 0.5, color: '#302f9b'},{offset: 0, color: '#3c4dab'}]
            ),
            itemStyle:{
              barBorderRadius: 4
            },
            barGap: 1
          },
          {
            type: 'bar',
            barWidth: 10,
            color: new echarts.graphic.LinearGradient(
              0, 0, 0, 1,
              [{offset: 1, color: '#f14294'},{offset: 0.5, color: '#ed7398'},{offset: 0, color: '#e8a39b'}]
            ),
            itemStyle:{
              barBorderRadius: 4
            },
            barGap: 1
          },
          {
            type: 'bar',
            barWidth: 10,
            color: new echarts.graphic.LinearGradient(
              0, 0, 0, 1,
              [{offset: 1, color: '#fbc34b'},{offset: 0, color: '#ff7b18'}]
            ),
            itemStyle:{
              barBorderRadius: 4
            },
            barGap: 1
          }
        ]
      };
      this.myChart.setOption(option)
    },
    handerData () {
      this.handerList = []
      this.nameList = ['product','总人口数','选民人数','登记成功人口数']
      let obj = {peopleNum:null,votersNum: null,regVotersNum: null}
      for(let i of this.list) {
        let item = []
        item.push(i.precinctName)
        for(let el in obj) {
          item.push(i[el])
        }
        this.handerList.push(item)
        console.log(122,this.handerList,i.precinctName)
      }

    }
  }
}
</script>

<style scoped>

</style>
