<template>
  <div style="height:100%; width: 100%;" ref="myChart"></div>
</template>

<script>
export default {
  data() {
    return {
      handerList: [],
      nameList: [],
      adcode_index: null
    }
  },
  props: {
    list: {
      default: ()=>[],
      type: Array
    },
    obj: {
      default: null,
      type: null
    }
  },

  watch:{
    list(){
      if(this.list.length>0) {
        this.handerData()
        this.echarts()
      }

    },
    obj() {
      let index = 0
      let code = this.obj.adcode + '000000'
      this.myChart.dispatchAction({
        type: 'downplay',
        seriesIndex: [0,1,2],
        dataIndex:  this.adcode_index
      })
      for(let i of this.list) {
        if(i.precinctCode === code) {
          this.adcode_index = index
          this.myChart.dispatchAction({
            type: 'highlight',
            seriesIndex: [0,1,2],
            dataIndex:  this.adcode_index
          })
          break
        }
        index ++
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
          top: '30',
          containLabel: true,
          bottom: '50',
          left: '20',
          right:'20'
        },
        legend: {
          bottom: 10,
          left: "center",
          itemGap: 80,
          itemWidth: 20,
          itemHeight: 10,
          color: '#545454',
          fontSize: '16',
          textStyle: {
            color: '#666',
            fontSize: 16,
            padding: [0, 0, 0, 14]
          },
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
            focusNodeAdjacency: true,
            barWidth: 10,
            color: new echarts.graphic.LinearGradient(
              0, 0, 0, 1,
              [{offset: 1, color: '#24108b'},{offset: 0.5, color: '#302f9b'},{offset: 0, color: '#3c4dab'}]
            ),
            itemStyle:{
              barBorderRadius: 4,
              emphasis: {
                borderColor: '#24108b',
                borderWidth: 4,
                borderType: 'solid',
              }
            },
            barGap: 1,
            barMinHeight: 8
          },
          {
            type: 'bar',
            focusNodeAdjacency: true,
            barWidth: 10,
            color: new echarts.graphic.LinearGradient(
              0, 0, 0, 1,
              [{offset: 1, color: '#f14294'},{offset: 0.5, color: '#ed7398'},{offset: 0, color: '#e8a39b'}]
            ),
            itemStyle:{
              barBorderRadius: 4,
              emphasis: {
                borderColor: '#f14294',
                borderWidth: 4,
                borderType: 'solid',
              }
            },
            barGap: 1,
            barMinHeight: 8
          },
          {
            type: 'bar',
            focusNodeAdjacency: true,
            barWidth: 10,
            color: new echarts.graphic.LinearGradient(
              0, 0, 0, 1,
              [{offset: 1, color: '#fbc34b'},{offset: 0, color: '#ff7b18'}]
            ),
            itemStyle:{
              barBorderRadius: 4,
              emphasis: {
                borderColor: '#fbc34b',
                borderWidth: 4,
                borderType: 'solid',
              }
            },
            barGap: 1,
            barMinHeight: 8
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
      }

    }
  }
}
</script>

<style scoped>

</style>
