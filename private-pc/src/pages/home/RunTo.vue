<template>
    <div style="height:100%;" ref="myChart"></div>
</template>

<script>
export default {
  name: "BarChart",
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
        this.echarts();
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
      this.echarts();
    }
  },
  methods:{

    echarts () {
      let option ={
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
          orient: 'vertical',
          right: 10,
          data:this.nameList,
          itemWidth: 10,
          itemHeight: 5,
          color: '#545454',
          fontSize: 10
        },

        calculable : true,
        series: [
          {
            name:'半径模式',
            type:'pie',
            radius : [20, 70],
            center : ['50%', '50%'],
            roseType : 'radius',
            label: {
              normal: {
                show: false
              },
              emphasis: {
                show: true
              }
            },
            lableLine: {
              normal: {
                show: false
              },
              emphasis: {
                show: true
              }
            },
            data: this.handerList
          }
        ]
      };
      this.myChart.setOption(option)
    },
    handerData () {
      this.handerList = []
      this.nameList = []
      for(let i of this.list) {
        i.name = i.label
        this.nameList.push(i.name)
        this.handerList.push(i)
      }
    }
  }
}
</script>

<style scoped>

</style>
