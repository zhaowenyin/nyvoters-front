<template>
  <div class="view1">
    <div class="content-title">南阳市第一选区情况统计表</div>
    <ul class="pieall">
      <li class="pie">
        <div class="text">总人口数</div>
        <Pie :data="data.echart1"/>
      </li>
      <li class="pie">
        <div class="text">18岁以上人口数</div>
        <Pie :data="data.echart2"/>
      </li>
      <li class="pie">
        <div class="text">未登记人数</div>
        <Pie :type="1" :data="data.unregisteredNumbers"/>
      </li>
    </ul>
    <ul class="pieall">
      <li class="pie people">
        <div class="text">实际登记选民人数</div>
        <div class="text-people">{{data.actualRegisteredVoters}}人</div>
      </li>
      <li class="pie">
        <div class="text">登记选民性别分布</div>
        <Pie
        :type="1"
        :data="data.echart3"/>
      </li>
        <li class="pie">
        <div class="text">本地转入登记选民分布</div>
        <Pie :type="1" :data="data.echart4"/>
      </li>
    </ul>
  </div>
</template>
<script>
import Pie from './Pie'
import {getList} from './service.js'

export default {
  data () {
    return {
      data: {}
    }
  },
  props: {
    belongAreaId: {
      default: '',
      type: null
    }
  },
  watch: {
    belongAreaId() {
      this.searchList()
    }
  },
  components: {
    Pie
  },
  created () {
    // 初始化清除数据
    // this.searchList()
  },
  methods: {
    async searchList () {
      this.loading = true
      const{data} = await getList(this.belongAreaId)
      this.data = data.content
      this.data.echart1 = [{label:'男',value: this.data.malePopulation},{label:'女',value: this.data.femalePopulation}]
      this.data.echart2 = [{label:'男',value: this.data.adultMalePopulation},{label:'女',value: this.data.adultFemalePopulation}]
      this.data.echart3 = [{label:'男',value: this.data.registeredMaleVoters},{label:'女',value: this.data.registeredFemaleVoters}]
      this.data.echart4 = [{label:'本地选民',value: this.data.localVoters},{label:'从外地转入选民',value: this.data.foreignVoters}]
      this.loading = false
    },

  }
}
</script>
<style scoped>
  .content-title {
    font-size: 24px;
    font-weight: bold;
    line-height: 25px;
    padding: 34px 0 24px 0;
    text-align: center;
  }
  .pieall {
    display: flex;
  }
  .pie {
    flex: 1;
    border: 1px solid #CCC;
    margin-right: 15px;
    margin-bottom: 15px;
    &.people {
       display: flex;
      flex-direction: column;
      & .text-people {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 30px;
        font-weight: bold;
      }
    }

  }
  .text {
    text-align: center;
    font-size: 20px;
    margin: 10px;

  }

</style>
