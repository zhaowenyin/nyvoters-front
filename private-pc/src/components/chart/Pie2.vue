<template>
  <div class="chart-box">
    <div class="img"></div>
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
        },
        {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 1,
          y2: 0,
          colorStops: [{
            offset: 0, color: '#ee816c' // 0% 处的颜色
          }, {
            offset: 1, color: '#fbb074' // 100% 处的颜色
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
            offset: 0, color: '#f16279' // 0% 处的颜色
          }, {
            offset: 1, color: '#eb488f' // 100% 处的颜色
          }],
          global: false // 缺省为 false
        }
      ]

      let currentAngle = - Math.PI / 2
      let currentWidth = 20
      let currentR = 70
      const renderArr = this.data.map((obj, index) => {
        obj.percent = obj.value/sumValues
        obj.startAngle = currentAngle
        obj.endAngle = currentAngle + Math.PI * 2 * obj.percent
        obj.borderWidth = currentWidth
        obj.currentR = currentR
        obj.color = colorArr[index] || 'red'
        currentAngle = obj.endAngle
        currentWidth += 8
        currentR += 4
        return obj
      })


      const createSeries = renderArr.map(obj => {
        return {
          type: 'custom',
          name: obj.name,
          coordinateSystem: 'none',
          renderItem: function (params, api) {
            return {
              type: 'arc',
              shape: {
                cx: 130,
                cy: 130,
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
        renderItem: function () {
          return {
            type: 'arc',
            shape: {
              cx: 130,
              cy: 130,
              r: 60,
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
        series: createSeries
      }
      this.myChart.setOption(option)
    }
  }
};
</script>

<style scoped>
.chart-box{
  /* height: 100%;
  width: 100%; */
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
  background: url("../../assets/img/icon1.png") center center no-repeat;
}
.legend-ul{
  position: absolute;
  top: 50%;
  right: 0px;
  transform: translate(0, -50%);
  cursor: pointer;
  & li{
    width: 100px;
    height: 20px;
    margin: 12px 0px;
  }
}
</style>
