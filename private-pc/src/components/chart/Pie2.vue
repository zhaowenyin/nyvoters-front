<template>
  <div class="pie-box">
    <div class="left">
      <div class="chart-box" :style="{width: 220 * scale + 'px', height: 220 * scale + 'px'}">
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
    this.echarts()
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
        seriesName: name
      })
    },
    clearHover(name) {
      this.myChart.dispatchAction({
        type: 'downplay',
        seriesName: name
      })
    },
    echarts() {
      let sumValues = 0
      this.data.forEach(obj => {
        sumValues += obj.value
      })
      const colorArr = [
        {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 1,
          y2: 0,
          colorStops: [{
            offset: 0, color: '#f9c44b' // 0% 处的颜色
          }, {
            offset: 1, color: '#f9c44b' // 100% 处的颜色
          }],
          global: false // 缺省为 false
        },
        {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 1,
          y2: 0,
          colorStops: [{
            offset: 0, color: '#3c4cab' // 0% 处的颜色
          }, {
            offset: 1, color: '#2b2097' // 100% 处的颜色
          }],
          global: false // 缺省为 false
        },
        {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 1,
          y2: 0,
          colorStops: [{
            offset: 0, color: '#534eaa' // 0% 处的颜色
          }, {
            offset: 1, color: '#d85697' // 100% 处的颜色
          }],
          global: false // 缺省为 false
        }
      ]

      let currentAngle = - Math.PI / 2
      let currentWidth = 20 * this.scale
      let currentR = 70 * this.scale
      const renderArr = this.data.map((obj, index) => {
        obj.percent = obj.value/sumValues
        obj.startAngle = currentAngle
        obj.endAngle = currentAngle + Math.PI * 2 * obj.percent
        obj.borderWidth = currentWidth
        obj.currentR = currentR
        obj.color = colorArr[index] || 'red'
        currentAngle = obj.endAngle
        currentWidth += 8 * this.scale
        currentR += 4 * this.scale
        return obj
      })


      const createSeries = renderArr.map(obj => {
        return {
          type: 'custom',
          name: obj.name,
          coordinateSystem: 'none',
          renderItem: (params, api) => {
            return {
              type: 'arc',
              shape: {
                cx: 110 * this.scale,
                cy: 110 * this.scale,
                r: obj.currentR,
                r0: 0,
                startAngle: obj.startAngle,
                endAngle: obj.endAngle,
                clockwise: true,
              },
              style: api.style({
                fill: null,
                lineWidth: obj.borderWidth
              }),
              styleEmphasis: api.style({
                fill: null,
                lineWidth: obj.borderWidth + 16
              })
            }
          },
          data: [{
            value: [obj.value, obj.percent, obj.name],
          }],
          itemStyle: {
            color: obj.color,
            borderColor: obj.color
          }
        }
      })

      // 中心裁切圆
      createSeries.push({
        type: 'custom',
        coordinateSystem: 'none',
        tooltip: {
          show: false,
          trigger: 'none'
        },
        blendMode: 'destination-out',
        renderItem: () => {
          return {
            type: 'arc',
            shape: {
              cx: 110 * this.scale,
              cy: 110 * this.scale,
              r: 60 * this.scale,
              r0: 0,
              startAngle: 0,
              endAngle: Math.PI * 2,
              clockwise: true,
            }
          }
        },
        z: 999,
        data: [0]
      })

      let option = {
        tooltip: {
          formatter: function (params) {
            return `${params.value[2]}: ${params.value[0]} (${+(params.value[1] * 100).toFixed(2)}%)`
          }
        },
        series: createSeries
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
    background: url("../../assets/img/heart.png") center center no-repeat;
  }
  .chart{
    height: 100%;
    width: 100%;
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
      background-image: linear-gradient(90deg, #f9c44b, #f9c44b);
      border-radius: 3px;
      margin-right: 15px;
    }
    & .icon1 {
      background-image: linear-gradient(90deg, #3c4cab, #2b2097);
    }
    & .icon2 {
      background-image: linear-gradient(90deg, #534eaa, #d85697);
    }
    & .text{
      flex: 1;
    }
    & .name{
      margin-right: 19px;
    }
  }
</style>
