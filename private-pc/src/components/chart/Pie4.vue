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
    this.myChart = echarts.init(this.$refs.myChart);
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
      let maxValue = 0
      this.data.forEach(obj => {
        sumValues += obj.value
        if (obj.value > maxValue) maxValue = obj.value
      })
      const colorArr = [
        {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 1,
          y2: 0,
          colorStops: [{
            offset: 0, color: '#3c4dab' // 0% 处的颜色
          }, {
            offset: 1, color: '#2a1d96' // 100% 处的颜色
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
            offset: 0, color: '#f26477' // 0% 处的颜色
          }, {
            offset: 1, color: '#eb4790' // 100% 处的颜色
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
            offset: 0, color: '#514daa' // 0% 处的颜色
          }, {
            offset: 1, color: '#dc5797' // 100% 处的颜色
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
            offset: 0, color: '#fcb474' // 0% 处的颜色
          }, {
            offset: 1, color: '#ed7d6c' // 100% 处的颜色
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
            offset: 0, color: '#f9c44b' // 0% 处的颜色
          }, {
            offset: 1, color: '#f9c44b' // 100% 处的颜色
          }],
          global: false // 缺省为 false
        }
      ]

      let startRadius = 76 * this.scale
      let endRadius = 34 * this.scale
      let diffRadius = this.data.length > 1 ? (startRadius - endRadius) / (this.data.length - 1) : 0



      const createSeries = this.data.map((obj, index) => {
        return {
          type: 'custom',
          name: obj.name,
          coordinateSystem: 'none',
          renderItem:  (params, api) => {
            const percent = api.value(0) / maxValue * 0.8
            return {
              type: 'arc',
              shape: {
                cx: 110 * this.scale,
                cy: 110 * this.scale,
                r: startRadius - diffRadius * index,
                r0: 0,
                startAngle: Math.PI * 3 / 2,
                endAngle: Math.PI * 2 * (1 - percent) - Math.PI / 2,
                clockwise: false,
              },
              style: api.style({
                fill: null,
                lineWidth: 6 * this.scale,
                lineCap: 'round'
              }),
              styleEmphasis: api.style({
                fill: null,
                lineWidth: 10 * this.scale
              })
            }
          },
          data: [{
            value: [obj.value, obj.value / sumValues, obj.name],
          }],
          itemStyle: {
            color: colorArr[index],
            borderColor: colorArr[index]
          }
        }
      })

      // createSeries.push({
      //   type: 'custom',
      //   // name: this.data[0].name,
      //   blendMode: 'destination-out',
      //   z: 9,
      //   coordinateSystem: 'none',
      //   tooltip: {
      //     show: false,
      //     trigger: 'none'
      //   },
      //   renderItem: function (params, api) {
      //     return {
      //       type: 'polygon',
      //       shape: {
      //         points: [[126, 0], [133, 0], [133, 134], [126, 134]]
      //       },
      //       style: api.style(),
      //     };
      //   },
      //   data: [0]
      // })
      let option = {
        tooltip: {
          formatter: function (params) {
            return `${params.value[2]}: ${params.value[0]} (${+(params.value[1] * 100).toFixed(2)}%)`
          }
        },
        series: createSeries,
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
    background: url("../../assets/img/7.png") center center no-repeat;
    background-size: 100% 100%;
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
      background-image: linear-gradient(90deg, #3c4dab, #2a1d96);
      border-radius: 3px;
      margin-right: 15px;
    }
    & .icon1 {
      background-image: linear-gradient(90deg, #f26477, #eb4790);
    }
    & .icon2 {
      background-image: linear-gradient(90deg, #514daa, #dc5797);
    }
    & .icon3 {
      background-image: linear-gradient(90deg, #fcb474, #ed7d6c);
    }
    & .icon4 {
      background-image: linear-gradient(90deg, #f9c44b, #f9c44b);
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
