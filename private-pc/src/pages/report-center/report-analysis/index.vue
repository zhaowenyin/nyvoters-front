<template>
  <div class="view">
    <div class="content-title">南阳市第一选区情况统计表</div>
    <ul class="pieall">
      <li class="pie">
        <div class="text">总人口数</div>
        <Pie :data="[]"/>
      </li>
      <li class="pie">
        <div class="text">18岁以上人口数</div>
        <Pie :data="[]"/>
      </li>
      <li class="pie">
        <div class="text">未登记人数</div>
        <Pie :data="[]"/>
      </li>
    </ul>
    <ul class="pieall">
      <li class="pie people">
        <div class="text">实际登记选民人数</div>
        <div class="text-people">3611人</div>
      </li>
      <li class="pie">
        <div class="text">登记选民性别分布</div>
        <Pie :data="[]"/>
      </li>
        <li class="pie">
        <div class="text">本地转入登记选民分布</div>
        <Pie :data="[]"/>
      </li>
    </ul>
  </div>
</template>
<script>
import { mapMutations } from 'vuex'
import Pie from './Pie'

export default {
  data () {
    return {
      list: [],
      data: {data1:[],data2:[],data3:[],data4:[]}
    }
  },
  computed: {

  },
  components: {
    Pie
  },
  created () {
    // 初始化清除数据
    this.clearState()
  },
  methods: {
    ...mapMutations('home', [
      'clearState'
    ])
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
