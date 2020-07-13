<template>
  <div class="pie-box">
    <div class="man" @mouseenter="hover(data[0].name)" @mouseleave="clearHover(data[0].name)">
      <p>{{data[0].name}}</p>
      <p>{{data[0].value}}人</p>
      <p>{{+(percent1 * 100).toFixed(2)}}%</p>
      <img src="../../assets/img/3.png">
    </div>
    <div class="chart-box" :style="{width: 360 * scale + 'px', height: 220 * scale + 'px'}">
      <div ref="myChart" class="chart"></div>
    </div>
    <div class="woman" @mouseenter="hover(data[1].name)" @mouseleave="clearHover(data[1].name)">
      <p>{{data[1].name}}</p>
      <p>{{data[1].value}}人</p>
      <p>{{+(percent2 * 100).toFixed(2)}}%</p>
      <img src="../../assets/img/4.png">
    </div>
  </div>
</template>

<script>
import { get_scale } from '../../utils/format'

export default {
  data() {
    return {
      percent1: 0,
      percent2: 0,
      scale: 1
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
      this.init_echart()
    }
  },
  created() {},
  mounted() {
    // 基于准备好的dom，初始化echarts实例
    this.myChart = echarts.init(this.$refs.myChart);
    this.init_echart()
    window.addEventListener('resize', () => {
      this.init_echart()
    })
  },
  methods: {
    init_echart () {
      this.scale = get_scale()
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
      const sumValues = this.data[0].value + this.data[1].value
      const percent1 = sumValues ? this.data[0].value / sumValues : 0
      const percent2 = sumValues ? this.data[1].value / sumValues : 0
      this.percent1 = percent1
      this.percent2 = percent2
      const colorArr = [
        {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [{
            offset: 0, color: '#f14294' // 0% 处的颜色
          }, {
            offset: 1, color: '#3c4dab' // 100% 处的颜色
          }],
          global: false // 缺省为 false
        },
        {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [{
            offset: 0, color: '#3c4dab' // 0% 处的颜色
          }, {
            offset: 1, color: '#f14294' // 100% 处的颜色
          }],
          global: false // 缺省为 false
        }
      ]

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
          formatter: function (params) {
            return `${params.value[2]}: ${params.value[0]} (${+(params.value[1] * 100).toFixed(2)}%)`
          }
        },
        series: [
          {
            type: 'custom',
            name: this.data[0].name,
            coordinateSystem: 'none',
            renderItem: (params, api) => {
              if (!api.value(0)) return null
              const percent = api.value(1)
              let startAngle =  Math.PI - Math.PI * percent
              let endAngle = Math.PI * 2 * percent + startAngle
              return {
                type: 'arc',
                shape: {
                  cx: 180 * this.scale,
                  cy: 110 * this.scale,
                  r: 60 * this.scale,
                  r0: 0,
                  startAngle,
                  endAngle,
                  clockwise: true,
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
              value: [this.data[0].value, percent1 , this.data[0].name],
            }],
            itemStyle: {
              color: colorArr[0],
              borderColor: colorArr[0]
            }
          },
          {
            type: 'custom',
            name: this.data[1].name,
            coordinateSystem: 'none',
            renderItem: (params, api) => {
              if (!api.value(0)) return null
              const percent = api.value(1)
              let startAngle =  Math.PI *  2 - Math.PI * percent
              let endAngle = Math.PI * 2 * percent + startAngle
              return {
                type: 'arc',
                shape: {
                  cx: 180 * this.scale,
                  cy: 110 * this.scale,
                  r: 45 * this.scale,
                  r0: 0,
                  startAngle,
                  endAngle,
                  clockwise: true,
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
              value: [this.data[1].value, percent2 , this.data[1].name],
            }],
            itemStyle: {
              color: colorArr[1],
              borderColor: colorArr[1]
            }
          },
          {
            type: 'custom',
            coordinateSystem: 'none',
            tooltip: {
              show: false,
              trigger: 'none'
            },
            renderItem: (params, api) => {
              if (!api.value(0)) return null
              return {
                type: 'polygon',
                shape: {
                  points: [[0, 0], [2, 0], [1.5, 6], [0.5, 6]]
                },
                origin: [0, 75 * this.scale],
                rotation: api.value(0),
                position: [180 * this.scale, 35 * this.scale],
                style: api.style({
                  fill: '#3c4dab'
                })
              };
            },
            data: calcuAngles(90, percent1)
          },
          {
            type: 'custom',
            z: 9,
            coordinateSystem: 'none',
            tooltip: {
              show: false,
              trigger: 'none'
            },
            renderItem: (params, api) => {
              if (!api.value(0)) return null
              return {
                type: 'polygon',
                shape: {
                  points: [[0, 0], [2, 0], [1.5, 6], [0.5, 6]]
                },
                origin: [0, 75 * this.scale],
                rotation: api.value(0) + Math.PI * 2 * percent1,
                position: [180 * this.scale, 35 * this.scale],
                style: api.style({
                  fill: '#f14294'
                }),
              };
            },
            data: calcuAngles(90, percent2)
          }
        ]
      }
      this.myChart.setOption(option)
    }
  }
};
</script>

<style scoped>
.pie-box {
  display: flex;
  align-items: center;
  justify-content: center;
}
.chart-box{
  height: 220px;
  width: 360px;
  position: relative;
  background: url("../../assets/img/8.png") center center no-repeat;
  background-size: 100% 100%;
}
.chart{
  height: 220px;
  width: 360px;
}
.man, .woman{
  margin-top: -12px;
  padding: 22px 12px 16px;
  border-radius: 6px;
  border: 1px solid rgba(221,221,221,0.5);
  color: #7e7e7e;
  font-size: 16px;
  position: relative;
  & img{
    position: absolute;
    top: 11px;
    right: 14px;
  }
  &:hover{
    cursor: pointer;
    color: #333;
    border: 1px solid rgba(221,221,221,1);
  }
}
.woman {
  border: 1px solid rgba(224,67,150,0.3);
  &:hover{
    cursor: pointer;
    color: #333;
    border: 1px solid rgba(224,67,150,1);
  }
}
</style>
