<template>
  <ve-pie :legend="legend" :grid="grid" :data="chartData" height="300px" :settings="chartSettings"></ve-pie>
</template>

<script>
export default {
  data () {
    this.chartSettings = {
      radius: 80,
      offsetY: '40%'
    }
    this.legend = {
      bottom: 30,
      left: 'center',
    }
    this.grid = {
      top: 10,
    }
    return {
      chartData: {
        columns: ['日期', '访问用户'],
        rows: [
          { '日期': '1/1', '访问用户': 1393 },
          { '日期': '1/2', '访问用户': 3530 },
          { '日期': '1/3', '访问用户': 2923 },
          { '日期': '1/4', '访问用户': 1723 },
          { '日期': '1/5', '访问用户': 3792 },
          { '日期': '1/6', '访问用户': 4593 }
        ]
      }
    }
  }
}
</script>
