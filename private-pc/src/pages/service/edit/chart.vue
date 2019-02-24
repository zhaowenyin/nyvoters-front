<template>
  <div class="chart-view">
    <div class="service-name" v-if="serviceBagEntity.serves.length">
      <el-input v-model="serviceBagEntity.serves[index].name" placeholder="请输入服务名称" maxlength="18"></el-input>
    </div>
    <div class="flow-chart"></div>
  </div>
</template>
<script>
import {mapState} from 'vuex'
export default {
  data () {
    return {
      index: 0
    }
  },
  watch: {
    '$route' (val) {
      this.index = val.query.index
    }
  },
  computed: {
    ...mapState('service', {
      serviceBagEntity: state => state.serviceBagEntity
    })
  }
}
</script>
<style scoped>
  .chart-view {
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow: auto;
  }
  .service-name {
    margin-bottom: 10px;
  }
  .flow-chart {
    border: 1px solid #dcdfe6;
    border-radius: 5px;
    flex: 1;
    padding: 10px;
  }
</style>
