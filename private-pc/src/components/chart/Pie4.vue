<template>
  <div class="chart-box">
    <div class="img"></div>
    <div ref="myChart" class="chart"></div>
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
    echarts() {
      let sumValues = 0
      const legendData = this.data.map(obj => {
        sumValues += obj.value
        return obj.name
      })
      const colorArr = [
        {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 1,
          y2: 0,
          colorStops: [{
            offset: 0, color: '#f582b7' // 0% 处的颜色
          }, {
            offset: 1, color: '#f0519b' // 100% 处的颜色
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
            offset: 0, color: '#ff8f02' // 0% 处的颜色
          }, {
            offset: 1, color: '#fb5702' // 100% 处的颜色
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
            offset: 0, color: '#3c4dab' // 0% 处的颜色
          }, {
            offset: 1, color: '#24108d' // 100% 处的颜色
          }],
          global: false // 缺省为 false
        }
      ]

      let option = {
        tooltip: {
          formatter: function (params) {
            return `${params.value[2]}: ${params.value[0]} (${(params.value[1] * 100).toFixed(0)}%)`
          }
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
          // selectedMode: false
        },
        series: [
          {
            type: 'custom',
            name: this.data[0].name,
            coordinateSystem: 'none',
            renderItem: function (params, api) {
              const percent = api.value(1)
              return {
                type: 'arc',
                shape: {
                  cx: 130,
                  cy: 134,
                  r: 76,
                  r0: 0,
                  startAngle: Math.PI * 3 / 2,
                  endAngle: Math.PI * 2 * (1 - percent) - Math.PI / 2,
                  clockwise: false,
                },
                style: api.style({
                  fill: null,
                  lineWidth: 6,
                  lineCap: 'round'
                }),
                styleEmphasis: api.style({
                  fill: null,
                  lineWidth: 10
                })
              }
            },
            data: [{
              value: [this.data[0].value, this.data[0].value / sumValues, this.data[0].name],
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
            renderItem: function (params, api) {
              const percent = api.value(1)
              return {
                type: 'arc',
                shape: {
                  cx: 130,
                  cy: 134,
                  r: 62,
                  r0: 0,
                  startAngle: Math.PI * 3 / 2,
                  endAngle: Math.PI * 2 * (1 - percent) - Math.PI / 2,
                  clockwise: false,
                },
                style: api.style({
                  fill: null,
                  lineWidth: 6,
                  lineCap: 'round'
                }),
                styleEmphasis: api.style({
                  fill: null,
                  lineWidth: 10
                })
              }
            },
            data: [{
              value: [this.data[1].value, this.data[1].value / sumValues, this.data[1].name],
            }],
            itemStyle: {
              color: colorArr[1],
              borderColor: colorArr[1]
            }
          },
          {
            type: 'custom',
            name: this.data[2].name,
            coordinateSystem: 'none',
            renderItem: function (params, api) {
              const percent = api.value(1)
              return {
                type: 'arc',
                shape: {
                  cx: 130,
                  cy: 134,
                  r: 48,
                  r0: 0,
                  startAngle: Math.PI * 3 / 2,
                  endAngle: Math.PI * 2 * (1 - percent) - Math.PI / 2,
                  clockwise: false,
                },
                style: api.style({
                  fill: null,
                  lineWidth: 6,
                  lineCap: 'round'
                }),
                styleEmphasis: api.style({
                  fill: null,
                  lineWidth: 10
                })
              }
            },
            data: [{
              value: [this.data[2].value, this.data[2].value / sumValues, this.data[2].name],
            }],
            itemStyle: {
              color: colorArr[2],
              borderColor: colorArr[2]
            }
          },
          {
            type: 'custom',
            // name: this.data[0].name,
            blendMode: 'destination-out',
            z: 9,
            coordinateSystem: 'none',
            tooltip: {
              show: false,
              trigger: 'none'
            },
            renderItem: function (params, api) {
              return {
                type: 'polygon',
                shape: {
                  points: [[126, 0], [133, 0], [133, 134], [126, 134]]
                },
                style: api.style(),
              };
            },
            data: [0]
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
  height: 260px;
  width: 460px;
  position: relative;
}
.chart{
  height: 100%;
  width: 100%;
}
.img {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 260px;
  height: 260px;
  display: flex;
  align-content: center;
  justify-content: center;
  background: url("../../assets/img/7.png") center center no-repeat;
}
</style>
