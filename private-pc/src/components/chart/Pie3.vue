<template>
  <div class="div-box">
    <div class="man" @mouseenter="hover(data[0].name)" @mouseleave="clearHover(data[0].name)">
      <p>{{data[0].name}}</p>
      <p>{{data[0].value}}人</p>
      <p>{{+(percent1 * 100).toFixed(2)}}%</p>
      <img src="../../assets/img/3.png">
    </div>
    <div class="chart-box">
      <div class="img"></div>
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
export default {
  data() {
    return {
      percent1: 0,
      percent2: 0
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
        // legend: {
        //   orient: 'vertical',
        //   left: 'right',
        //   top: 'middle',
        //   align: 'left',
        //   itemGap: 16,
        //   itemHeight: 10,
        //   textStyle: {
        //     color: '#666',
        //     fontSize: 16,
        //     padding: [0, 0, 0, 14]
        //   },
        //   data: legendData,
        //   // selectedMode: false
        // },
        series: [
          {
            type: 'custom',
            name: this.data[0].name,
            coordinateSystem: 'none',
            renderItem: function (params, api) {
              if (!api.value(0)) return null
              const percent = api.value(1)
              let startAngle =  Math.PI - Math.PI * percent
              let endAngle = Math.PI * 2 * percent + startAngle
              return {
                type: 'arc',
                shape: {
                  cx: 178,
                  cy: 95,
                  r: 60,
                  r0: 0,
                  startAngle,
                  endAngle,
                  clockwise: true,
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
            renderItem: function (params, api) {
              if (!api.value(0)) return null
              const percent = api.value(1)
              let startAngle =  Math.PI *  2 - Math.PI * percent
              let endAngle = Math.PI * 2 * percent + startAngle
              return {
                type: 'arc',
                shape: {
                  cx: 178,
                  cy: 95,
                  r: 45,
                  r0: 0,
                  startAngle,
                  endAngle,
                  clockwise: true,
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
              value: [this.data[1].value, percent2 , this.data[1].name],
            }],
            itemStyle: {
              color: colorArr[1],
              borderColor: colorArr[1]
            }
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
              if (!api.value(0)) return null
              return {
                type: 'polygon',
                shape: {
                  points: [[0, 0], [2, 0], [1.5, 6], [0.5, 6]]
                },
                origin: [1, 75],
                rotation: api.value(0),
                position: [177, 20],
                style: api.style({
                  fill: '#3c4dab'
                })
              };
            },
            data: calcuAngles(90, percent1)
          },
          {
            type: 'custom',
            // name: this.data[0].name,
            z: 9,
            coordinateSystem: 'none',
            tooltip: {
              show: false,
              trigger: 'none'
            },
            renderItem: function (params, api) {
              if (!api.value(0)) return null
              return {
                type: 'polygon',
                shape: {
                  points: [[0, 0], [2, 0], [1.5, 6], [0.5, 6]]
                },
                origin: [1, 75],
                rotation: api.value(0) + Math.PI * 2 * percent1,
                position: [177, 20],
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
.div-box {
  display: flex;
  align-items: center;
  justify-content: center;
}
.chart-box{
 height: 180px;
  width: 360px;
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
  width: 100%;
  height: 100%;
  background: url("../../assets/img/8.png") center center no-repeat;
}
.man, .woman{
  padding: 15px 0px 15px 14px;
  width: 68px;
  flex: 1;
  border-radius: 6px;
  border: 1px solid rgba(60,77,171,0.5);
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
    border: 1px solid rgba(60,77,171,1);
  }
}
.woman {
  border: 1px solid rgba(241,66,148,0.5);
  &:hover{
    cursor: pointer;
    color: #333;
    border: 1px solid rgba(241,66,148,1);
  }
}
</style>
