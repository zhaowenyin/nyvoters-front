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
    let sel = this
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
            show: true,
            type: 'value',
            formatter: function(value) {
              let text = ''
              if(sel.type !== 1) {
                text = '人'
              }
              return value.value + text
            }
          }
        }
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
    },
    type: {
      default: null,
      type: null
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
