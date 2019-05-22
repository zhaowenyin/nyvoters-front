<template>
  <ve-histogram :extend="chartExtend" :data="chartData" :settings="chartSettings"></ve-histogram>
</template>
<script>
export default {
  data() {
    this.chartSettings = {
      labelMap: {
        peopleNum: "人口数",
        regVotersNum: "登记选民数",
        votersNum: "正式选民数",
        regRate: "选民登记率"
      }
    };
    this.chartExtend = {
      grid: {
        top: 10,
        left: 10
      },
      legend: {
        bottom: 30,
        left: "center"
      },
      series: {
        barWidth: 20
      },
      color:  ["#6e9cd3", "#eb7b3c", "#a5a5a5", "#fbdf2c"]
    };
    return {
      chartData: {
        columns: [
          "precinctName",
          "peopleNum",
          "regVotersNum",
          "votersNum",
          "regRate"
        ],
        rows: []
      }
    };
  },
  props: {
    data: {
      default: () => [],
      type: Array
    }
  },
  watch: {
    data() {
      this.chartData.rows = this.data;
    }
  },
  created() {
    this.chartData.rows = this.data;
  }
};
</script>

