<template>
  <ve-pie
  :extend="chartExtend"
  :data="chartData"
  :settings="chartSettings"
  height="300px"></ve-pie>
</template>
<script>
export default {
  data () {
    this.chartSettings = {
      radius: 80,
      offsetY: '40%'
    }
    this.chartExtend = {
      grid: {
        top: 10,
        left: 10,
      },
      legend: {
        bottom: 30,
        left: 'center',
      },
      series: {
        color: ['#6e9cd3','#eb7b3c','#a5a5a5','#fbdf2c','#4674c1','#72ac4d'],
        label: {
          normal: {
            textStyle: {
              color: 'rgba(200,235,255,1)',
              fontSize: '16'
            },
            formatter: function(param) {
              return param.value
            }
          }
        },
      }
    }
    return {
      chartData: {
        columns: ['label', 'value'],
        rows: []
      }
    }
  },
  props: {
    data: {
      default: () => [],
      type: Array
    }
  },
  watch: {
    data () {
      this.chartData.rows = this.data
    }
  },
  created () {
    this.chartData.rows = this.data
  }

}

</script>
