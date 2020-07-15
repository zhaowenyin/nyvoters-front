<template>
  <div class="pie-box">
    <div class="left">
      <div class="chart-box" :style="{width: 220 * scale + 'px', height: 220 * scale + 'px'}">
        <div class="text-box">
          <span class="s1" :style="{fontSize: 46 * scale + 'px'}">{{percent}}</span>
          <span class="s2" :style="{fontSize: 26 * scale + 'px'}">%</span>
        </div>
        <div ref="myChart" class="chart"></div>
      </div>
    </div>
    <ul
      class="legend-ul"
      :style="{fontSize: 16 * font_scale + 'px'}">
      <li
        v-for="(item, index) in data"
        :key="index"
        @mouseenter="hover(item.name)"
        @mouseleave="clearHover(item.name)">
        <div :class="['icon', 'icon'+index]"></div>
        <div class="text">
          <div class="name">{{item.name}}</div>
          <div>{{item.value}}人</div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      percent: 0,
      scale: 1,
      font_scale: 1
    }
  },
  props: {
    data: {
      default: () => [],
      type: Array
    },
    map_show: {
      default: true,
      type: Boolean
    }
  },
  watch: {
    data() {
      this.init_echart();
    }
  },
  created() {},
  mounted() {
    // 基于准备好的dom，初始化echarts实例
    this.myChart = echarts.init(this.$refs.myChart)
    this.$once('hook:beforeDestroy', () => {
      this.myChart.clear()
      echarts.dispose(this.myChart)
    })
    this.init_echart()
    window.addEventListener('resize', () => {
      this.init_echart()
    })
  },
  methods: {
    init_echart () {
      let body_width = document.body.clientWidth
      this.scale = this.map_show ? 0.8 : 1
      this.font_scale = 1
      if (body_width <= 1280) {
        this.scale = 0.6
        this.font_scale = 0.6
      } else if (body_width <= 1440) {
        this.scale = 0.8
      } else if (body_width <= 1600) {
        this.scale = 1
      }
      this.$nextTick(() => {
        this.myChart.resize()
        this.echarts()
      })
    },
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
      // const legendData = this.data.map(obj => obj.name)
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
        series: [
          {
            type:'pie',
            center: ['50%', '50%'],
            radius: [70 * this.scale, 85 * this.scale],
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
            coordinateSystem: 'none',
            tooltip: {
              show: false,
              trigger: 'none'
            },
            renderItem: (params, api) => {
              return {
                type: 'circle',
                shape: {
                  cx: 0,
                  cy: 0,
                  r: 0.5,
                },
                origin: [0, 92 * this.scale],
                rotation: api.value(0) - startAnglePI,
                position: [110 * this.scale, 18 * this.scale],
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
  .pie-box{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    & .left{
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  .chart-box {
    position: relative;
  }
  .chart{
    height: 100%;
    width: 100%;
  }
  .text-box{
    position: absolute;
    top: 50%;
    width: 100%;
    transform: translate(0, -50%);
    text-align: center;
    color: #fb5c02;
  }
  .legend-ul{
    cursor: pointer;
    color: #666666;
    font-size: 16px;
    flex: 1;
    & li{
      margin: 12px 0px;
      /* border: 1px solid #00f; */
      display: flex;
      align-items: center;
    }
    & .icon {
      width: 20px;
      height: 10px;
      background-image: linear-gradient(90deg, #4f4ca9, #de4396);
      border-radius: 3px;
      margin-right: 15px;
    }
    & .icon1 {
      background-image: linear-gradient(90deg, #ff9857, #f9c44b);
    }
    & .text{
      flex: 1;
      display: flex;
      flex-wrap: wrap;
    }
    & .name{
      margin-right: 19px;
    }
  }
</style>
