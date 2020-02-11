<template>
  <div class="chart-box">
    <div class="text-box">
      <span class="s1">{{percent}}</span>
      <span class="s2">%</span>
    </div>
    <div ref="myChart" class="chart"></div>
    <ul class="legend-ul">
      <li
        v-for="(item, index) in data"
        :key="index"
        @mouseenter="hover(item.name)"
        @mouseleave="clearHover(item.name)"></li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      percent: 0
    }
  },
  props: {
    data: {
      default: () => [],
      type: Array
    }
  },
  watch: {
    data() {
      this.echarts();
    }
  },
  created() {},
  mounted() {
    // 基于准备好的dom，初始化echarts实例
    this.myChart = echarts.init(this.$refs.myChart);
    this.echarts();
  },
  methods: {
    hover(name) {
      this.myChart.dispatchAction({
        type: 'highlight',
        name
      })
    },
    clearHover(name) {
      this.myChart.dispatchAction({
        type: 'downplay',
        name
      })
    },
    echarts() {
      const legendData = this.data.map(obj => obj.name)
      const oneValue = this.data[0].value
      const twoValue = this.data[1].value
      const percent =(oneValue + twoValue) ? oneValue / (oneValue + twoValue) : 0
      this.percent = +(percent * 100).toFixed(2)
      const startAngle = 270 - (1 - percent) * 180
      const startAnglePI = percent * Math.PI

      const calcuAngles = (dotSum, percent) => {
        const dotArr = []
        const dotAngle = Math.PI * 2 / dotSum
        let currentAngle = 0
        for(let i = 0; i <= dotSum * percent; i++) {
          dotArr.push({
            value: [currentAngle]
          })
          currentAngle = currentAngle + dotAngle
        }
        return dotArr
      }
      let option = {
        tooltip: {
          formatter: "{b}: {c} ({d}%)"
        },
        legend: {
          orient: 'vertical',
          left: 'right',
          top: 'middle',
          align: 'left',
          itemGap: 16,
          itemWidth: 20,
          itemHeight: 10,
          textStyle: {
            color: '#666',
            fontSize: 16,
            padding: [0, 0, 0, 14]
          },
          data: legendData,
          selectedMode: false
        },
        series: [
          {
            type:'pie',
            center: [110, 110],
            radius: [70, 85],
            startAngle: startAngle,
            avoidLabelOverlap: false,
            label: {
              show: false
            },
            labelLine: {
              show: false
            },
            data:[
              {
                value: oneValue,
                name: this.data[0].name,
                itemStyle: {
                  color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 1,
                    y2: 0,
                    colorStops: [{
                      offset: 0, color: '#4f4ca9' // 0% 处的颜色
                    }, {
                      offset: 1, color: '#de4396' // 100% 处的颜色
                    }],
                    global: false // 缺省为 false
                  }
                }
              },{
                value: twoValue,
                name: this.data[1].name,
                itemStyle: {
                  color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 1,
                    y2: 0,
                    colorStops: [{
                      offset: 0, color: '#ff9857' // 0% 处的颜色
                    }, {
                      offset: 1, color: '#f9c44b' // 100% 处的颜色
                    }],
                    global: false // 缺省为 false
                  }
                }
              }
            ]
          },
          {
            type: 'custom',
            // name: this.data[0].name,
            coordinateSystem: 'none',
            tooltip: {
              show: false,
              trigger: 'none'
            },
            renderItem: function (params, api) {
              return {
                type: 'circle',
                shape: {
                  cx: 0,
                  cy: 0,
                  r: 1,
                },
                origin: [0, 92],
                rotation: api.value(0) - startAnglePI,
                position: [110, 18],
                style: api.style({
                  fill: '#f36d76'
                }),
              };
            },
            data: calcuAngles(90, percent)
          }
        ]
      }
      this.myChart.setOption(option)
    }
  }
};
</script>

<style scoped>
.chart-box{
  height: 220px;
  width: 460px;
  /* height: 100%;
  width: 100%; */
  position: relative;
}
.chart{
  height: 100%;
  width: 100%;
}
.text-box{
  position: absolute;
  top: 0px;
  left: 0px;
  width: 220px;
  height: 220px;
  text-align: center;
  line-height: 220px;
  color: #fb5c02;
  & .s1{
    font-size: 46px;
  }
  & .s2{
    font-size: 26px;
  }
}
.legend-ul{
  position: absolute;
  top: 50%;
  right: 0px;
  transform: translate(0, -50%);
  cursor: pointer;
  & li{
    width: 130px;
    height: 20px;
    margin: 12px 0px;
  }
}
</style>
